
export function CardBooksSkeleton() {
    
    return (
        <div className={"w-full px-3.5 py-2 h-[130px] rounded-md bg-light-primary dark:bg-dark-secondary"}>
            <div className="w-full h-4 mt-2 mb-4 rounded-full bg-light-tertiary dark:bg-dark-primary"></div>
            <div className="w-3/4 h-4 mt-2 mb-4 rounded-full bg-light-tertiary dark:bg-dark-primary"></div>
            <div className="w-1/4 h-4 mt-2 mb-4 rounded-full bg-light-tertiary dark:bg-dark-primary"></div>
        </div>
    );
}
