'use client'

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Products', href: '/products' },
    { name: 'Projects', href: '/projects' },
    { name: 'Calendar', href: '/calendar' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const pathname = usePathname()

    const navigation = links.map((item) => ({
        ...item,
        current: pathname === item.href,
    }))

    return (
        <Disclosure as="nav" className="relative bg-primary shadow-sm">
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex px-2 lg:px-0">
                        <div className="flex shrink-0 items-center">
                            <img
                                alt="Your Company"
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </div>

                        {/* Navigation Desktop */}
                        <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    aria-current={item.current ? 'page' : undefined}
                                    className={classNames(
                                        item.current
                                            ? 'border-secondary text-secondary'
                                            : 'border-transparent text-secondary/70 hover:border-secondary/50 hover:text-secondary',
                                        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                        <div className="grid w-full max-w-lg grid-cols-1 lg:max-w-xs">
                            <input
                                name="search"
                                type="search"
                                placeholder="Search"
                                className="col-start-1 row-start-1 block w-full rounded-md bg-background py-1.5 pr-3 pl-10 text-base text-foreground outline-1 -outline-offset-1 outline-muted/30 placeholder:text-muted focus:outline-2 focus:-outline-offset-2 focus:outline-secondary sm:text-sm/6"
                            />
                            <MagnifyingGlassIcon
                                aria-hidden="true"
                                className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-muted"
                            />
                        </div>
                    </div>

                    <div className="flex items-center lg:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-secondary/80 hover:bg-primary/80 hover:text-secondary focus:outline-2 focus:-outline-offset-1 focus:outline-secondary">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>

                    <div className="hidden lg:ml-4 lg:flex lg:items-center">
                        <button
                            type="button"
                            className="relative shrink-0 rounded-full p-1 text-secondary/80 hover:text-secondary focus:outline-2 focus:outline-offset-2 focus:outline-secondary"
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="size-6" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-4 shrink-0">
                            <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="size-8 rounded-full bg-background outline -outline-offset-1 outline-foreground/10"
                                />
                            </MenuButton>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-background py-1 shadow-lg outline-1 outline-foreground/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                            >
                                <MenuItem>
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-sm text-foreground data-focus:bg-primary/10 data-focus:outline-hidden"
                                    >
                                        Your profile
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link
                                        href="/settings"
                                        className="block px-4 py-2 text-sm text-foreground data-focus:bg-primary/10 data-focus:outline-hidden"
                                    >
                                        Settings
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-foreground data-focus:bg-primary/10 data-focus:outline-hidden"
                                    >
                                        Sign out
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>

            {/* Panel Mobile */}
            <DisclosurePanel className="lg:hidden">
                <div className="space-y-1 pt-2 pb-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as={Link}
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current
                                    ? 'border-accent bg-accent/10 text-secondary'
                                    : 'border-transparent text-secondary/80 hover:border-secondary/40 hover:bg-primary/80 hover:text-secondary',
                                'block border-l-4 py-2 pr-4 pl-3 text-base font-medium'
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
                <div className="border-t border-secondary/20 pt-4 pb-3">
                    <div className="flex items-center px-4">
                        <div className="shrink-0">
                            <img
                                alt=""
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                className="size-10 rounded-full bg-background outline -outline-offset-1 outline-foreground/10"
                            />
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium text-secondary">Tom Cook</div>
                            <div className="text-sm font-medium text-secondary/70">tom@example.com</div>
                        </div>
                        <button
                            type="button"
                            className="relative ml-auto shrink-0 rounded-full p-1 text-secondary/80 hover:text-secondary focus:outline-2 focus:outline-offset-2"
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-3 space-y-1">
                        <DisclosureButton
                            as={Link}
                            href="/profile"
                            className="block px-4 py-2 text-base font-medium text-secondary/80 hover:bg-primary/80 hover:text-secondary"
                        >
                            Your profile
                        </DisclosureButton>
                        <DisclosureButton
                            as={Link}
                            href="/settings"
                            className="block px-4 py-2 text-base font-medium text-secondary/80 hover:bg-primary/80 hover:text-secondary"
                        >
                            Settings
                        </DisclosureButton>
                        <DisclosureButton
                            as="a"
                            href="#"
                            className="block px-4 py-2 text-base font-medium text-secondary/80 hover:bg-primary/80 hover:text-secondary"
                        >
                            Sign out
                        </DisclosureButton>
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}