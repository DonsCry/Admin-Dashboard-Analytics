'use client';

import { useState } from 'react';

interface Order {
    id: string;
    customer: string;
    product: string;
    amount: string;
    status: 'success' | 'pending' | 'failed';
    date: string;
}

export default function DataTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState<keyof Order>('date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const itemsPerPage = 5;

    const allOrders: Order[] = [
        { id: '#12345', customer: 'John Doe', product: 'Laptop Pro 15"', amount: '$1,299', status: 'success', date: '2024-11-28' },
        { id: '#12346', customer: 'Jane Smith', product: 'Wireless Mouse', amount: '$29', status: 'success', date: '2024-11-28' },
        { id: '#12347', customer: 'Bob Johnson', product: 'Mechanical Keyboard', amount: '$149', status: 'pending', date: '2024-11-27' },
        { id: '#12348', customer: 'Alice Brown', product: 'USB-C Hub', amount: '$79', status: 'success', date: '2024-11-27' },
        { id: '#12349', customer: 'Charlie Wilson', product: 'Monitor 27"', amount: '$399', status: 'failed', date: '2024-11-26' },
        { id: '#12350', customer: 'Diana Martinez', product: 'Webcam HD', amount: '$89', status: 'success', date: '2024-11-26' },
        { id: '#12351', customer: 'Evan Davis', product: 'Headphones Pro', amount: '$199', status: 'pending', date: '2024-11-25' },
        { id: '#12352', customer: 'Fiona Garcia', product: 'SSD 1TB', amount: '$129', status: 'success', date: '2024-11-25' },
        { id: '#12353', customer: 'George Lee', product: 'Graphics Card', amount: '$599', status: 'success', date: '2024-11-24' },
        { id: '#12354', customer: 'Hannah White', product: 'RAM 32GB', amount: '$159', status: 'pending', date: '2024-11-24' },
    ];

    // Filter orders based on search
    const filteredOrders = allOrders.filter(order =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort orders
    const sortedOrders = [...filteredOrders].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    // Pagination
    const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedOrders = sortedOrders.slice(startIndex, startIndex + itemsPerPage);

    const handleSort = (column: keyof Order) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const getStatusBadge = (status: Order['status']) => {
        const styles = {
            success: 'badge-success',
            pending: 'badge-warning',
            failed: 'badge-danger',
        };

        const labels = {
            success: 'Completed',
            pending: 'Pending',
            failed: 'Failed',
        };

        return <span className={`badge ${styles[status]}`}>{labels[status]}</span>;
    };

    return (
        <div className="glass rounded-xl p-6 card-hover">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-xl font-bold">Recent Orders</h3>
                    <p className="text-sm text-gray-400">Manage and track your orders</p>
                </div>

                {/* Search */}
                <div className="flex items-center gap-2 bg-[#24243a] rounded-lg px-4 py-2 w-full md:w-80">
                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="bg-transparent outline-none text-sm w-full"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="table-container mb-6">
                <table>
                    <thead>
                        <tr>
                            <th
                                className="cursor-pointer hover:text-[#6366f1] transition-colors"
                                onClick={() => handleSort('id')}
                            >
                                <div className="flex items-center gap-2">
                                    Order ID
                                    {sortColumn === 'id' && (
                                        <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </th>
                            <th
                                className="cursor-pointer hover:text-[#6366f1] transition-colors"
                                onClick={() => handleSort('customer')}
                            >
                                <div className="flex items-center gap-2">
                                    Customer
                                    {sortColumn === 'customer' && (
                                        <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </th>
                            <th
                                className="cursor-pointer hover:text-[#6366f1] transition-colors"
                                onClick={() => handleSort('product')}
                            >
                                <div className="flex items-center gap-2">
                                    Product
                                    {sortColumn === 'product' && (
                                        <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </th>
                            <th
                                className="cursor-pointer hover:text-[#6366f1] transition-colors"
                                onClick={() => handleSort('amount')}
                            >
                                <div className="flex items-center gap-2">
                                    Amount
                                    {sortColumn === 'amount' && (
                                        <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </th>
                            <th
                                className="cursor-pointer hover:text-[#6366f1] transition-colors"
                                onClick={() => handleSort('status')}
                            >
                                <div className="flex items-center gap-2">
                                    Status
                                    {sortColumn === 'status' && (
                                        <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </th>
                            <th
                                className="cursor-pointer hover:text-[#6366f1] transition-colors"
                                onClick={() => handleSort('date')}
                            >
                                <div className="flex items-center gap-2">
                                    Date
                                    {sortColumn === 'date' && (
                                        <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedOrders.map((order, index) => (
                            <tr key={index} className="animate-fade-in">
                                <td className="font-mono text-sm">{order.id}</td>
                                <td className="font-medium">{order.customer}</td>
                                <td className="text-gray-400">{order.product}</td>
                                <td className="font-semibold">{order.amount}</td>
                                <td>{getStatusBadge(order.status)}</td>
                                <td className="text-gray-400">{order.date}</td>
                                <td>
                                    <button className="text-[#6366f1] hover:text-[#8b5cf6] transition-colors">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-400">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedOrders.length)} of {sortedOrders.length} orders
                </p>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg bg-[#24243a] hover:bg-[#2d2d44] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>

                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 rounded-lg transition-all ${currentPage === page
                                        ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white'
                                        : 'bg-[#24243a] hover:bg-[#2d2d44]'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg bg-[#24243a] hover:bg-[#2d2d44] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
