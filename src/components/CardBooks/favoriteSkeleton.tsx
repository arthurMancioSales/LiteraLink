
export function FavoriteSkeleton() {
    
    return (
        <div className={"w-full px-3.5 py-2 h-[80px] rounded-md bg-light-primary dark:bg-dark-secondary animatepulse"}>
            <div className="flex justify-between w-full">
                <div className="w-12 h-4 rounded-full bg-light-tertiary dark:bg-dark-primary animate-pulse"></div>
                <div className="w-8 h-4 rounded-full bg-light-tertiary dark:bg-dark-primary animate-pulse"></div>
            </div>
            <div className="w-full h-4 mt-2 mb-4 rounded-full animate-pulse bg-light-tertiary dark:bg-dark-primary"></div>
        </div>
    );
}
