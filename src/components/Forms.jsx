import React, { useState } from 'react'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export function AddExpenseForm({ onAdded }) {
  const [form, setForm] = useState({ amount: '', category: '', merchant: '', note: '' })
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/expenses`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, amount: parseFloat(form.amount || 0) }) })
      await res.json()
      setForm({ amount: '', category: '', merchant: '', note: '' })
      onAdded?.()
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }

  return (
    <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="bg-white/5 border border-white/10 rounded-xl p-5 text-white">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Amount" type="number" value={form.amount} onChange={v => setForm({ ...form, amount: v })} required />
        <Field label="Category" value={form.category} onChange={v => setForm({ ...form, category: v })} placeholder="Groceries, Rent" />
        <Field label="Merchant" value={form.merchant} onChange={v => setForm({ ...form, merchant: v })} />
        <Field label="Note" value={form.note} onChange={v => setForm({ ...form, note: v })} />
      </div>
      <div className="mt-4">
        <button disabled={loading} className="px-4 py-2 rounded-lg bg-emerald-400 text-black font-semibold hover:bg-emerald-300 transition">{loading ? 'Adding...' : 'Add Expense'}</button>
      </div>
    </motion.form>
  )
}

export function AddBudgetForm({ onAdded }) {
  const [form, setForm] = useState({ category: '', amount: '', month: '' })
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/budgets`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, amount: parseFloat(form.amount || 0) }) })
      await res.json()
      setForm({ category: '', amount: '', month: '' })
      onAdded?.()
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }

  return (
    <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="bg-white/5 border border-white/10 rounded-xl p-5 text-white">
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Category" value={form.category} onChange={v => setForm({ ...form, category: v })} />
        <Field label="Amount" type="number" value={form.amount} onChange={v => setForm({ ...form, amount: v })} />
        <Field label="Month" value={form.month} onChange={v => setForm({ ...form, month: v })} placeholder="YYYY-MM" />
      </div>
      <div className="mt-4">
        <button disabled={loading} className="px-4 py-2 rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition">{loading ? 'Saving...' : 'Save Budget'}</button>
      </div>
    </motion.form>
  )
}

export function AddGoalForm({ onAdded }) {
  const [form, setForm] = useState({ name: '', target_amount: '', current_amount: '', deadline: '' })
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { ...form, target_amount: parseFloat(form.target_amount || 0), current_amount: parseFloat(form.current_amount || 0) }
      const res = await fetch(`${API}/api/goals`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      await res.json()
      setForm({ name: '', target_amount: '', current_amount: '', deadline: '' })
      onAdded?.()
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }

  return (
    <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="bg-white/5 border border-white/10 rounded-xl p-5 text-white">
      <div className="grid sm:grid-cols-4 gap-4">
        <Field label="Name" value={form.name} onChange={v => setForm({ ...form, name: v })} />
        <Field label="Target" type="number" value={form.target_amount} onChange={v => setForm({ ...form, target_amount: v })} />
        <Field label="Current" type="number" value={form.current_amount} onChange={v => setForm({ ...form, current_amount: v })} />
        <Field label="Deadline" type="date" value={form.deadline} onChange={v => setForm({ ...form, deadline: v })} />
      </div>
      <div className="mt-4">
        <button disabled={loading} className="px-4 py-2 rounded-lg bg-fuchsia-400 text-black font-semibold hover:bg-fuchsia-300 transition">{loading ? 'Creating...' : 'Create Goal'}</button>
      </div>
    </motion.form>
  )
}

function Field({ label, value, onChange, type = 'text', required = false, placeholder }) {
  return (
    <label className="block">
      <div className="text-sm text-white/70 mb-1">{label}</div>
      <input required={required} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30" />
    </label>
  )
}
