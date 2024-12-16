'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Pagination from './Pagination';
import { close, colorsCircles, node } from '../svg';
import { GroupedData } from '@/shared/services/chartData';

const rowsPerPage = 12;

export const ModalTable: React.FC<{ data: GroupedData[] }> = ({ data }) => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = React.useState<number>(0);

    // Функция для переключения страниц
    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected);
    };

    // Пагинация
    const offset = currentPage * rowsPerPage;
    const currentData = data.slice(offset, offset + rowsPerPage);

    // Количество страниц
    const pageCount = Math.ceil(data.length / rowsPerPage);

    return (
        <div
            className=' max-w-[1200px] w-full mx-auto p-[30px] rounded-[20px] '
            style={{ boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)', background: '#0f0f0f' }}
        >
            <div className=' relative flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <h2 className='lg:text-2xl text-[18px]'>Node Data center</h2>
                    {colorsCircles}
                    <p className='lg:text-2xl text-[18px]'>{data.length}</p>
                </div>

                <button
                    className='absolute lg:relative top-0 right-0'
                    onClick={() => router.back()}
                >
                    {close}
                </button>
            </div>

            <div className='w-full mt-[30px]'>
                <div className='flex flex-col gap-y-3 lg:grid lg:grid-cols-3 lg:gap-x-7 lg:gap-y-5'>
                    {currentData.map((item, index) => (
                        <div key={item.id} className='flex items-center justify-between text-white'>
                            <div className='flex items-center gap-3'>
                                <p className='text-[#7c8798] text-right'>{offset + index + 1}</p>

                                <div className='flex items-center gap-2'>
                                    {node}
                                    <p>{item.name}</p>
                                </div>
                            </div>
                            <p
                                className='border border-transparent rounded-full px-[20px] text-[#7c8798]'
                                style={{
                                    backgroundColor: 'rgba(154, 177, 207, 0.16)',
                                }}
                            >
                                {item.percentage}%
                            </p>
                        </div>
                    ))}
                </div>

                {/* Пагинация */}
                <div className='flex justify-center lg:justify-end items-center lg:items-end mt-[30px] w-full lg:w-1/2 lg:ml-auto'>
                    <Pagination
                        currentPage={currentPage}
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};
