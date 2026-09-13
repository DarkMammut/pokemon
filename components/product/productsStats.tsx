'use client'

const stats = [
    { name: 'Number of deploys', value: '405' },
    { name: 'Average deploy time', value: '3.65', unit: 'mins' },
    { name: 'Number of servers', value: '3' },
    { name: 'Success rate', value: '98.5%' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function ProductStats() {
    return (
<div>
<div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-50 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
    <div>
        <div className="flex items-center gap-x-3">
            <div className="flex-none rounded-full bg-green-500/10 p-1 text-green-500">
                <div className="size-2 rounded-full bg-current" />
            </div>
            <h1 className="flex gap-x-3 text-base/7">
                <span className="font-semibold text-gray-900">Planetaria</span>
                <span className="text-gray-400">/</span>
                <span className="font-semibold text-gray-900">mobile-api</span>
            </h1>
        </div>
        <p className="mt-2 text-xs/6 text-gray-500">Deploys from GitHub via main branch</p>
    </div>
    <div className="order-first flex-none rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-500 ring-1 ring-indigo-200 ring-inset sm:order-0">
        Production
    </div>
</div>

{/* Stats */}
<div className="grid grid-cols-1 bg-gray-50 sm:grid-cols-2 lg:grid-cols-4">
    {stats.map((stat, statIdx) => (
        <div
            key={stat.name}
            className={classNames(
                statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
                'border-t border-gray-200/50 px-4 py-6 sm:px-6 lg:px-8',
            )}
        >
            <p className="text-sm/6 font-medium text-gray-500">{stat.name}</p>
            <p className="mt-2 flex items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-tight text-gray-900">{stat.value}</span>
                {stat.unit ? <span className="text-sm text-gray-500">{stat.unit}</span> : null}
            </p>
        </div>
    ))}
</div>
</div>
) }