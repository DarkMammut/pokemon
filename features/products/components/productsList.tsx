'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'
import { useTranslation } from 'react-i18next'

export interface Product {
    id: string | number
    name: string
    type?: string
    price?: number | string
    imageUrl?: string
    isAvailable?: boolean
    availability?: boolean
}

interface ProductsListProps {
    Products?: Product[]
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

export default function ProductsList({ Products = [] }: ProductsListProps) {
    const { t } = useTranslation()
    const isMounted = useIsMounted()

    const translate = (key: string) => (isMounted ? t(key) : key)

    return (
        <div className="border-t border-border pt-11">
            <h2 className="px-4 text-2xl font-semibold text-primary sm:px-6 lg:px-8">
                {translate('products_list_title')}
            </h2>
            <table className="mt-6 w-full text-left whitespace-nowrap">
                <colgroup>
                    <col className="w-full sm:w-4/12" />
                    <col className="sm:w-3/12" />
                    <col className="sm:w-2/12" />
                    <col className="sm:w-3/12" />
                </colgroup>
                <thead className="border-b border-border text-sm/6 text-foreground">
                <tr>
                    <th scope="col" className="py-2 pr-8 pl-4 font-semibold sm:pl-6 lg:pl-8">
                        {translate('product_name')}
                    </th>
                    <th scope="col" className="hidden py-2 pr-8 pl-0 font-semibold sm:table-cell">
                        {translate('product_type')}
                    </th>
                    <th scope="col" className="py-2 pr-8 pl-0 font-semibold">
                        {translate('product_price')}
                    </th>
                    <th scope="col" className="py-2 pr-4 pl-0 font-semibold sm:pr-6 lg:pr-8">
                        {translate('product_availability')}
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-border">
                {Products.map((product) => {
                    const isAvailable = product.isAvailable ?? product.availability ?? true
                    const href = `/products/${product.id}`

                    return (
                        <tr
                            key={product.id}
                            className="hover:bg-card/60 transition-colors cursor-pointer relative"
                        >
                            <td className="py-4 pr-8 pl-4 sm:pl-6 lg:pl-8">
                                <div className="flex items-center gap-x-4">
                                    {product.imageUrl && (
                                        <img
                                            alt={product.name}
                                            src={product.imageUrl}
                                            className="size-8 rounded-full bg-border object-cover outline -outline-offset-1 outline-border"
                                        />
                                    )}
                                    <Link
                                        href={href}
                                        className="truncate text-sm/6 font-medium text-foreground hover:text-primary hover:underline transition-colors"
                                    >
                                        <span className="absolute inset-0" aria-hidden="true" />
                                        {product.name}
                                    </Link>
                                </div>
                            </td>
                            <td className="hidden py-4 pr-8 pl-0 sm:table-cell">
                                <span className="inline-flex items-center rounded-md bg-muted/15 px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-border ring-inset">
                                    {product.type}
                                </span>
                            </td>
                            <td className="py-4 pr-8 pl-0 text-sm/6 font-mono text-foreground/80">
                                {typeof product.price === 'number' ? `${product.price} €` : product.price}
                            </td>
                            <td className="py-4 pr-4 pl-0 text-sm/6 sm:pr-6 lg:pr-8">
                                <div className="flex items-center gap-x-2">
                                    <div
                                        className={classNames(
                                            isAvailable
                                                ? 'text-emerald-500 bg-emerald-500/10'
                                                : 'text-accent bg-accent/10',
                                            'flex-none rounded-full p-1'
                                        )}
                                    >
                                        <div className="size-1.5 rounded-full bg-current" />
                                    </div>
                                    <span className="text-foreground">
                                        {isAvailable
                                            ? translate('in_stock')
                                            : translate('out_of_stock')}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}