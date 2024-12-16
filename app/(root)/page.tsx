import { ChartsBlock, TableBlock } from '@/shared/components';
import Image from 'next/image';
import map from '@/public/mapjpg.jpg';
import { fetchNodeData, processNodeData } from '@/shared/services/chartData';
import { fetchNetworkData } from '@/shared/services/tableData';

export default async function Home() {
    const [rawChartData, rawTableData] = await Promise.all([fetchNodeData(), fetchNetworkData()]);

    const chartData = processNodeData(rawChartData);

    return (
        <>
            <section className='mt-10 flex gap-4 w-full justify-between lg:flex-row flex-col'>
                <Image src={map} alt='map' className='block lg:hidden h-[537px] object-cover' />
                <ChartsBlock chartData={chartData} />
                <Image src={map} alt='map' className='lg:w-3/4 lg:block hidden' />
            </section>

            <TableBlock tableData={rawTableData} />
        </>
    );
}
