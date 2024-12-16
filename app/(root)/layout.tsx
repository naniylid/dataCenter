import { Suspense } from 'react';
import { Header } from '@/shared/components';

export default async function HomeLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <div className='px-[15px] pt-5 md:px-[15px] md:pt-[30px]'>
            <Suspense>
                <Header />
            </Suspense>
            <main>
                {children}
                {modal}
            </main>
        </div>
    );
}
