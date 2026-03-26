"use client";
import { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/app/context/AuthContext";
import EditOptionsModal from "@/components/profile/EditOptionsModal";
import EditFotoModal from "@/components/profile/EditFotoModal";
import EditUsernameModal from "@/components/profile/EditUsernameModal";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [showEditFoto, setShowEditFoto] = useState(false);
  const [showEditUsername, setShowEditUsername] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen font-nunito text-navy">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center flex-wrap gap-3 mb-8">
          <h1 className="font-bebas text-3xl tracking-widest mr-auto">
            Profil Anda
          </h1>
          <button className="bg-teal text-white font-bebas text-sm tracking-widest px-6 py-2.5 rounded-full shadow-md hover:bg-teal-dark transition-colors">
            Tambah Akun
          </button>
          <button
            onClick={() => setShowEditOptions(true)}
            className="border-2 border-teal text-teal font-bebas text-sm tracking-widest px-6 py-2 rounded-full hover:bg-teal hover:text-white transition-colors flex items-center gap-1"
          >
            Edit Profil <span>›</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col md:flex-row gap-8 items-start">

          {/* Avatar */}
          <div className="flex flex-col items-center shrink-0 relative">
            {user?.foto ? (
              <img
                src={user.foto}
                alt="Foto Profil"
                className="w-32 h-32 rounded-full object-cover border-4 border-teal"
              />
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-teal rounded-full" />
                <div className="w-32 h-24 bg-teal rounded-[50%_50%_40%_40%/_40%_40%_60%_60%] -mt-5" />
              </div>
            )}
          </div>

          {/* Info & Stats */}
          <div className="flex flex-col gap-6 flex-1">

            {/* Info */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="font-bebas text-lg tracking-widest w-24 text-navy">Username</span>
                <span className="font-bold text-gray-400">:</span>
                <span className="font-bold text-sm uppercase tracking-wide text-gray-600">
                  {user?.username ?? "-"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bebas text-lg tracking-widest w-24 text-navy">Email</span>
                <span className="font-bold text-gray-400">:</span>
                <span className="font-bold text-sm uppercase tracking-wide text-gray-600">
                  {user?.email ?? "-"}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-blue rounded-xl p-4 text-white flex flex-col gap-2">
                <span className="font-bebas text-sm tracking-widest opacity-90">Saldo:</span>
                <span className="font-bebas text-2xl">-</span>
              </div>
              <div className="bg-navy rounded-xl p-4 text-white flex flex-col gap-2">
                <span className="font-bebas text-sm tracking-widest opacity-90">Total Catatan Pemasukan:</span>
                <span className="font-bebas text-2xl">-</span>
              </div>
              <div className="bg-navy rounded-xl p-4 text-white flex flex-col gap-2 opacity-80">
                <span className="font-bebas text-sm tracking-widest opacity-90">Total Catatan Pengeluaran:</span>
                <span className="font-bebas text-2xl">-</span>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Edit Options Modal */}
      {showEditOptions && (
        <EditOptionsModal
          onEditFoto={() => { setShowEditOptions(false); setShowEditFoto(true); }}
          onEditUsername={() => { setShowEditOptions(false); setShowEditUsername(true); }}
          onClose={() => setShowEditOptions(false)}
        />
      )}

      {/* Edit Foto Modal */}
      {showEditFoto && (
        <EditFotoModal
          currentFoto={user?.foto}
          onSave={(foto) => { updateUser({ foto }); setShowEditFoto(false); }}
          onClose={() => setShowEditFoto(false)}
        />
      )}

      {/* Edit Username Modal */}
      {showEditUsername && (
        <EditUsernameModal
          currentUsername={user?.username}
          onSave={(username) => { updateUser({ username }); setShowEditUsername(false); }}
          onClose={() => setShowEditUsername(false)}
        />
      )}
    </div>
  );
}