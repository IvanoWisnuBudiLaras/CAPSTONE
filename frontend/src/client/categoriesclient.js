'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Plus, Search, X, Trash2, Pencil, Tag } from 'lucide-react';
import Navbar from '@/components/Navbars';
import { categoryService } from '@/services';

const ALLOCATION_BADGE = {
    pribadi: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    keluarga: 'bg-pink-100 text-pink-700 border-pink-200',
    tabungan: 'bg-green-100 text-green-700 border-green-200',
}

const ALLOCATION_LABEL = {
    pribadi: 'Pribadi',
    keluarga: 'Keluarga',
    tabungan: 'Tabungan',
}

const DEFAULT_COLORS = [
    '#14b8a6', '#6366f1', '#ec4899', '#f97316', '#3b82f6',
    '#22c55e', '#a855f7', '#ef4444', '#eab308', '#06b6d4',
]

const EMPTY_FORM = {
    name: '', allocation_type: 'pribadi', color: '#14b8a6', icon: 'wallet', is_salary: false,
}

// ── Modal Tambah / Edit Kategori ───────────────────────────────
function CategoryModal({ open, onClose, onSave, editData }) {
    const [form, setForm] = useState(EMPTY_FORM)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)
    const overlayRef = useRef(null)
    const isEdit = !!editData

    useEffect(() => {
        if (!open) return
        setError(null)
        setForm(editData ? {
            name: editData.name,
            allocation_type: editData.allocationType,
            color: editData.color || '#14b8a6',
            icon: editData.icon || 'wallet',
            is_salary: editData.isSalary || false,
        } : EMPTY_FORM)
    }, [open, editData])

    useEffect(() => {
        function h(e) { if (e.key === 'Escape') onClose() }
        if (open) window.addEventListener('keydown', h)
        return () => window.removeEventListener('keydown', h)
    }, [open])

    function handleOverlay(e) {
        if (e.target === overlayRef.current) onClose()
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!form.name.trim()) { setError('Nama kategori wajib diisi'); return }
        setSaving(true); setError(null)
        try {
            if (isEdit) {
                await categoryService.update(editData.id, {
                    name: form.name, color: form.color, icon: form.icon,
                })
            } else {
                await categoryService.create({
                    name: form.name,
                    allocation_type: form.allocation_type,
                    color: form.color,
                    icon: form.icon,
                    is_salary: form.is_salary,
                })
            }
            onSave()
            onClose()
        } catch (err) {
            setError(err.response?.data?.error || 'Gagal menyimpan kategori')
        }
        setSaving(false)
    }

    if (!open) return null

    return (
        <div
            ref={overlayRef}
            onClick={handleOverlay}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="font-bold text-sm tracking-wide">
                        {isEdit ? 'EDIT KATEGORI' : 'TAMBAH KATEGORI'}
                    </h2>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                        <X size={18} className="text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">

                    {/* Nama */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5 tracking-wide">NAMA KATEGORI</label>
                        <input
                            type="text" required autoFocus
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            placeholder="Contoh: Makan & Minum"
                            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>

                    {/* Tipe alokasi — disabled saat edit */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5 tracking-wide">TIPE ALOKASI</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['pribadi', 'keluarga', 'tabungan'].map(type => (
                                <button
                                    key={type} type="button"
                                    disabled={isEdit}
                                    onClick={() => !isEdit && setForm({ ...form, allocation_type: type })}
                                    className={`py-2 rounded-xl text-xs font-bold border transition-colors capitalize ${form.allocation_type === type
                                        ? ALLOCATION_BADGE[type] + ' border-current'
                                        : 'border-gray-200 text-gray-400 hover:bg-gray-50'
                                        } ${isEdit ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    {ALLOCATION_LABEL[type]}
                                </button>
                            ))}
                        </div>
                        {isEdit && <p className="text-xs text-gray-400 mt-1">Tipe alokasi tidak bisa diubah setelah dibuat.</p>}
                    </div>

                    {/* Warna */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1.5 tracking-wide">WARNA</label>
                        <div className="flex items-center gap-3">
                            <div className="flex gap-2 flex-wrap">
                                {DEFAULT_COLORS.map(c => (
                                    <button
                                        key={c} type="button"
                                        onClick={() => setForm({ ...form, color: c })}
                                        className={`w-7 h-7 rounded-full transition-transform hover:scale-110 ${form.color === c ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
                                            }`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>
                            <input
                                type="color" value={form.color}
                                onChange={e => setForm({ ...form, color: e.target.value })}
                                className="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer p-0.5"
                                title="Warna custom"
                            />
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full shrink-0" style={{ backgroundColor: form.color }} />
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{form.name || 'Nama kategori'}</p>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${ALLOCATION_BADGE[form.allocation_type]}`}>
                                {ALLOCATION_LABEL[form.allocation_type]}
                            </span>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="flex gap-3 pt-1">
                        <button type="button" onClick={onClose}
                            className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button type="submit" disabled={saving}
                            className="flex-1 bg-teal-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-teal-600 transition-colors disabled:opacity-50"
                        >
                            {saving ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// ── Halaman Kategori ───────────────────────────────────────────
export default function Categories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [editData, setEditData] = useState(null)
    const [search, setSearch] = useState('')
    const [filterAlloc, setFilterAlloc] = useState('')

    useEffect(() => { loadAll() }, [])

    async function loadAll() {
        setLoading(true)
        try {
            const r = await categoryService.getAll()
            setCategories(r.data.data)
        } catch (e) { console.error(e) }
        setLoading(false)
    }

    async function handleDelete(id) {
        if (!confirm('Hapus kategori ini? Transaksi yang terkait tidak akan ikut terhapus.')) return
        try {
            await categoryService.remove(id)
            loadAll()
        } catch (e) {
            alert(e.response?.data?.error || 'Gagal menghapus kategori')
        }
    }

    function handleEdit(cat) {
        setEditData(cat)
        setModalOpen(true)
    }

    function handleAdd() {
        setEditData(null)
        setModalOpen(true)
    }

    // Filter client-side
    const filtered = useMemo(() => {
        let data = [...categories]
        if (filterAlloc) data = data.filter(c => c.allocationType === filterAlloc)
        if (search) {
            const q = search.toLowerCase()
            data = data.filter(c => c.name.toLowerCase().includes(q))
        }
        return data
    }, [categories, search, filterAlloc])

    // Hitung per tipe
    const counts = useMemo(() => ({
        total: categories.length,
        pribadi: categories.filter(c => c.allocationType === 'pribadi').length,
        keluarga: categories.filter(c => c.allocationType === 'keluarga').length,
        tabungan: categories.filter(c => c.allocationType === 'tabungan').length,
    }), [categories])

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="w-full px-6 lg:px-10 py-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-xl font-bold tracking-wide text-gray-800">KATEGORI</h1>
                        <p className="text-sm text-gray-400 mt-0.5">{filtered.length} kategori ditemukan</p>
                    </div>
                    <button onClick={handleAdd}
                        className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 text-white rounded-xl text-sm font-bold hover:bg-teal-600 transition-colors self-start sm:self-auto"
                    >
                        <Plus size={16} />
                        Tambah Kategori
                    </button>
                </div>

                {/* Summary chips */}
                <div className="flex flex-wrap gap-3 mb-5">
                    {[
                        { label: `Semua (${counts.total})`, value: '', cls: 'bg-gray-100 text-gray-600 border-gray-200' },
                        { label: `Pribadi (${counts.pribadi})`, value: 'pribadi', cls: ALLOCATION_BADGE.pribadi },
                        { label: `Keluarga (${counts.keluarga})`, value: 'keluarga', cls: ALLOCATION_BADGE.keluarga },
                        { label: `Tabungan (${counts.tabungan})`, value: 'tabungan', cls: ALLOCATION_BADGE.tabungan },
                    ].map(({ label, value, cls }) => (
                        <button
                            key={value}
                            onClick={() => setFilterAlloc(value)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${cls} ${filterAlloc === value ? 'ring-2 ring-offset-1 ring-gray-400' : 'opacity-70 hover:opacity-100'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Search bar */}
                <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-5 flex flex-wrap gap-3 items-center shadow-sm">
                    <div className="relative flex-1 min-w-50">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text" placeholder="Cari nama kategori..."
                            value={search} onChange={e => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>
                    {(search || filterAlloc) && (
                        <button onClick={() => { setSearch(''); setFilterAlloc('') }}
                            className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        >
                            <X size={14} /> Reset
                        </button>
                    )}
                </div>

                {/* Tabel */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50">
                                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 tracking-wider">WARNA</th>
                                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 tracking-wider">NAMA</th>
                                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 tracking-wider">TIPE ALOKASI</th>
                                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 tracking-wider">STATUS</th>
                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 tracking-wider text-right">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={5} className="text-center py-16 text-gray-400">Memuat kategori...</td></tr>
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-16">
                                            <Tag size={32} className="text-gray-200 mx-auto mb-3" />
                                            <p className="text-gray-400 mb-2">Belum ada kategori</p>
                                            <button onClick={handleAdd} className="text-teal-500 text-sm font-medium hover:underline">
                                                + Tambah kategori pertama
                                            </button>
                                        </td>
                                    </tr>
                                ) : filtered.map((cat, i) => (
                                    <tr key={cat.id}
                                        className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/40'}`}
                                    >
                                        {/* Warna dot */}
                                        <td className="px-5 py-3.5">
                                            <div className="w-8 h-8 rounded-full shrink-0" style={{ backgroundColor: cat.color || '#14b8a6' }} />
                                        </td>

                                        {/* Nama */}
                                        <td className="px-5 py-3.5 font-semibold text-gray-800">{cat.name}</td>

                                        {/* Tipe alokasi */}
                                        <td className="px-5 py-3.5">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${ALLOCATION_BADGE[cat.allocationType] || ''}`}>
                                                {ALLOCATION_LABEL[cat.allocationType] || cat.allocationType}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2">
                                                {cat.isDefault && (
                                                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200">
                                                        Default
                                                    </span>
                                                )}
                                                {cat.isSalary && (
                                                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-700 border border-teal-200">
                                                        Gaji
                                                    </span>
                                                )}
                                                {!cat.isDefault && !cat.isSalary && (
                                                    <span className="text-gray-300 text-xs">—</span>
                                                )}
                                            </div>
                                        </td>

                                        {/* Aksi */}
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => handleEdit(cat)}
                                                    className="p-1.5 text-gray-400 hover:text-teal-500 hover:bg-teal-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil size={15} />
                                                </button>
                                                {!cat.isDefault && (
                                                    <button onClick={() => handleDelete(cat.id)}
                                                        className="p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    {filtered.length > 0 && (
                        <div className="px-5 py-3 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <span className="text-xs text-gray-400">{filtered.length} kategori</span>
                            <div className="flex gap-3 text-xs">
                                {Object.entries(ALLOCATION_LABEL).map(([key, label]) => {
                                    const count = filtered.filter(c => c.allocationType === key).length
                                    return count > 0 ? (
                                        <span key={key} className={`font-semibold px-2 py-0.5 rounded-full border ${ALLOCATION_BADGE[key]}`}>
                                            {label}: {count}
                                        </span>
                                    ) : null
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <CategoryModal
                open={modalOpen}
                onClose={() => { setModalOpen(false); setEditData(null) }}
                onSave={loadAll}
                editData={editData}
            />
        </div>
    )
}