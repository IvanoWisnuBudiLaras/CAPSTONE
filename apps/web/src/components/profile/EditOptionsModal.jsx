export default function EditOptionsModal({ onEditFoto, onEditUsername, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 z-10">

        <h2 className="font-bebas text-2xl tracking-widest text-navy mb-5 text-center">
          Edit Profil
        </h2>

        <div className="flex flex-col gap-3">
          <button
            onClick={onEditFoto}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 border-gray-100 hover:border-teal hover:bg-teal/5 transition-colors group"
          >
            <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center text-xl group-hover:bg-teal/20 transition-colors">
              📷
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-navy">Edit Foto</p>
              <p className="text-xs text-gray-400 font-semibold">Ganti foto profil kamu</p>
            </div>
          </button>

          <button
            onClick={onEditUsername}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 border-gray-100 hover:border-teal hover:bg-teal/5 transition-colors group"
          >
            <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center text-xl group-hover:bg-teal/20 transition-colors">
              ✏️
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-navy">Edit Username</p>
              <p className="text-xs text-gray-400 font-semibold">Ganti nama pengguna kamu</p>
            </div>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 rounded-full border-2 border-gray-200 font-bebas text-sm tracking-widest text-gray-400 hover:bg-gray-100 transition-colors"
        >
          Batal
        </button>
      </div>
    </div>
  );
}