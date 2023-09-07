import { useAppSelector, useAppDispatch } from '@/hooks';
import { changePage } from '@/features/shipments/shipmentsSlice';

const ShipmentsPagination = ({ pages }: { pages: number[] }) => {
    const { page } = useAppSelector((store) => store.shipments);
    const dispatch = useAppDispatch();

    const nextPage = () => {
        let newPage = page + 1;
        if (newPage > pages.length) {
            newPage = 1;
        }
        dispatch(changePage(newPage));
    };

    const prevPage = () => {
        let newPage = page - 1;
        if (newPage < 1) {
            newPage = pages.length;
        }
        dispatch(changePage(newPage));
    };

    return (
        <div className='relative flex items-center justify-center mt-10 mb-20 gap-2'>
            <button onClick={prevPage} className='left-0 grid place-items-center text-gray-900 transition-colors w-10 h-10 rounded-md'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    className='w-5 h-5 text-gray-900'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
            </button>
            {pages.map((pageNumber) => {
                return (
                    <button
                        type='button'
                        className='bg-blue-800 text-sm text-white transition-colors hover:bg-blue-900 w-10 h-10 rounded-md disabled:opacity-70'
                        key={pageNumber}
                        disabled={page === pageNumber}
                        onClick={() => dispatch(changePage(pageNumber))}
                    >
                        {pageNumber}
                    </button>
                );
            })}
            <button onClick={nextPage} className='right-0 grid place-items-center text-sm transition-colors w-10 h-10 rounded-md'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    className='w-5 h-5 text-gray-900'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
            </button>
        </div>
    );
};

export default ShipmentsPagination;
