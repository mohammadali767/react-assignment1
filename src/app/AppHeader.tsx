
import Link from "next/link"
import { ReactNode } from "react"

type AppLink = {
    href: string;
    children: ReactNode;
};

export default function AppHeader(){

    const links: AppLink[] = [
        {
            href: "/",
            children: "Home",
        },
        {
            href: "/tic-tac-toe",
            children: "Tic-Tac-Toe",
        },
        {
            href: "/rock-paper-scissor",
            children: "Rock-Paper-Scissor"
        },
    ]; 

    return (
        <header className="p-17 flex flex-col items-center md:flex-row md:justify-between
        bg-linear-to-br from-zinc-900 to-olive-900">
            <span className="text-xl">
                Assignment 1
            </span>

            <nav>
                <ul className="flex gap-7 overflow-auto md:gap-17">
                    {links.map(link => 
                        <li key={link.href}>
                            <Link href={link.href} className="hover:underline active:text-stone-50/70">
                                { link.children }
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
