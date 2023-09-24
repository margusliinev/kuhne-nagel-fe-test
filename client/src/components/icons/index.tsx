const ArrowLeft = () => {
    return (
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
    );
};

const ArrowRight = () => {
    return (
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
    );
};

export { ArrowLeft, ArrowRight };
