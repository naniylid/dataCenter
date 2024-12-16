import axios from 'axios';

export interface RpcData {
    noder: {
        moniker: string;
        address: string;
    };
    rpcIp: string;
    uptime: string;
    apiIp?: string;
    grpcIp?: string;
    evmIp?: string;
    tx_index: 'on' | 'off';
}

export interface PeerData {
    noder: {
        moniker: string;
        address: string;
    };
    peer: string;
}

interface ApiResponse {
    rpcs: {
        cosmos: RpcData[];
        evm: RpcData[];
    };
    peers: {
        cosmos: PeerData[];
        evm: PeerData[];
    };
}

export interface TableData {
    cosmos: { rpcs: RpcData[]; peers: PeerData[] };
    evm: { rpcs: RpcData[]; peers: PeerData[] };
}

export async function fetchNetworkData(): Promise<TableData> {
    try {
        const response = await axios.get<ApiResponse>('http://72.5.42.40:3102/network-data');
        if (response.status !== 200) {
            throw new Error('Failed to fetch network data');
        }

        const data = {
            cosmos: {
                rpcs: response.data.rpcs.cosmos,
                peers: response.data.peers.cosmos,
            },
            evm: {
                rpcs: response.data.rpcs.evm,
                peers: response.data.peers.evm,
            },
        };

        return data;
    } catch (error) {
        console.error('Error fetching network data:', error);
        throw error;
    }
}
