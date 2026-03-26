'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Plus, Search, X, Trash2, Pencil, Target } from 'lucide-react';
import Navbar from '@/components/Navbars';
import { budgetService, categoryService } from '@/services';

const ALLOCATION_BADGE = {
  pribadi:  'bg-indigo-100 text-indigo-700 border-indigo-200',
  keluarga: 'bg-pink-100 text-pink-700 border-pink-200',
  tabungan: 'bg-green-100 text-green-700 border-green-200',
}

const ALLOCATION_LABEL = {
  pribadi: 'Pribadi', keluarga: 'Keluarga', tabungan: 'Tabungan',
}

const fmt = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n || 0)

const progressColor = (pct) => {
  if (pct <= 50) return 'bg-emerald-400'
  if (pct <= 80) return 'bg-yellow-400'
  return 'bg-red-500'
}

const EMPTY_FORM = {
  category_id: '', limit_amount: '',
  period_month: new Date().getMonth() + 1,
  period_year:  new Date().getFullYear(),
}

// ── Modal Tambah / Edit Budget ─────────────────────────────────
function BudgetModal({ open, onClose, onSave, editData, categories }) {
  const [form,   setForm]   = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState(null)
  const overlayRef = useRef(null)
  const isEdit = !!editData

  useEffect(() => {
    if (!open) return
    setError(null)
    setForm(editData ? {
      category_id:  editData.categoryId,
      limit_amount: editData.limitAmount,
      period_month: editData.periodMonth,
      period_year:  editData.periodYear,
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
    if (!form.category_id)   { setError('Pilih kategori terlebih dahulu'); return }
    if (!form.limit_amount || parseFloat(form.limit_amount) <= 0) { setError('Limit harus lebih dari 0'); return }
    setSaving(true); setError(null)
    try {
      if (isEdit) {
        await budgetService.update(editData.id, parseFloat(form.limit_amount))
      } else {
        await budgetService.create({
          category_id:  form.category_id,
          limit_amount: parseFloat(form.limit_amount),
          period_month: parseInt(form.period_month),
          period_year:  parseInt(form.period_year),
        })
      }
      onSave()
      onClose()
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal menyimpan budget')
    }
    setSaving(false)
  }

  const months = [
    'Januari','Februari','Maret','April','Mei','Juni',
    'Juli','Agustus','September','Oktober','November','Desember'
  ]
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)

  const selectedCat = categories.find(c => c.id === form.category_id)

  if (!open) return null

  return (
    <div ref={overlayRef} onClick={handleOverlay}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-sm tracking-wide">{isEdit ? 'EDIT BUDGET' : 'TAMBAH BUDGET'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">

          {/* Kategori — disabled saat edit */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 tracking-wide">KATEGORI</label>
            <select
              value={form.category_id}
              onChange={e => setForm({ ...form, category_id: e.target.value })}
              disabled={isEdit}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Pilih kategori</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name} — {ALLOCATION_LABEL[c.allocationType]}</option>
              ))}
            </select>
            {isEdit && <p className="text-xs text-gray-400 mt-1">Kategori tidak bisa diubah, hanya limit yang bisa diedit.</p>}
          </div>

          {/* Limit */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 tracking-wide">LIMIT PENGELUARAN (RP)</label>
            <input
              type="number" min="1" required autoFocus={isEdit}
              value={form.limit_amount}
              onChange={e => setForm({ ...form, limit_amount: e.target.value })}
              placeholder="500.000"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Periode — disabled saat edit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 tracking-wide">BULAN</label>
              <select
                value={form.period_month}
                onChange={e => setForm({ ...form, period_month: e.target.value })}
                disabled={isEdit}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {months.map((m, i) => <option key={i} value={i+1}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 tracking-wide">TAHUN</label>
              <select
                value={form.period_year}
                onChange={e => setForm({ ...form, period_year: e.target.value })}
                disabled={isEdit}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* Preview */}
          {selectedCat && form.limit_amount && (
            <div className="bg-gray-50 rounded-xl px-4 py-3 flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedCat.color || '#14b8a6' }} />
                  <span className="font-medium text-gray-700">{selectedCat.name}</span>
                </div>
                <span className="font-bold text-gray-800">{fmt(parseFloat(form.limit_amount) || 0)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 bg-teal-400 rounded-full w-0" />
              </div>
              <p className="text-xs text-gray-400">Budget baru — belum ada pengeluaran</p>
            </div>
          )}

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

// ── Halaman Budget ─────────────────────────────────────────────
export default function Budgets() {
  const [budgets,    setBudgets]    = useState([])
  const [categories, setCategories] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [modalOpen,  setModalOpen]  = useState(false)
  const [editData,   setEditData]   = useState(null)
  const [search,     setSearch]     = useState('')
  const [filterAlloc, setFilterAlloc] = useState('')
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1)
  const [filterYear,  setFilterYear]  = useState(new Date().getFullYear())

  useEffect(() => { loadAll() }, [filterMonth, filterYear])

  async function loadAll() {
    setLoading(true)
    try {
      const [b, c] = await Promise.all([
        budgetService.getAll(filterMonth, filterYear),
        categoryService.getAll(),
      ])
      setBudgets(b.data.data)
      setCategories(c.data.data)
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  async function handleDelete(id) {
    if (!confirm('Hapus budget ini?')) return
    try {
      await budgetService.remove(id)
      loadAll()
    } catch (e) {
      alert(e.response?.data?.error || 'Gagal menghapus budget')
    }
  }

  function handleEdit(b) { setEditData(b); setModalOpen(true) }
  function handleAdd()   { setEditData(null); setModalOpen(true) }

  const filtered = useMemo(() => {
    let data = [...budgets]
    if (filterAlloc) data = data.filter(b => b.category?.allocationType === filterAlloc)
    if (search) {
      const q = search.toLowerCase()
      data = data.filter(b => b.category?.name?.toLowerCase().includes(q))
    }
    return data
  }, [budgets, search, filterAlloc])

  const months = [
    'Januari','Februari','Maret','April','Mei','Juni',
    'Juli','Agustus','September','Oktober','November','Desember'
  ]
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)

  const totalLimit = filtered.reduce((s, b) => s + parseFloat(b.limitAmount), 0)
  const totalSpent = filtered.reduce((s, b) => s + (b.spentAmount || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="w-full px-6 lg:px-10 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold tracking-wide text-gray-800">BUDGET</h1>
            <p className="text-sm text-gray-400 mt-0.5">{filtered.length} budget ditemukan</p>
          </div>
          <button onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 text-white rounded-xl text-sm font-bold hover:bg-teal-600 transition-colors self-start sm:self-auto"
          >
            <Plus size={16} />
            Tambah Budget
          </button>
        </div>

        {/* Filter chips alokasi */}
        <div className="flex flex-wrap gap-3 mb-5">
          {[
            { label: 'Semua',    value: '',         cls: 'bg-gray-100 text-gray-600 border-gray-200' },
            { label: 'Pribadi',  value: 'pribadi',  cls: ALLOCATION_BADGE.pribadi                    },
            { label: 'Keluarga', value: 'keluarga', cls: ALLOCATION_BADGE.keluarga                   },
            { label: 'Tabungan', value: 'tabungan', cls: ALLOCATION_BADGE.tabungan                   },
          ].map(({ label, value, cls }) => (
            <button key={value} onClick={() => setFilterAlloc(value)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${cls} ${
                filterAlloc === value ? 'ring-2 ring-offset-1 ring-gray-400' : 'opacity-70 hover:opacity-100'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Filter bar */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-5 flex flex-wrap gap-3 items-center shadow-sm">
          <div className="relative flex-1 min-w-45">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text" placeholder="Cari nama kategori..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <select value={filterMonth} onChange={e => setFilterMonth(Number(e.target.value))}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
          >
            {months.map((m, i) => <option key={i} value={i+1}>{m}</option>)}
          </select>
          <select value={filterYear} onChange={e => setFilterYear(Number(e.target.value))}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
          >
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
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
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 tracking-wider">KATEGORI</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 tracking-wider">ALOKASI</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 tracking-wider w-48">PROGRESS</th>
                  <th className="text-right px-5 py-3.5 text-xs font-bold text-gray-500 tracking-wider">TERPAKAI</th>
                  <th className="text-right px-5 py-3.5 text-xs font-bold text-gray-500 tracking-wider">LIMIT</th>
                  <th className="text-right px-5 py-3.5 text-xs font-bold text-gray-500 tracking-wider">SISA</th>
                  <th className="px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className="text-center py-16 text-gray-400">Memuat budget...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16">
                      <Target size={32} className="text-gray-200 mx-auto mb-3" />
                      <p className="text-gray-400 mb-2">Belum ada budget bulan ini</p>
                      <button onClick={handleAdd} className="text-teal-500 text-sm font-medium hover:underline">
                        + Tambah budget pertama
                      </button>
                    </td>
                  </tr>
                ) : filtered.map((b, i) => {
                  const pct  = Math.min(Math.round(((b.spentAmount || 0) / parseFloat(b.limitAmount)) * 100), 100)
                  const sisa = parseFloat(b.limitAmount) - (b.spentAmount || 0)
                  return (
                    <tr key={b.id}
                      className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/40'}`}
                    >
                      {/* Kategori */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: b.category?.color || '#14b8a6' }}
                          />
                          <span className="font-semibold text-gray-800">
                            {b.category?.name || '—'}
                          </span>
                        </div>
                      </td>

                      {/* Alokasi */}
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          ALLOCATION_BADGE[b.category?.allocationType] || 'bg-gray-100 text-gray-500'
                        }`}>
                          {ALLOCATION_LABEL[b.category?.allocationType] || '—'}
                        </span>
                      </td>

                      {/* Progress bar */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-2 ${progressColor(pct)} rounded-full transition-all duration-500`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className={`text-xs font-bold min-w-9 text-right ${
                            pct >= 100 ? 'text-red-500' : pct >= 80 ? 'text-yellow-600' : 'text-gray-500'
                          }`}>
                            {pct}%
                          </span>
                        </div>
                      </td>

                      {/* Terpakai */}
                      <td className="px-5 py-3.5 text-right text-gray-700 font-medium">
                        {fmt(b.spentAmount || 0)}
                      </td>

                      {/* Limit */}
                      <td className="px-5 py-3.5 text-right text-gray-500">
                        {fmt(parseFloat(b.limitAmount))}
                      </td>

                      {/* Sisa */}
                      <td className={`px-5 py-3.5 text-right font-bold ${sisa >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {sisa >= 0 ? fmt(sisa) : `−${fmt(Math.abs(sisa))}`}
                      </td>

                      {/* Aksi */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => handleEdit(b)}
                            className="p-1.5 text-gray-400 hover:text-teal-500 hover:bg-teal-50 rounded-lg transition-colors"
                          >
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => handleDelete(b.id)}
                            className="p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
              <span className="text-xs text-gray-400">{filtered.length} budget</span>
              <div className="flex gap-4 text-xs font-semibold">
                <span className="text-gray-500">Limit total: <span className="text-gray-700">{fmt(totalLimit)}</span></span>
                <span className="text-gray-500">Terpakai: <span className={totalSpent > totalLimit ? 'text-red-500' : 'text-gray-700'}>{fmt(totalSpent)}</span></span>
                <span className="text-gray-500">Sisa: <span className={totalLimit - totalSpent >= 0 ? 'text-green-600' : 'text-red-500'}>{fmt(totalLimit - totalSpent)}</span></span>
              </div>
            </div>
          )}
        </div>
      </div>

      <BudgetModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditData(null) }}
        onSave={loadAll}
        editData={editData}
        categories={categories}
      />
    </div>
  )
}