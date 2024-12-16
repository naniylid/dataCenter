'use client';

import React from 'react';

interface ButtonGroupProps {
    activeButton: 'cosmos' | 'evm' | null;
    setActiveButton: (type: 'cosmos' | 'evm' | null) => void;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ activeButton, setActiveButton }) => {
    return (
        <div className='flex lg:justify-start justify-center gap-4 mb-4 font-pingfang'>
            <button
                onClick={() => setActiveButton('cosmos')}
                className={`px-[40px] py-[8px] max-w-1/2 lg:max-w-[130px] w-full rounded-full ${
                    activeButton === 'cosmos' ? 'bg-white text-[#000]' : 'bg-[ #0b0b0b] text-white'
                }`}
            >
                Cosmos
            </button>

            <button
                onClick={() => setActiveButton('evm')}
                className={`px-[40px] py-[8px]  max-w-1/2 lg:max-w-[130px] w-full rounded-full ${
                    activeButton === 'evm' ? 'bg-white text-[#000]' : 'bg-[ #0b0b0b] text-white'
                }`}
            >
                EVM
            </button>
        </div>
    );
};
