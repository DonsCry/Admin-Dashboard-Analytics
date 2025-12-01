'use client';

export default function Charts() {
    // Sample data for charts
    const lineData = [
        { month: 'Jan', value: 4000 },
        { month: 'Feb', value: 3000 },
        { month: 'Mar', value: 5000 },
        { month: 'Apr', value: 4500 },
        { month: 'May', value: 6000 },
        { month: 'Jun', value: 5500 },
    ];

    const barData = [
        { category: 'Product A', value: 4000 },
        { category: 'Product B', value: 3000 },
        { category: 'Product C', value: 2000 },
        { category: 'Product D', value: 2780 },
        { category: 'Product E', value: 1890 },
    ];

    const pieData = [
        { name: 'Electronics', value: 35, color: '#6366f1' },
        { name: 'Clothing', value: 25, color: '#8b5cf6' },
        { name: 'Food', value: 20, color: '#ec4899' },
        { name: 'Books', value: 12, color: '#f59e0b' },
        { name: 'Others', value: 8, color: '#10b981' },
    ];

    const maxLineValue = Math.max(...lineData.map(d => d.value));
    const maxBarValue = Math.max(...barData.map(d => d.value));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart - Revenue Trend */}
            <div className="glass rounded-xl p-6 card-hover">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold">Revenue Trend</h3>
                        <p className="text-sm text-gray-400">Monthly revenue overview</p>
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold">
                        +12.5%
                    </div>
                </div>

                {/* Simple Line Chart */}
                <div className="h-64 flex items-end justify-between gap-2">
                    {lineData.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full flex items-end justify-center h-48">
                                <div
                                    className="w-full relative group cursor-pointer"
                                    style={{ height: `${(item.value / maxLineValue) * 100}%` }}
                                >
                                    {/* Line Point */}
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-full shadow-lg shadow-[#6366f1]/50 group-hover:scale-150 transition-transform"></div>

                                    {/* Tooltip */}
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1a1a24] px-3 py-1 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        ${item.value}
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">{item.month}</span>
                        </div>
                    ))}
                </div>

                {/* Connecting Line SVG */}
                <svg className="absolute inset-0 pointer-events-none" style={{ top: '80px', height: '192px' }}>
                    <polyline
                        points={lineData.map((item, i) => {
                            const x = (i / (lineData.length - 1)) * 100;
                            const y = 100 - (item.value / maxLineValue) * 100;
                            return `${x}%,${y}%`;
                        }).join(' ')}
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Bar Chart - Product Revenue */}
            <div className="glass rounded-xl p-6 card-hover">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold">Product Revenue</h3>
                        <p className="text-sm text-gray-400">Top selling products</p>
                    </div>
                    <select className="bg-[#24243a] px-3 py-1 rounded-lg text-sm outline-none cursor-pointer">
                        <option>This Month</option>
                        <option>Last Month</option>
                        <option>This Year</option>
                    </select>
                </div>

                {/* Bar Chart */}
                <div className="h-64 flex items-end justify-between gap-3">
                    {barData.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full flex items-end justify-center h-48">
                                <div
                                    className="w-full bg-gradient-to-t from-[#6366f1] to-[#8b5cf6] rounded-t-lg relative group cursor-pointer hover:from-[#8b5cf6] hover:to-[#6366f1] transition-all duration-300"
                                    style={{ height: `${(item.value / maxBarValue) * 100}%` }}
                                >
                                    {/* Tooltip */}
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1a1a24] px-3 py-1 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        ${item.value}
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs text-gray-400 font-medium text-center">{item.category}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pie Chart - Category Distribution */}
            <div className="glass rounded-xl p-6 card-hover lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold">Sales by Category</h3>
                        <p className="text-sm text-gray-400">Distribution across categories</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    {/* Pie Chart */}
                    <div className="relative w-64 h-64">
                        <svg viewBox="0 0 200 200" className="transform -rotate-90">
                            {pieData.reduce((acc, item, index) => {
                                const total = pieData.reduce((sum, d) => sum + d.value, 0);
                                const percentage = item.value / total;
                                const startAngle = acc.angle;
                                const endAngle = startAngle + percentage * 360;

                                const startRad = (startAngle * Math.PI) / 180;
                                const endRad = (endAngle * Math.PI) / 180;

                                const x1 = 100 + 80 * Math.cos(startRad);
                                const y1 = 100 + 80 * Math.sin(startRad);
                                const x2 = 100 + 80 * Math.cos(endRad);
                                const y2 = 100 + 80 * Math.sin(endRad);

                                const largeArc = percentage > 0.5 ? 1 : 0;

                                const path = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;

                                acc.paths.push(
                                    <path
                                        key={index}
                                        d={path}
                                        fill={item.color}
                                        className="hover:opacity-80 transition-opacity cursor-pointer"
                                        stroke="#1a1a24"
                                        strokeWidth="2"
                                    />
                                );

                                acc.angle = endAngle;
                                return acc;
                            }, { angle: 0, paths: [] as JSX.Element[] }).paths}

                            {/* Center Circle */}
                            <circle cx="100" cy="100" r="50" fill="#1a1a24" />
                        </svg>

                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <p className="text-3xl font-bold">100%</p>
                            <p className="text-sm text-gray-400">Total Sales</p>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="space-y-3">
                        {pieData.map((item, index) => (
                            <div key={index} className="flex items-center gap-3 group cursor-pointer">
                                <div
                                    className="w-4 h-4 rounded-full group-hover:scale-125 transition-transform"
                                    style={{ backgroundColor: item.color }}
                                ></div>
                                <span className="text-sm font-medium">{item.name}</span>
                                <span className="text-sm text-gray-400 ml-auto">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
