import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
    return (
        <header>
            <Link href='/'>
                <h1 className='font-pingfang text-xl '>Node Data center</h1>{' '}
            </Link>
        </header>
    );
};
