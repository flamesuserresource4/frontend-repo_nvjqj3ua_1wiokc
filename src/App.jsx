import React, { useCallback } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import { AddExpenseForm, AddBudgetForm, AddGoalForm } from './components/Forms'

function App() {
  const refresh = useCallback(() => {
    // trigger a soft reload by updating a key on Dashboard via window event
    window.dispatchEvent(new Event('data-updated'))
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <Hero />

      <Dashboard />

      <section className="relative py-16 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-white text-3xl font-bold">
            Quick Add
          </motion.h2>
          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            <AddExpenseForm onAdded={refresh} />
            <AddBudgetForm onAdded={refresh} />
            <AddGoalForm onAdded={refresh} />
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-white/60 bg-black">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>© {new Date().getFullYear()} Coinflow — Smart budgeting with style</motion.p>
      </footer>
    </div>
  )
}

export default App
