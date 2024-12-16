'use client';

import React, { useState, useEffect } from 'react';
import { arrowAsc, arrowDesc, copy, history, node, offIndex, onIndex } from '../svg';
import { RpcData } from '@/shared/services/tableData';

export const Table: React.FC<{
    data: any;
}> = ({ data }) => {
    const [sortedData, setSortedData] = useState<RpcData[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [indexSort, setIndexSort] = useState<'on' | 'off' | null>(null);

    useEffect(() => {
        if (Array.isArray(data)) {
            setSortedData(data);
        }
    }, [data]);

    const sortByBlockHistory = () => {
        const sorted = [...sortedData].sort((a, b) => {
            const numA = parseFloat(a.uptime);
            const numB = parseFloat(b.uptime);
            return sortOrder === 'asc' ? numA - numB : numB - numA;
        });
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setSortedData(sorted);
    };

    const sortByIndexation = () => {
        const sorted = [...sortedData].sort((a, b) => {
            if (indexSort === 'on') {
                return a.tx_index === 'off' ? -1 : 1;
            } else {
                return a.tx_index === 'on' ? -1 : 1;
            }
        });
        setIndexSort(indexSort === 'on' ? 'off' : 'on');
        setSortedData(sorted);
    };

    const renderStatusAndLocation = (item: any) => {
        const statuses = [];
        if (item.rpcIp) statuses.push('RPC');
        if (item.grpcIp) statuses.push('GRPC');
        if (item.apiIp) statuses.push('REST');
        if (item.evmIp) statuses.push('EVM RPC');
        return statuses.join(', ');
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className=' mx-auto px-4'>
            <div className='hidden lg:block'>
                <table className='w-full table-auto'>
                    <thead className='font-pingfang text-base text-[#707070] font-normal'>
                        <tr>
                            <th className='text-left p-4'>Status, Location</th>
                            <th className='text-center p-4'>Node</th>
                            <th className='text-center p-4'>
                                <button
                                    onClick={sortByBlockHistory}
                                    className='flex items-center space-x-2'
                                >
                                    <span>Block History</span>
                                    <span>{sortOrder === 'asc' ? arrowDesc : arrowAsc}</span>
                                </button>
                            </th>
                            <th className='text-center p-4'>
                                <button
                                    onClick={sortByIndexation}
                                    className='flex items-center space-x-2'
                                >
                                    <span>Indexation</span>
                                    <span>{indexSort === 'on' ? arrowAsc : arrowDesc}</span>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='mt-2 text-[ #dadada] text-lg'>
                        {Array.isArray(sortedData) &&
                            sortedData.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`border-t border-b border-[#131313] ${
                                        index % 2 !== 0 ? '' : 'bg-[#0b0b0b]'
                                    }`}
                                >
                                    <td className='p-[30px]'>
                                        <div className='flex items-center gap-6'>
                                            <p>{renderStatusAndLocation(item)}</p>
                                            <p className='overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]'>
                                                {item.noder?.address}
                                            </p>
                                            <button
                                                aria-label='Copy to clipboard'
                                                onClick={() =>
                                                    copyToClipboard(renderStatusAndLocation(item))
                                                }
                                            >
                                                {copy}
                                            </button>
                                        </div>
                                    </td>
                                    <td className='flex justify-center items-center gap-2 p-[30px] text-[#89c4ff]'>
                                        {node}
                                        {item.noder?.moniker}
                                    </td>
                                    <td className='p-[30px]'>
                                        <div className='flex items-center gap-3 text-[#89c4ff]'>
                                            {history}
                                            {item.uptime}
                                        </div>
                                    </td>
                                    <td className='p-[30px]'>
                                        <div className='flex justify-center items-center gap-3'>
                                            {item.tx_index === 'on' ? onIndex : offIndex}
                                            {item.tx_index}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <ul className='lg:hidden block'>
                {Array.isArray(sortedData) &&
                    sortedData.map((item, index) => (
                        <li
                            key={index}
                            className={`border-t p-[15px] border-b border-[#131313] ${
                                index % 2 !== 0 ? '' : 'bg-[#0b0b0b]'
                            }`}
                        >
                            <div className='flex items-center justify-between text-[18px]'>
                                <p>{renderStatusAndLocation(item)}</p>
                                <p className='overflow-hidden text-ellipsis whitespace-nowrap max-w-[180px]'>
                                    {item.noder?.address}
                                </p>
                                <button
                                    aria-label='Copy to clipboard'
                                    onClick={() => copyToClipboard(renderStatusAndLocation(item))}
                                >
                                    {copy}
                                </button>
                            </div>
                            <div className='flex items-center justify-between text-[15px]'>
                                <div className='flex justify-center items-center gap-2  text-[#89c4ff]'>
                                    {node}
                                    <p className='overflow-hidden text-ellipsis whitespace-nowrap max-w-[100px]'>
                                        {' '}
                                        {item.noder?.moniker}
                                    </p>
                                </div>
                                <div className='flex items-center gap-3 text-[#89c4ff]'>
                                    {history}
                                    {item.uptime}
                                </div>
                                <div className='flex justify-center items-center gap-3'>
                                    {item.tx_index === 'on' ? onIndex : offIndex}
                                    {item.tx_index}
                                </div>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};
