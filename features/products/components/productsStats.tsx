'use client'

import { useSyncExternalStore } from 'react'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n'

export interface Stat {
    id: string | number
    nameKey: string
    value: string | number
    unit?: string
}

interface ProductsStatsProps {
    stats?: Stat[]
    title?: string
    subtitle?: string
    environment?: string
}

const emptySubscribe = () => () => {}
function useIsMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    )
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductStats({
                                         stats = []
                                     }: ProductsStatsProps) {
    const { t } = useTranslation()
    const isMounted = useIsMounted()

    return (
        <div>
            {/* Grille de statistiques */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, statIdx) => (
                    <div
                        key={stat.id ?? stat.nameKey}
                        className={classNames(
                            statIdx % 2 === 1 ? 'sm:border-l' : '',
                            statIdx >= 2 ? 'lg:border-l' : '',
                            'border-t border-border px-4 py-6 sm:px-6 lg:px-8'
                        )}
                    >
                        <p className="text-sm/6 font-medium text-foreground">
                            {isMounted ? t(stat.nameKey) : stat.nameKey}
                        </p>
                        <p className="mt-2 flex items-baseline gap-x-2">
                            <span className="text-4xl font-semibold tracking-tight text-foreground">
                                {stat.value}
                            </span>
                            {stat.unit && (
                                <span className="text-sm text-foreground">{stat.unit}</span>
                            )}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}