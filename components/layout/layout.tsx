import React from 'react'
import Header from "@/components/layout/header"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="w-full">
                {children}
            </main>
        </>
    )
}