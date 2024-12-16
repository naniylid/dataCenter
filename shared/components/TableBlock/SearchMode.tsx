'use client';

import React from 'react';
import { search } from '../svg';

interface SearchModeProps {
    onSearch: (search: string) => void;
}

export const SearchMode: React.FC<SearchModeProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className='mt-[50px] mb-[20px] flex justify-between items-center'>
            <h1 className='font-pingfang text-xl'>RPC / REST / GRPs</h1>
            <div className='flex focus:max-w-[394px] hover:max-w-[394px] lg:max-w-[394px] max-w-[50px]  w-full items-center lg:rounded-[23px] rounded-[17px] border-2 border-[#131313] overflow-hidden px-[17px] py-[13px]'>
                <input
                    type='text'
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder={'Search mode'}
                    className='w-full  text-center outline-none bg-transparent font-pingfang text-[#707070] text-base '
                />

                <button onClick={handleSearch}>{search}</button>
            </div>
        </div>
    );
};
