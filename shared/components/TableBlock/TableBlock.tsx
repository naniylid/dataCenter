'use client';

import React, { useState, useEffect } from 'react';
import { ButtonGroup, SearchMode } from '@/shared/components';
import { Table } from './Table';
import { TableData } from '@/shared/services/tableData';

interface TableBlockProps {
    tableData: TableData;
}

export const TableBlock: React.FC<TableBlockProps> = ({ tableData }) => {
    const [activeButton, setActiveButton] = useState<'cosmos' | 'evm' | null>('cosmos');
    const [filteredData, setFilteredData] = useState<any>([
        tableData.cosmos.rpcs,
        tableData.cosmos.peers,
    ]);

    // Фильтрация данных при изменении типа
    useEffect(() => {
        if (activeButton === 'cosmos') {
            setFilteredData([
                ...tableData.cosmos.rpcs.map((rpc) => ({ type: 'rpc', ...rpc })),
                ...tableData.cosmos.peers.map((peer) => ({ type: 'peer', ...peer })),
            ]);
        } else if (activeButton === 'evm') {
            setFilteredData([
                ...tableData.evm.rpcs.map((rpc) => ({ type: 'rpc', ...rpc })),
                ...tableData.evm.peers.map((peer) => ({ type: 'peer', ...peer })),
            ]);
        }
    }, [activeButton, tableData]);

    // Обработка поиска по монитору (moniker)
    const handleSearch = (search: string) => {
        const lowercasedSearch = search.toLowerCase();
        setFilteredData((prevData: any) =>
            prevData.filter((item: any) =>
                item.noder?.moniker.toLowerCase().includes(lowercasedSearch),
            ),
        );
    };

    // Обработка фильтрации по cosmos/evm
    const handleFilter = (type: 'cosmos' | 'evm' | null) => {
        setActiveButton(type);
    };

    return (
        <section className='w-full'>
            <SearchMode onSearch={handleSearch} />
            <ButtonGroup activeButton={activeButton} setActiveButton={handleFilter} />
            <Table data={filteredData} />
        </section>
    );
};
