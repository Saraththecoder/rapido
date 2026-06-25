import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Search, Ban, Trash2, ArrowLeft, ArrowRight, UserCheck } from 'lucide-react';
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
    <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-6 text-zinc-900">
      
      {/* Title & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900">User Account Records</h2>
          <p className="text-xs text-zinc-500">Manage consumer and administrator login privileges.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
            <Search size={15} />
          </div>
          <input
            type="text"
            placeholder="Search by name, email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset page
            }}
            className="block w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-zinc-900 text-xs font-semibold transition text-zinc-900 placeholder-zinc-400"
          />
        </div>
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              <th className="pb-3">User ID</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Contact</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">Wallet</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-xs font-medium text-zinc-700">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => {
                const isBlocked = user.status === 'blocked';
                return (
                  <tr key={user.id} className="hover:bg-zinc-50 transition">
                    <td className="py-3.5 font-mono text-[11px] text-zinc-400">{user.id}</td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-8 h-8 rounded-lg border border-zinc-200 object-cover bg-zinc-50"
                        />
                        <span className="font-bold text-zinc-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 space-y-0.5">
                      <p className="text-zinc-900 font-bold">{user.phone}</p>
                      <p className="text-[10px] text-zinc-450 font-medium">{user.email}</p>
                    </td>
                    <td className="py-3.5">
                      <span className="bg-zinc-50 border border-zinc-200 text-zinc-800 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-zinc-900">
                      ₹{(user.walletBalance || 0).toFixed(2)}
                    </td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-zinc-200 text-zinc-800 bg-white">
                        <span className={`w-1.5 h-1.5 rounded-full ${isBlocked ? 'bg-zinc-450' : 'bg-emerald-500'}`}></span>
                        {user.status || 'active'}
                      </span>
                    </td>
                    <td className="py-3.5 text-right space-x-1 shrink-0 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleBlock(user.id, user.status)}
                        className="p-1.5 rounded-md border border-zinc-200 hover:border-zinc-900 text-zinc-500 hover:text-zinc-900 transition bg-white"
                        title={isBlocked ? "Activate User" : "Suspend User"}
                      >
                        {isBlocked ? <UserCheck size={13} /> : <Ban size={13} />}
                      </button>
                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        className="p-1.5 rounded-md border border-zinc-200 hover:border-zinc-900 text-zinc-500 hover:text-zinc-900 transition bg-white"
                        title="Delete User"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-10 text-zinc-400 font-bold">
                  No records match search parameters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-zinc-200 pt-4">
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, customers.length)} of {customers.length} entries
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`p-1.5 border rounded-lg transition ${
                currentPage === 1 
                  ? 'text-zinc-300 border-zinc-100 cursor-not-allowed' 
                  : 'text-zinc-650 border-zinc-200 hover:bg-zinc-50 hover:border-zinc-950'
              }`}
            >
              <ArrowLeft size={14} />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`p-1.5 border rounded-lg transition ${
                currentPage === totalPages 
                  ? 'text-zinc-300 border-zinc-100 cursor-not-allowed' 
                  : 'text-zinc-650 border-zinc-200 hover:bg-zinc-50 hover:border-zinc-950'
              }`}
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserManagement;
