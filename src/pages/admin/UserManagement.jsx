import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Search, Ban, CheckCircle, Trash2, ArrowLeft, ArrowRight, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const UserManagement = () => {
  const { users, setUsers } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter users who are customers/admins (excluding riders or handling role list)
  const customers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  );

  const totalPages = Math.ceil(customers.length / itemsPerPage);
  
  // Slice for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = customers.slice(startIndex, startIndex + itemsPerPage);

  const handleToggleBlock = (userId, currentStatus) => {
    const nextStatus = currentStatus === 'blocked' ? 'active' : 'blocked';
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: nextStatus } : u));
    toast.success(`User is now ${nextStatus}`);
  };

  const handleDelete = (userId, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      toast.success(`${name} account deleted`);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6">
      
      {/* Title & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-display font-extrabold text-xl text-dark">User Account Records</h2>
          <p className="text-xs text-gray-400 font-semibold mt-1 uppercase">Manage consumer and administrator login privileges.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search by name, email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset page
            }}
            className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-primary text-xs font-semibold transition"
          />
        </div>
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <th className="pb-3">User ID</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Contact</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">Wallet</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs font-medium text-gray-650">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => {
                const isBlocked = user.status === 'blocked';
                return (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 font-mono font-bold text-gray-400">{user.id}</td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-2">
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-8 h-8 rounded-lg object-cover bg-slate-100"
                        />
                        <span className="font-bold text-dark">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 space-y-0.5">
                      <p className="text-dark font-bold">{user.phone}</p>
                      <p className="text-[10px] text-gray-450 font-semibold">{user.email}</p>
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider ${
                        user.role === 'admin' ? 'bg-indigo-50 text-indigo-600 border' : 'bg-slate-100 text-gray-500'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-dark">
                      ₹{user.walletBalance?.toFixed(2) || '0.00'}
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        isBlocked 
                          ? 'bg-rose-50 text-rose-500 border-rose-100' 
                          : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        {user.status || 'active'}
                      </span>
                    </td>
                    <td className="py-3.5 text-right space-x-1 shrink-0 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleBlock(user.id, user.status)}
                        className={`p-2 rounded-lg border transition ${
                          isBlocked 
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100' 
                            : 'bg-rose-50 border-rose-100 text-rose-500 hover:bg-rose-100'
                        }`}
                        title={isBlocked ? "Activate User" : "Suspend User"}
                      >
                        {isBlocked ? <UserCheck size={14} /> : <Ban size={14} />}
                      </button>
                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        className="p-2 bg-slate-50 border border-slate-200 text-gray-400 hover:text-rose-500 hover:border-rose-200 rounded-lg transition"
                        title="Delete User"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-450 font-semibold">
                  No records match search parameters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, customers.length)} of {customers.length} entries
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`p-2 border rounded-xl transition ${
                currentPage === 1 
                  ? 'text-gray-300 border-gray-100 cursor-not-allowed' 
                  : 'text-gray-600 border-gray-200 hover:bg-slate-50'
              }`}
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 border rounded-xl transition ${
                currentPage === totalPages 
                  ? 'text-gray-300 border-gray-100 cursor-not-allowed' 
                  : 'text-gray-600 border-gray-200 hover:bg-slate-50'
              }`}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserManagement;
