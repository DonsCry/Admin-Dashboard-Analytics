'use client';

export default function KPICards() {
    const kpis = [
        {
            title: 'Total Revenue',
            value: '$45,231',
            change: '+20.1%',
            isPositive: true,
            icon: '💰',
            color: 'from-emerald-500 to-teal-600',
        },
        {
            title: 'Total Orders',
            value: '2,456',
            change: '+15.3%',
            isPositive: true,
            icon: '🛒',
            color: 'from-blue-500 to-cyan-600',
        },
        {
            title: 'Active Users',
            value: '8,234',
            change: '+8.2%',
            isPositive: true,
            icon: '👥',
            color: 'from-purple-500 to-pink-600',
        },
        {
            title: 'Conversion Rate',
            value: '3.24%',
            change: '-2.4%',
            isPositive: false,
            icon: '📈',
            color: 'from-orange-500 to-red-600',
        },
        {
            title: 'Avg. Order Value',
            value: '$18.42',
            change: '+12.5%',
            isPositive: true,
            icon: '💳',
            color: 'from-indigo-500 to-purple-600',
        },
        {
            title: 'Customer Satisfaction',
            value: '4.8/5',
            change: '+0.3',
            isPositive: true,
            icon: '⭐',
            color: 'from-yellow-500 to-orange-600',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {kpis.map((kpi, index) => (
                <div
                    key={index}
                    className="relative group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    {/* Card */}
                    <div className="glass rounded-xl p-6 card-hover">
                        {/* Icon Circle */}
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${kpi.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                            {kpi.icon}
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                            <p className="text-sm text-gray-400 font-medium">{kpi.title}</p>
                            <h3 className="text-3xl font-bold">{kpi.value}</h3>

                            {/* Change Indicator */}
                            <div className="flex items-center gap-2">
                                <span
                                    className={`flex items-center gap-1 text-sm font-semibold ${kpi.isPositive ? 'text-green-400' : 'text-red-400'
                                        }`}
                                >
                                    {kpi.isPositive ? (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                    {kpi.change}
                                </span>
                                <span className="text-xs text-gray-500">vs last month</span>
                            </div>
                        </div>

                        {/* Gradient Border Effect */}
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${kpi.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
