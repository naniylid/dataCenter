'use client';

import React from 'react';
import { Pie, Cell } from 'recharts';
import { COLORS } from '@/shared/components/ChartsBlock/colors';
import dynamic from 'next/dynamic';

interface GroupedData {
    name: string;
    value: number;
}

export interface ChartProps {
    data: GroupedData[];
}

const PieChartNoSSR = dynamic(() => import('recharts').then((mod) => mod.PieChart), {
    ssr: false,
});

export const Chart: React.FC<ChartProps> = ({ data }) => {
    return (
        <div className='w-full'>
            <div className='flex items-center justify-center space-x-6'>
                <div className='flex w-full max-w-[138px] justify-center'>
                    <PieChartNoSSR width={138} height={138}>
                        <Pie
                            data={data}
                            cx='50%'
                            cy='50%'
                            labelLine={false}
                            innerRadius={60}
                            outerRadius={70}
                            fill='#8884d8'
                            dataKey='value'
                            stroke='none'
                            cornerRadius={10}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChartNoSSR>
                </div>

                <ul className='space-y-1 lg:block grid grid-cols-2 gap-2'>
                    {data.map((entry, index) => (
                        <li key={index} className='flex items-center space-x-2'>
                            <span
                                className='w-2 h-2 rounded-full'
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></span>
                            <p className='lg:text-s text-xs text-[#7c8798] truncate max-w-[170px]'>
                                {entry.name}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
