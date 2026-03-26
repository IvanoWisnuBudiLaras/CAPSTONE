"use client";
import { useState, useRef } from "react";

export default function EditFotoModal({ currentFoto, onSave, onClose }) {
  const [preview, setPreview] = useState(currentFoto ?? null);
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!preview) return;
    onSave(preview);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">

        <h2 className="font-bebas text-2xl tracking-widest text-navy mb-5 text-center">
          Edit Foto Profil
        </h2>

        {/* Preview */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div
            onClick={() => inputRef.current?.click()}
            className="w-32 h-32 rounded-full border-4 border-dashed border-teal flex items-center justify-center cursor-pointer hover:bg-teal/5 transition-colors overflow-hidden"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-1 text-teal">
                <span className="text-3xl">📷</span>
                <span className="text-xs font-bold">Pilih Foto</span>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-sm font-bold text-teal hover:text-teal-dark transition-colors"
          >
            {preview ? "Ganti Foto" : "Upload Foto"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="py-2.5 rounded-full border-2 border-gray-200 font-bebas text-sm tracking-widest text-gray-400 hover:bg-gray-100 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={!preview}
            className="py-2.5 rounded-full bg-teal text-white font-bebas text-sm tracking-widest hover:bg-teal-dark transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Simpan
          </button>
        </div>

      </div>
    </div>
  );
}