import type { Metadata } from "next"; import "./globals.css";
export const metadata: Metadata={title:"Mechanics — Roadside help, anywhere",description:"Connect drivers with verified mechanics nearby."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}