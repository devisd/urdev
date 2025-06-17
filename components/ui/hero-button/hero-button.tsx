import React from "react";
import './hero-button.css'

type HeroButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text?: string;
};

export const HeroButton: React.FC<HeroButtonProps> = ({
    text = "",
    className = "",
    ...props
}) => {

    return (
        <button
            type="button"
            className={`btn ${className}`}
            {...props}
        >
            <span className="spark"></span>
            <span className="spark"></span>
            <span className="backdrop"></span>
            <span className="text">{text}</span>
        </button>
    );
}; 