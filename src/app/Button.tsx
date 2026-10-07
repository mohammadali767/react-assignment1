
import type { ButtonHTMLAttributes } from "react"

export default function Button({ children, className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>){
    return (
        <button className={`p-5 bg-blue-700 rounded-sm cursor-pointer hover:bg-blue-800 
        ${className}`} {...rest} >
            { children }
        </button>
    );
}
