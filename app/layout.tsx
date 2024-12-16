import type { Metadata } from 'next';
import { Poppins, Anek_Tamil } from 'next/font/google';
import './globals.css';

const geistSans = Poppins({
    variable: '--font-poppins',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const geistMono = Anek_Tamil({
    variable: '--font-anek-tamil',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Node Data center',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
