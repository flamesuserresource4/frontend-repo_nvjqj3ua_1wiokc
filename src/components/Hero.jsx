import React from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 pointer-events-none" />

      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex items-center">
        <div className="text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight"
          >
            Coinflow
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-4 text-lg sm:text-xl text-white/85 max-w-2xl"
          >
            Smart budgeting and expense tracking with a futuristic vibe. Visualize, plan, and reach your financial goals.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-8 flex gap-4"
          >
            <a href="#dashboard" className="px-5 py-3 rounded-lg bg-white text-black font-semibold shadow-lg hover:shadow-xl transition">
              Open Dashboard
            </a>
            <a href="#goals" className="px-5 py-3 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition">
              Set a Goal
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
