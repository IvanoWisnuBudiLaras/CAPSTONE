export default function DeleteDialog({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="w-14 h-14 bg-red/10 rounded-full flex items-center justify-center text-2xl">
            🗑️
          </div>
          <h2 className="font-bebas text-2xl tracking-widest text-navy">
            Hapus Transaksi?
          </h2>
          <p className="text-sm font-semibold text-gray-400 text-center">
            Transaksi yang dihapus tidak dapat dikembalikan.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onCancel}
            className="py-2.5 rounded-full border-2 border-gray-200 font-bebas text-sm tracking-widest text-gray-400 hover:bg-gray-100 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="py-2.5 rounded-full bg-red text-white font-bebas text-sm tracking-widest hover:opacity-90 transition-colors shadow-md"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
