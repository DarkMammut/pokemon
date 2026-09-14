'use client'

import {ReactNode, useSyncExternalStore} from "react";
import { useTranslation } from 'react-i18next'
import '@/lib/i18n'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const emptySubscribe = () => () => {}
function useIsMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    )
}

export interface PageHeaderProps {
    title?: string
    actions?: ReactNode
}

export default function Heading({ title, actions }: PageHeaderProps) {
    const pathname = usePathname()
    const { t } = useTranslation()
    const isMounted = useIsMounted()

    // 1. Découpage de l'URL pour générer les breadcrumbs
    const segments = pathname.split('/').filter(Boolean)

    const breadcrumbs = segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/')
        // Libellé personnalisé ou fallback propre (ex: "back-end" -> "Back End")
        const name = segment.replace(/-/g, ' ')

        return { name, href }
    })

    const backItem = breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2] : null
    const displayTitle = title || breadcrumbs[breadcrumbs.length - 1]?.name || 'Home'

    return (
        <div className="my-4">
            {/* Mobile : Retour rapide */}
            {backItem && (
                <nav aria-label="Back" className="sm:hidden">
                    <Link
                        href={backItem.href}
                        className="flex items-center text-sm font-medium text-muted hover:text-foreground"
                    >
                        <ChevronLeftIcon aria-hidden="true" className="-ml-1 mr-1 size-5 shrink-0 text-muted" />
                        Retour
                    </Link>
                </nav>
            )}

            {/* Desktop : Fil d'Ariane */}
            <nav aria-label="Breadcrumb" className="hidden sm:flex">
                <ol role="list" className="flex items-center space-x-4">
                    <li>
                        <Link href="/public" className="text-sm font-medium text-muted hover:text-foreground">
                            {isMounted ? t('Home') : 'Home'}
                        </Link>
                    </li>
                    {breadcrumbs.map((item, index) => {
                        const isLast = index === breadcrumbs.length - 1
                        return (
                            <li key={item.href}>
                                <div className="flex items-center">
                                    <ChevronRightIcon aria-hidden="true" className="size-5 shrink-0 text-muted mr-4" />
                                    <Link
                                        href={item.href}
                                        aria-current={isLast ? 'page' : undefined}
                                        className={`text-sm font-medium capitalize ${
                                            isLast ? 'text-foreground font-semibold' : 'text-muted hover:text-foreground'
                                        }`}
                                    >
                                        {isMounted ? t(item.name) : item.name}
                                    </Link>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </nav>

            {/* En-tête */}
            <div className="mt-2 md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl/7 font-bold text-foreground capitalize sm:truncate sm:text-3xl sm:tracking-tight">
                        {isMounted ? t(displayTitle) : displayTitle}
                    </h2>
                </div>
                {actions && (
                    <div className="mt-4 flex shrink-0 space-x-3 md:ml-4 md:mt-0">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    )
}