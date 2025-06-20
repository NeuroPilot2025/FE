import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "success" | "image"; // ✅ 여기 추가!
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    className = "",
    ...props
}) => {
    if (variant === "image") {
        return (
            <button
                className={`bg-transparent border-none p-0 ${className}`}
                {...props}
            >
                <img
                    src="/img/ReplayBtn.png"
                    alt="Replay"
                    className="w-[160px] h-auto"
                />
            </button>
        );
    }

    let baseStyle =
        "px-6 py-3 rounded-lg text-lg font-bold shadow-md transform transition-transform duration-150 active:scale-95 focus:outline-none focus:ring-2";

    if (variant === "primary") {
        baseStyle +=
            " bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-400";
    } else if (variant === "secondary") {
        baseStyle +=
            " bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-400";
    } else if (variant === "success") {
        baseStyle +=
            " bg-green-500 hover:bg-green-600 text-white focus:ring-green-400";
    }

    return (
        <button className={`${baseStyle} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
