'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Wallet, Eye } from 'lucide-react';
import { allocationService, categoryService } from '@/services';

const fmt = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n || 0)

const ALLOC_TYPES = [
  { value: 'pribadi',  label: 'Pribadi',  color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  { value: 'keluarga', label: 'Keluarga', color: 'bg-pink-100 text-pink-700 border-pink-200'       },
  { value: 'tabungan', label: 'Tabungan', color: 'bg-green-100 text-green-700 border-green-200'    },
]

const EMPTY_RULES = [
  { allocation_type: 'pribadi',  percentage: 50, target_category_id: '' },
  { allocation_type: 'keluarga', percentage: 30, target_category_id: '' },
  { allocation_type: 'tabungan', percentage: 20, target_category_id: '' },
]

export default function AllocationModal({ open, onClose }) {
  const [step,       setStep]       = useState('rules')  // 'rules' | 'salary' | 'preview' | 'done'
  const [rules,      setRules]      = useState(EMPTY_RULES)
  const [categories, setCategories] = useState([])
  const [salary,     setSalary]     = useState('')
  const [preview,    setPreview]    = useState(null)
  const [saving,     setSaving]     = useState(false)
  const [error,      setError]      = useState(null)
  const overlayRef = useRef(null)

  // Load data saat buka
  useEffect(() => {
    if (!open) return
    setStep('rules'); setSalary(''); setPreview(null); setError(null)
    Promise.all([
      allocationService.getAll(),
      categoryService.getAll(),
    ]).then(([r, c]) => {
      if (r.data.data.length === 3) {
        setRules(r.data.data.map(d => ({
          allocation_type:    d.allocationType,
          percentage:         parseFloat(d.percentage),
          target_category_id: d.targetCategoryId || '',
        })))
      }
      setCategories(c.data.data)
    })
  }, [open])

  // Escape key
  useEffect(() => {
    function h(e) { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open])

  function handleOverlay(e) {
    if (e.target === overlayRef.current) onClose()
  }

  function updateRule(i, key, val) {
    const updated = [...rules]
    updated[i] = { ...updated[i], [key]: val }
    setRules(updated)
  }

  const total = rules.reduce((s, r) => s + (parseFloat(r.percentage) || 0), 0)
  const totalValid = Math.round(total) === 100

  async function handleSaveRules() {
    if (!totalValid) { setError('Total persentase harus 100%'); return }
    setSaving(true); setError(null)
    try {
      await allocationService.save(rules)
      setStep('salary')
    } catch (e) {
      setError(e.response?.data?.error || 'Gagal menyimpan aturan')
    }
    setSaving(false)
  }

  async function handlePreview() {
    if (!salary || parseFloat(salary) <= 0) { setError('Masukkan nominal gaji yang valid'); return }
    setSaving(true); setError(null)
    try {
      const r = await allocationService.preview(parseFloat(salary))
      setPreview(r.data.data.preview)
      setStep('preview')
    } catch (e) {
      setError(e.response?.data?.error || 'Gagal preview')
    }
    setSaving(false)
  }

  async function handleConfirm() {
    setSaving(true); setError(null)
    try {
      await allocationService.save(rules)
      const { transactionService } = await import('../services')
      await transactionService.bulkSalary({
        salary_amount: parseFloat(salary),
        transaction_date: new Date().toISOString().split('T')[0],
      })
      setStep('done')
    } catch (e) {
      setError(e.response?.data?.error || 'Gagal menyimpan')
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
          <div className="flex items-center gap-2">
            <Wallet size={18} className="text-teal-500" />
            <h2 className="font-bold text-sm tracking-wide">MODE GAJIAN</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex px-6 py-3 gap-2 border-b border-gray-100">
          {[
            { key: 'rules',   label: '1. Aturan'  },
            { key: 'salary',  label: '2. Gaji'    },
            { key: 'preview', label: '3. Preview' },
            { key: 'done',    label: '4. Selesai' },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center gap-1.5 flex-1">
              <div className={`h-1 flex-1 rounded-full transition-colors ${
                ['rules','salary','preview','done'].indexOf(step) >= ['rules','salary','preview','done'].indexOf(key)
                  ? 'bg-teal-500' : 'bg-gray-200'
              }`} />
            </div>
          ))}
        </div>

        <div className="px-6 py-5">

          {/* ── STEP 1: Aturan Alokasi ── */}
          {step === 'rules' && (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-gray-500">Atur persentase alokasi dari total gaji. Total harus = 100%.</p>

              {ALLOC_TYPES.map((type, i) => {
                const rule = rules.find(r => r.allocation_type === type.value) || {}
                const idx  = rules.findIndex(r => r.allocation_type === type.value)
                const cats = categories.filter(c => c.allocationType === type.value)

                return (
                  <div key={type.value} className="border border-gray-100 rounded-xl p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${type.color}`}>
                        {type.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number" min="1" max="99"
                          value={rule.percentage || ''}
                          onChange={e => updateRule(idx, 'percentage', parseFloat(e.target.value) || 0)}
                          className="w-16 text-center border border-gray-200 rounded-lg py-1.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                        <span className="text-sm text-gray-500 font-medium">%</span>
                      </div>
                    </div>
                    <select
                      value={rule.target_category_id || ''}
                      onChange={e => updateRule(idx, 'target_category_id', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-gray-600"
                    >
                      <option value="">Kategori default (opsional)</option>
                      {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                )
              })}

              {/* Total indicator */}
              <div className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold ${
                totalValid ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
              }`}>
                <span>Total alokasi</span>
                <span>{Math.round(total)}% {totalValid ? '✓' : `(kurang ${100 - Math.round(total)}%)`}</span>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button onClick={handleSaveRules} disabled={saving || !totalValid}
                className="w-full bg-teal-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-teal-600 transition-colors disabled:opacity-50"
              >
                {saving ? 'Menyimpan...' : 'Simpan & Lanjut →'}
              </button>
            </div>
          )}

          {/* ── STEP 2: Input Gaji ── */}
          {step === 'salary' && (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-gray-500">Masukkan nominal gaji yang diterima bulan ini.</p>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 tracking-wide">NOMINAL GAJI (RP)</label>
                <input
                  type="number" min="1" autoFocus
                  value={salary}
                  onChange={e => setSalary(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handlePreview()}
                  placeholder="5.000.000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-teal-400 text-center"
                />
              </div>

              {/* Preview estimasi */}
              {salary && parseFloat(salary) > 0 && (
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  {rules.map(r => {
                    const nominal = Math.floor(parseFloat(salary) * r.percentage / 100)
                    const type    = ALLOC_TYPES.find(t => t.value === r.allocation_type)
                    return (
                      <div key={r.allocation_type} className="flex justify-between text-sm">
                        <span className={`font-medium px-2 py-0.5 rounded-full text-xs border ${type?.color}`}>
                          {type?.label} ({r.percentage}%)
                        </span>
                        <span className="font-bold text-gray-700">{fmt(nominal)}</span>
                      </div>
                    )
                  })}
                </div>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex gap-3">
                <button onClick={() => setStep('rules')}
                  className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  ← Kembali
                </button>
                <button onClick={handlePreview} disabled={saving || !salary}
                  className="flex-1 bg-teal-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-teal-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Eye size={15} />
                  {saving ? 'Memuat...' : 'Preview Split'}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Preview ── */}
          {step === 'preview' && preview && (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-gray-500">Pastikan pembagian di bawah sudah sesuai sebelum dikonfirmasi.</p>

              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-2.5 flex justify-between text-xs font-bold text-gray-500 tracking-wider border-b border-gray-100">
                  <span>TIPE ALOKASI</span>
                  <span>NOMINAL</span>
                </div>
                {preview.map((p, i) => {
                  const type = ALLOC_TYPES.find(t => t.value === p.allocationType)
                  return (
                    <div key={i} className={`flex items-center justify-between px-4 py-3.5 ${i < preview.length - 1 ? 'border-b border-gray-50' : ''}`}>
                      <div className="flex items-center gap-2.5">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${type?.color}`}>
                          {type?.label}
                        </span>
                        <span className="text-xs text-gray-400">{p.percentage}%</span>
                      </div>
                      <span className="font-bold text-gray-800">{fmt(p.nominal)}</span>
                    </div>
                  )
                })}
                <div className="bg-teal-50 px-4 py-3 flex justify-between border-t border-teal-100">
                  <span className="text-sm font-bold text-teal-700">Total Gaji</span>
                  <span className="text-sm font-bold text-teal-700">{fmt(parseFloat(salary))}</span>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex gap-3">
                <button onClick={() => setStep('salary')}
                  className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  ← Kembali
                </button>
                <button onClick={handleConfirm} disabled={saving}
                  className="flex-1 bg-teal-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-teal-600 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Menyimpan...' : 'Konfirmasi ✓'}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 4: Done ── */}
          {step === 'done' && (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
                <span className="text-3xl">🎉</span>
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-800 mb-1">Gajian berhasil!</h3>
                <p className="text-sm text-gray-500">
                  {fmt(parseFloat(salary))} sudah dibagi dan dicatat otomatis ke transaksi.
                </p>
              </div>
              <button onClick={onClose}
                className="w-full bg-teal-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-teal-600 transition-colors mt-2"
              >
                Selesai
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}