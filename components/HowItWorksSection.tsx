'use client';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    { num: '01', title: 'Set Prayer Times', desc: 'Sync with your location' },
    { num: '02', title: 'Phone Locks', desc: 'At prayer time automatically' },
    { num: '03', title: 'Pray & Unlock', desc: 'Confirm when done' }
  ];

  return (
    <section className="py-24 px-4 bg-white" id="how">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-emerald-900 text-center mb-16">Three Steps</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="text-center"
            >
              <div className="text-6xl font-bold text-amber-600 mb-4">{step.num}</div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
