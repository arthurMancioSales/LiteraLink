interface PropTypes {
    size: number;
}

export function CircleSkeleton({ size }: PropTypes) {
    return (
        <div style={{ width: `${size}px`, height: `${size}px` }} className="rounded-full bg-light-secondary dark:bg-dark-secondary animate-pulse"></div>
    );
}

