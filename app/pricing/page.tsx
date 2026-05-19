'use client';
import { motion } from 'framer-motion';

export default function Pricing() {
  return (
    <div className="min-h-screen pt-32 pb-16 px-4 bg-white">
      <motion.div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-emerald-900 mb-6">Lifetime Access</h1>
        <p className="text-xl text-gray-600 mb-16">Free beta. Then $39.99/year or $4.99/month.</p>

        <motion.div className="bg-gradient-to-br from-emerald-900 to-emerald-700 text-white rounded-3xl p-12">
          <div className="text-6xl font-bold mb-4">$39.99</div>
          <p className="text-xl mb-8">per year (50% off first year)</p>

          <ul className="space-y-4 mb-12 text-left">
            <li className="flex items-center gap-3"><span className="text-amber-400">✓</span> App locking for all 5 daily prayers</li>
            <li className="flex items-center gap-3"><span className="text-amber-400">✓</span> Streak tracking & analytics</li>
            <li className="flex items-center gap-3"><span className="text-amber-400">✓</span> Daily Quranic reminders</li>
            <li className="flex items-center gap-3"><span className="text-amber-400">✓</span> Family accountability mode</li>
            <li className="flex items-center gap-3"><span className="text-amber-400">✓</span> Lifetime updates</li>
          </ul>

          <button className="w-full bg-amber-500 text-black py-4 rounded-xl font-bold text-lg hover:bg-amber-400 transition">
            Get Lifetime Access
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
