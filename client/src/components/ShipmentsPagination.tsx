import { useAppSelector, useAppDispatch } from '@/hooks';
import { changePage } from '@/features/shipments/shipmentsSlice';
import { ArrowLeft, ArrowRight } from '../components/icons';

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
                <ArrowLeft />
            </button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
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
            </div>
            <button onClick={nextPage} className='right-0 grid place-items-center text-sm transition-colors w-10 h-10 rounded-md'>
                <ArrowRight />
            </button>
        </div>
    );
};

export default ShipmentsPagination;
