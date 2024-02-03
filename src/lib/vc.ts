import type { PeerId, ProducerId } from "../types/vc";

export class Peer {
    public readonly id: PeerId;
    public preview: HTMLVideoElement | null;
    public readonly mediaStream = new MediaStream();

    constructor(id: PeerId) {
        this.preview = null;
        this.id = id;
    }

    public upgrade(): void {
        if (this.preview) {
            this.preview.srcObject = this.mediaStream;
            this.preview.play();
        }
    }

    public addTrack(track: MediaStreamTrack): void {
        console.log(this.id, this.hasTracks(), this.mediaStream, this.preview);
        this.mediaStream.addTrack(track);
        if (this.preview) {
            this.preview.srcObject = this.mediaStream;
        }
    }

    public deleteTrack(track: MediaStreamTrack): void {
        this.mediaStream.removeTrack(track);
        if (this.preview) {
            this.preview.srcObject = this.mediaStream;
        }
    }

    public hasTracks(): boolean {
        return this.mediaStream.getTracks().length > 0;
    }

    public destroy(): void {
        if (this.preview) {
            this.preview.srcObject = null;
        }
    }
}

export class Peers {
    public peers = new Map<PeerId, Peer>();
    private producerIdToTrack = new Map<ProducerId, MediaStreamTrack>();

    public getOrCreatePeer(id: PeerId): Peer {
        let peer = this.peers.get(id);

        if (!peer) {
            peer = new Peer(id);
            this.peers.set(id, peer);
        }

        return peer;
    }

    public deletePeer(peerId: PeerId) {
        let peer = this.getOrCreatePeer(peerId);
        peer.destroy();
        this.peers.delete(peerId);
    }

    public addTrack(
        peerId: PeerId,
        producerId: ProducerId,
        track: MediaStreamTrack
    ): void {
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
    }
}