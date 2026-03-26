"use client";
import { useState } from "react";

export default function EditUsernameModal({ currentUsername, onSave, onClose }) {
  const [username, setUsername] = useState(currentUsername ?? "");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!username.trim()) {
      setError("Username tidak boleh kosong.");
      return;
    }
    if (username.trim().length < 3) {
      setError("Username minimal 3 karakter.");
      return;
    }
    onSave(username.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">

        <h2 className="font-bebas text-2xl tracking-widest text-navy mb-5 text-center">
          Edit Username
        </h2>

        {error && (
          <div className="bg-red/10 border border-red text-red text-sm font-semibold rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2 mb-6">
          <label className="font-bold text-sm text-navy">Username Baru</label>
          <input
            type="text"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(""); }}
            placeholder="Masukkan username baru"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-teal transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="py-2.5 rounded-full border-2 border-gray-200 font-bebas text-sm tracking-widest text-gray-400 hover:bg-gray-100 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="py-2.5 rounded-full bg-teal text-white font-bebas text-sm tracking-widest hover:bg-teal-dark transition-colors shadow-md"
          >
            Simpan
          </button>
        </div>

      </div>
    </div>
  );
}