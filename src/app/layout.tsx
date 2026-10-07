import type { Metadata } from "next";

import "./globals.css";
import AppHeader from "./AppHeader";

export const metadata: Metadata = {
  title: "Assignment1",
  description: "Tic-Tac-Toe and Rock-Paper-Scissor",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en"className="h-full antialiased">
      <body className="min-h-full grid grid-rows-[auto_1fr] text-lg font-noraml font-mono text-stone-50 bg-background">
        
        <AppHeader/>

        <main>
          {children}
        </main>

      </body>
    </html>
  );
}
