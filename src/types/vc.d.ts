import { MediaKind, RtpCapabilities, RtpParameters } from 'mediasoup-client/lib/RtpParameters';
import { DtlsParameters, TransportOptions, Transport } from 'mediasoup-client/lib/Transport';
import { ConsumerOptions } from 'mediasoup-client/lib/Consumer';


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

type S2C =
    ServerInit |
    ServerPeerJoin |
    ServerPeerLeave |
    ServerProducerAdd |
    ServerProducerRemove |
    ServerConnectedProducerTransport |
    ServerProducerCreated |
    ServerConnectedConsumerTransport |
    ServerConsumerCreated;

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

type C2S =
    ClientInit |
    ClientConnectProducerTransport |
    ClientProduce |
    ClientConnectConsumerTransport |
    ClientConsume |
    ClientConsumerResume;
