<script lang="ts">
	export let data: any;

	import { Device } from 'mediasoup-client';
	import type {
		MediaKind,
		RtpCapabilities,
		RtpParameters
	} from 'mediasoup-client/lib/RtpParameters';
	import type { DtlsParameters, TransportOptions, Transport } from 'mediasoup-client/lib/Transport';
	import type { ConsumerOptions } from 'mediasoup-client/lib/Consumer';
	import { onMount } from 'svelte';
	import { PUBLIC_MISOSOUP_URL } from '$env/static/public';

	type Brand<K, T> = K & { __brand: T };

	type VcId = Brand<string, 'VcId'>;
	type PeerId = Brand<string, 'PeerId'>;
	type ConsumerId = Brand<string, 'ConsumerId'>;
	type ProducerId = Brand<string, 'ProducerId'>;

	interface ServerInit {
		action: 'Init';
		vcId: VcId;
		consumerTransportOptions: TransportOptions;
		producerTransportOptions: TransportOptions;
		routerRtpCapabilities: RtpCapabilities;
	}

	interface ServerPeerJoin {
		action: 'PeerJoin';
		peerId: PeerId;
	}

	interface ServerPeerLeave {
		action: 'PeerLeave';
		peerId: PeerId;
	}

	interface ServerProducerAdd {
		action: 'ProducerAdd';
		peerId: PeerId;
		producerId: ProducerId;
	}

	interface ServerProducerRemove {
		action: 'ProducerRemove';
		peerId: PeerId;
		producerId: ProducerId;
	}

	interface ServerConnectedProducerTransport {
		action: 'ConnectedProducerTransport';
	}

	interface ServerProducerCreated {
		action: 'ProducerCreated';
		id: ProducerId;
	}

	interface ServerConnectedConsumerTransport {
		action: 'ConnectedConsumerTransport';
	}

	interface ServerConsumerCreated {
		action: 'ConsumerCreated';
		id: ConsumerId;
		kind: MediaKind;
		rtpParameters: RtpParameters;
	}

	type ServerMessage =
		| ServerInit
		| ServerPeerJoin
		| ServerPeerLeave
		| ServerProducerAdd
		| ServerProducerRemove
		| ServerConnectedProducerTransport
		| ServerProducerCreated
		| ServerConnectedConsumerTransport
		| ServerConsumerCreated;

	interface ClientInit {
		action: 'Init';
		rtpCapabilities: RtpCapabilities;
	}

	interface ClientConnectProducerTransport {
		action: 'ConnectProducerTransport';
		dtlsParameters: DtlsParameters;
	}

	interface ClientConnectConsumerTransport {
		action: 'ConnectConsumerTransport';
		dtlsParameters: DtlsParameters;
	}

	interface ClientProduce {
		action: 'Produce';
		kind: MediaKind;
		rtpParameters: RtpParameters;
	}

	interface ClientConsume {
		action: 'Consume';
		producerId: ProducerId;
	}

	interface ClientConsumerResume {
		action: 'ConsumerResume';
		id: ConsumerId;
	}

	type ClientMessage =
		| ClientInit
		| ClientConnectProducerTransport
		| ClientProduce
		| ClientConnectConsumerTransport
		| ClientConsume
		| ClientConsumerResume;

	class Peer {
		private readonly figure: HTMLElement;
		private readonly preview: HTMLVideoElement;
		private readonly mediaStream = new MediaStream();

		constructor(public readonly id: PeerId) {
			const container = document.querySelector('#container')!;

			this.figure = document.createElement('figure');
			this.preview = document.createElement('video');

			this.preview.muted = true;
			this.preview.controls = true;

			this.preview.onloadedmetadata = () => {
				this.preview.play();
			};

			const figcaption = document.createElement('figcaption');

			figcaption.innerText = `Peer ${id}`;

			this.figure.append(this.preview, figcaption);

			container.append(this.figure);
		}

		public addTrack(track: MediaStreamTrack): void {
			this.mediaStream.addTrack(track);

			this.preview.srcObject = this.mediaStream;
		}

		public deleteTrack(track: MediaStreamTrack): void {
			this.mediaStream.removeTrack(track);

			this.preview.srcObject = this.mediaStream;
		}

		public hasTracks(): boolean {
			return this.mediaStream.getTracks().length > 0;
		}

		public destroy(): void {
			this.preview.srcObject = null;
			this.figure.remove();
		}
	}

	class Peers {
		private peers = new Map<PeerId, Peer>();
		private producerIdToTrack = new Map<ProducerId, MediaStreamTrack>();

		public addTrack(peerId: PeerId, producerId: ProducerId, track: MediaStreamTrack): void {
			this.producerIdToTrack.set(producerId, track);
			this.getOrCreatePeer(peerId).addTrack(track);
		}

		public deleteTrack(peerId: PeerId, producerId: ProducerId) {
			const track = this.producerIdToTrack.get(producerId);

			if (track) {
				const peer = this.getOrCreatePeer(peerId);

				peer.deleteTrack(track);
				if (!peer.hasTracks()) {
					this.peers.delete(peerId);
					peer.destroy();
				}
			}

			// TODO
		}

		getOrCreatePeer(id: PeerId): Peer {
			let peer = this.peers.get(id);

			if (!peer) {
				peer = new Peer(id);
				this.peers.set(id, peer);
			}

			return peer;
		}

		deletePeer(id: PeerId) {
			this.peers.delete(id);
		}
	}

	async function init() {
		const sendPreview = document.querySelector('#preview-send') as HTMLVideoElement;

		sendPreview.onloadedmetadata = () => {
			sendPreview.play();
		};

		const peers = new Peers();

		const vcId = new URL(location.href).searchParams.get('vcId') as VcId | undefined;
		const user = new URL(location.href).searchParams.get('user') as PeerId;

		const wsUrl = new URL(PUBLIC_MISOSOUP_URL.concat(`/ws?user=${data.forum_name}`));

		const ws = new WebSocket(wsUrl.toString());

		function send(message: ClientMessage) {
			console.log('c2s', message);
			ws.send(JSON.stringify(message));
		}

		const device = new Device();
		let producerTransport: Transport | undefined;
		let consumerTransport: Transport | undefined;

		let sequentialMessages: Promise<void> = Promise.resolve();
		const waitingForResponse: Map<ServerMessage['action'], Function> = new Map();

		const onmessage = async (message: ServerMessage) => {
			switch (message.action) {
				case 'Init': {
					if (!vcId) {
						const url = new URL(location.href);

						url.searchParams.set('vcId', message.vcId);
						history.pushState({}, '', url.toString());
					}
					// It is expected that server will send initialization message right after
					// WebSocket connection is established
					await device.load({
						routerRtpCapabilities: message.routerRtpCapabilities
					});

					// Send client-side initialization message back right away
					send({
						action: 'Init',
						rtpCapabilities: device.rtpCapabilities
					});

					// Producer transport is needed to send audio and video to SFU
					producerTransport = device.createSendTransport(message.producerTransportOptions);

					producerTransport
						.on('connect', ({ dtlsParameters }, success) => {
							// Send request to establish producer transport connection
							send({
								action: 'ConnectProducerTransport',
								dtlsParameters
							});
							// And wait for confirmation, but, obviously, no error handling,
							// which you should definitely have in real-world applications
							waitingForResponse.set('ConnectedProducerTransport', () => {
								success();
							});
						})
						.on('produce', ({ kind, rtpParameters }, success) => {
							// Once connection is established, send request to produce
							// audio or video track
							send({
								action: 'Produce',
								kind,
								rtpParameters
							});
							// And wait for confirmation, but, obviously, no error handling,
							// which you should definitely have in real-world applications
							waitingForResponse.set('ProducerCreated', ({ id }: { id: string }) => {
								success({ id });
							});
						});

					// Request microphone and camera access, in real-world apps you may want
					// to do this separately so that audio-only and video-only cases are
					// handled nicely instead of failing completely
					const mediaStream = await navigator.mediaDevices.getUserMedia({
						audio: true,
						video: {
							width: {
								ideal: 1280
							},
							height: {
								ideal: 720
							},
							frameRate: {
								ideal: 24
							}
						}
					});

					sendPreview.srcObject = mediaStream;

					// And create producers for all tracks that were previously requested
					for (const track of mediaStream.getTracks()) {
						const producer = await producerTransport.produce({ track });

						console.log(`${track.kind} producer created:`, producer);
					}

					// Producer transport will be needed to receive produced tracks
					consumerTransport = device.createRecvTransport(message.consumerTransportOptions);

					consumerTransport.on('connect', ({ dtlsParameters }, success) => {
						// Send request to establish consumer transport connection
						send({
							action: 'ConnectConsumerTransport',
							dtlsParameters
						});
						// And wait for confirmation, but, obviously, no error handling,
						// which you should definitely have in real-world applications
						waitingForResponse.set('ConnectedConsumerTransport', () => {
							success();
							console.log('Consumer transport connected');
						});
					});
					break;
				}
				case 'PeerJoin': {
					peers.getOrCreatePeer(message.peerId);
					break;
				}
				case 'PeerLeave': {
					peers.deletePeer(message.peerId);
					break;
				}
				case 'ProducerAdd': {
					await new Promise((resolve) => {
						// Send request to consume producer
						send({
							action: 'Consume',
							producerId: message.producerId
						});
						// And wait for confirmation, but, obviously, no error handling,
						// which you should definitely have in real-world applications
						waitingForResponse.set('ConsumerCreated', async (consumerOptions: ConsumerOptions) => {
							// Once confirmation is received, corresponding consumer
							// can be created client-side
							const consumer = await (consumerTransport as Transport).consume(consumerOptions);

							console.log(`${consumer.kind} consumer created:`, consumer);

							// Consumer needs to be resumed after being created in
							// paused state (see official documentation about why:
							// https://mediasoup.org/documentation/v3/mediasoup/api/#transport-consume)
							send({
								action: 'ConsumerResume',
								id: consumer.id as ConsumerId
							});

							peers.addTrack(message.peerId, message.producerId, consumer.track);
							resolve(undefined);
						});
					});
					break;
				}
				case 'ProducerRemove': {
					peers.deleteTrack(message.peerId, message.producerId);

					break;
				}
				default: {
					console.error('Received unexpected message', message);
				}
			}
		};

		ws.onmessage = (message) => {
			const decodedMessage: ServerMessage = JSON.parse(message.data);
			console.log('s2c', decodedMessage);

			// All other messages go here and are assumed to be notifications
			// that correspond to previously sent requests
			const callback = waitingForResponse.get(decodedMessage.action);

			if (callback) {
				waitingForResponse.delete(decodedMessage.action);
				callback(decodedMessage);
			} else {
				// Simple hack to make sure we process all messages in order, in real-world apps
				// messages it would be useful to have messages being processed concurrently
				sequentialMessages = sequentialMessages
					.then(() => {
						return onmessage(decodedMessage);
					})
					.catch((error) => {
						console.error('Unexpected error during message handling:', error);
					});
			}
		};
		ws.onerror = console.error;
	}

	onMount(() => {
		init();
	});
</script>

<div id="container" class="flex gap-2">
	<figure>
		<video id="preview-send" muted controls />
		<figcaption>You</figcaption>
	</figure>
</div>

<style>
	figure {
		margin: 0;
		width: 30%;
	}

	video {
		max-width: 300px;
	}
</style>
