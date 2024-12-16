import Link from 'next/link';
import React from 'react';

export const OpenModalButton: React.FC = () => {
    return (
        <Link href='/datacenter'>
            <button
                type='button'
                className=' py-[4px] px-[40px] mt-[20px] w-fit rounded-3xl   text-[#9ab1cf] text-sm hover:opacity-80 hover:text-[#0c0d0e]'
                style={{ backgroundColor: 'rgba(154, 177, 207, 0.15)' }}
            >
                View all centers
            </button>{' '}
        </Link>
    );
};
