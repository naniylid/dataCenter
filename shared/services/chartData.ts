import axios from 'axios';

export interface GroupedData {
    name: string;
    value: number;
    percentage: number;
    id: number;
}

export async function fetchNodeData(): Promise<any[]> {
    try {
        const response = await axios.get('http://72.5.42.40:3102/map-data');
        if (response.status !== 200) throw new Error('Failed to fetch node data');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export function processNodeData(rawData: any[]): GroupedData[] {
    const grouped = rawData.reduce(
        (acc: Record<string, { isp: string; count: number }>, node, index) => {
            if (!acc[node.as]) {
                acc[node.as] = { isp: node.isp, count: 0 };
            }
            acc[node.as].count++;
            return acc;
        },
        {},
    );

    const sortedData = Object.entries(grouped)
        .map(([as, { isp, count }], index) => ({ id: index, name: isp, value: count }))
        .sort((a, b) => b.value - a.value);

    const total = sortedData.reduce((sum, group) => sum + group.value, 0);

    const top6Data = sortedData.slice(0, 6);

    const dataWithPercentages = top6Data.map((group) => ({
        ...group,
        percentage: (group.value / total) * 100,
    }));

    return dataWithPercentages;
}
export function processModalData(rawData: any[]): GroupedData[] {
    const grouped = rawData.reduce((acc: Record<string, { isp: string; count: number }>, node) => {
        if (!acc[node.as]) {
            acc[node.as] = { isp: node.isp, count: 0 };
        }
        acc[node.as].count++;
        return acc;
    }, {});

    const sortedData = Object.entries(grouped)
        .map(([as, { isp, count }], index) => ({ id: index, name: isp, value: count }))
        .sort((a, b) => a.value - b.value);

    const total = sortedData.reduce((sum, group) => sum + group.value, 0);

    const dataWithPercentages = sortedData.map((group) => ({
        ...group,
        percentage: +((group.value / total) * 100).toFixed(0),
    }));

    return dataWithPercentages.sort((a, b) => b.percentage - a.percentage);
}
