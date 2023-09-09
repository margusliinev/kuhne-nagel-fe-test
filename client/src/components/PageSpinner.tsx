const PageSpinner = () => {
    return (
        <div
            className='animate-spin duration-700 inline-block w-10 h-10 border-[5px] border-current border-t-transparent text-blue-800 rounded-full'
            role='status'
            aria-label='loading'
        >
            <span className='sr-only'>Loading...</span>
        </div>
    );
};

export default PageSpinner;
