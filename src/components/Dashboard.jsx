import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, PieChart, Wallet, Bell } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Dashboard() {
  const [summary, setSummary] = useState({ total: 0, byCategory: {}, budgets: [], goals: [] })

  useEffect(() => {
    async function load() {
      try {
        const [expensesRes, budgetsRes, goalsRes] = await Promise.all([
          fetch(`${API}/api/expenses`).then(r => r.json()),
          fetch(`${API}/api/budgets`).then(r => r.json()),
          fetch(`${API}/api/goals`).then(r => r.json())
        ])
        const expenses = (expensesRes.items || [])
        const budgets = (budgetsRes.items || [])
        const goals = (goalsRes.items || [])
        const total = expenses.reduce((s, e) => s + (e.amount || 0), 0)
        const byCategory = expenses.reduce((acc, e) => {
          const k = e.category || 'Uncategorized'
          acc[k] = (acc[k] || 0) + (e.amount || 0)
          return acc
        }, {})
        setSummary({ total, byCategory, budgets, goals })
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  const categories = Object.entries(summary.byCategory)

  return (
    <section id="dashboard" className="relative py-16 bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold">
          Overview
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <StatCard icon={<Wallet className="w-5 h-5" />} title="Total Spent" value={`$${summary.total.toFixed(2)}`} />
          <StatCard icon={<TrendingUp className="w-5 h-5" />} title="Categories" value={categories.length} />
          <StatCard icon={<PieChart className="w-5 h-5" />} title="Budgets" value={summary.budgets.length} />
          <StatCard icon={<Bell className="w-5 h-5" />} title="Goals" value={summary.goals.length} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 grid lg:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="font-semibold text-white/90">Spending by Category</h3>
            <div className="mt-6 space-y-4">
              {categories.map(([name, amount]) => (
                <div key={name} className="flex items-center gap-4">
                  <div className="w-28 text-white/80">{name}</div>
                  <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (amount / (summary.total || 1)) * 100)}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                    />
                  </div>
                  <div className="w-24 text-right">${amount.toFixed(2)}</div>
                </div>
              ))}
              {categories.length === 0 && (
                <p className="text-white/60">No expenses yet. Add one below.</p>
              )}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="font-semibold text-white/90">Goals Progress</h3>
            <div className="mt-6 space-y-4">
              {summary.goals.map((g) => (
                <div key={g._id} className="space-y-2">
                  <div className="flex justify-between text-white/80"><span>{g.name}</span><span>${g.current_amount || 0} / ${g.target_amount}</span></div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, ((g.current_amount || 0) / (g.target_amount || 1)) * 100)}%` }} className="h-full bg-gradient-to-r from-fuchsia-400 to-rose-400" />
                  </div>
                </div>
              ))}
              {summary.goals.length === 0 && (
                <p className="text-white/60">No goals yet. Create one below.</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function StatCard({ icon, title, value }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-xl p-5">
      <div className="flex items-center gap-3 text-white/80">{icon}<span className="font-medium">{title}</span></div>
      <div className="mt-3 text-2xl font-bold">{value}</div>
    </motion.div>
  )
}
