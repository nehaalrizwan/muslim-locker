'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function DailyAyah() {
  const [ayah, setAyah] = useState({ text: '', surah: '', verse: '' });

  useEffect(() => {
    const ayahs = [
      { text: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', surah: 'Al-Inshirah', verse: '94:5' },
      { text: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ', surah: 'Al-Baqarah', verse: '2:45' },
      { text: 'قُمِ اللَّيْلَ إِلَّا قَلِيلًا', surah: 'Al-Muzzammil', verse: '73:2' },
    ];
    setAyah(ayahs[Math.floor(Math.random() * ayahs.length)]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-emerald-50 to-amber-50 border border-amber-200 rounded-2xl p-8 text-center max-w-2xl mx-auto"
    >
      <p className="text-3xl font-serif text-emerald-900 mb-4">{ayah.text}</p>
      <p className="text-amber-700 font-semibold">{ayah.surah} ({ayah.verse})</p>
    </motion.div>
  );
}