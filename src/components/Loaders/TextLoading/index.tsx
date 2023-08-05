interface ITextLoading {
    color?: string;
    size?: "small" | "base" | "large";
}

export function TextLoading({color = "bg-light-secondary dark:bg-dark-secondary", size = "base"}: ITextLoading) {

    return (
        <div>
            <div className={`inline-block rounded-full ${color} animate-jumpingAnimation1 ${size == "base" ? "w-4 h-4" : ""} ${size == "small" ? "w-3 h-3" : ""} ${size == "large" ? "w-5 h-5" : ""}`}></div>
            <div className={`inline-block rounded-full ${color} animate-jumpingAnimation2 ${size == "base" ? "w-4 h-4" : ""} ${size == "small" ? "w-3 h-3" : ""} ${size == "large" ? "w-5 h-5" : ""}`}></div>
            <div className={`inline-block rounded-full ${color} animate-jumpingAnimation3 ${size == "base" ? "w-4 h-4" : ""} ${size == "small" ? "w-3 h-3" : ""} ${size == "large" ? "w-5 h-5" : ""}`}></div>
        </div>
    );
}
