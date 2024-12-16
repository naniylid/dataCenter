import React from 'react';
import { Chart, OpenModalButton } from '@/shared/components';
import { colorsCircles } from '../svg';
import { GroupedData } from '@/shared/services/chartData';

export const ChartsBlock: React.FC<{ chartData: GroupedData[] }> = ({ chartData }) => {
    return (
        <div className='lg:w-1/3 w-full h-min bg-[#0c0d0e] p-6  rounded-[20px]'>
            <header className='flex justify-between mb-6'>
                <h1 className='lg:text-xl text-[15px]'>Node Data center</h1>
                <div className='flex items-center gap-2'>
                    {colorsCircles}

                    <p className='lg:text-2xl text-[18px]'>6</p>
                </div>
            </header>

            <div className='flex flex-col justify-center items-center'>
                <Chart data={chartData} />
                <OpenModalButton />
            </div>
        </div>
    );
};
