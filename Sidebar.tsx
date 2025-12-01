'use client';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const menuItems = [
        { icon: '📊', label: 'Dashboard', active: true },
        { icon: '🛒', label: 'Orders', active: false },
        { icon: '👥', label: 'Users', active: false },
        { icon: '📈', label: 'Analytics', active: false },
        { icon: '⚙️', label: 'Settings', active: false },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen bg-[#1a1a24] border-r border-[#2d2d44] z-30 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    } ${isOpen ? 'w-64' : 'w-0 lg:w-20'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-[#2d2d44]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-xl font-bold">
                                A
                            </div>
                            {isOpen && (
                                <div>
                                    <h2 className="font-bold text-lg">Admin</h2>
                                    <p className="text-xs text-gray-400">Dashboard</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${item.active
                                        ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-lg shadow-[#6366f1]/30'
                                        : 'text-gray-400 hover:bg-[#24243a] hover:text-white'
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                {isOpen && <span className="font-medium">{item.label}</span>}
                            </button>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-[#2d2d44]">
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200">
                            <span className="text-xl">🚪</span>
                            {isOpen && <span className="font-medium">Logout</span>}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
