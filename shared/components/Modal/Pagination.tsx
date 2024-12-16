import ReactPaginate from 'react-paginate';

import './Pagination.css';
import dynamic from 'next/dynamic';

function Pagination({
    currentPage,
    pageCount,
    onPageChange,
}: {
    currentPage: number | string;
    pageCount: number;
    onPageChange: (selectedPage: { selected: number }) => void;
}) {
    if (typeof currentPage === 'string') currentPage = parseInt(currentPage);

    const disabled = pageCount < 2;

    return (
        <div className='pagination'>
            <ReactPaginate
                pageCount={100}
                forcePage={currentPage}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                pageLabelBuilder={(page) => `${page}`}
                onPageChange={onPageChange}
                containerClassName={'container'}
                pageLinkClassName={`page ${disabled ? 'disabled' : ''}`}
                activeLinkClassName={!disabled ? 'active' : ''}
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                previousClassName={'arrow'}
                nextClassName={'arrow'}
            />
        </div>
    );
}

export default dynamic(() => Promise.resolve(Pagination), { ssr: false });
