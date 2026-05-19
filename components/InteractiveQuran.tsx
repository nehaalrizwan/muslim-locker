'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const QURAN_DATA = [
  { surah: 'Al-Fatiha', pages: ['Page 1: The Opening', 'Page 2: Continuation'] },
  { surah: 'Al-Baqarah', pages: ['Page 1: The Cow', 'Page 2: Continuation'] },
  { surah: 'Ali Imran', pages: ['Page 1: The Family of Imran', 'Page 2: Continuation'] },
];

export default function InteractiveQuran() {
  const [currentSurah, setCurrentSurah] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) nextPage();
    else prevPage();
  };

  const nextPage = () => {
    if (currentPage < QURAN_DATA[currentSurah].pages.length - 1) {
      setCurrentPage((p) => p + 1);
      setRotation((r) => r + 15);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1);
      setRotation((r) => r - 15);
    }
  };

  return (
    <section className="fixed bottom-8 right-8 z-40 hidden lg:block">
      <motion.div
        ref={containerRef}
        onWheel={handleWheel}
        className="w-72 h-96 bg-amber-100 rounded-lg shadow-2xl p-6 cursor-grab active:cursor-grabbing overflow-hidden border-4 border-amber-900"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          animate={{ rotateY: rotation }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="h-full flex flex-col justify-center items-center"
        >
          <h3 className="text-2xl font-bold text-emerald-900 mb-4">
            {QURAN_DATA[currentSurah].surah}
          </h3>
          <p className="text-center text-gray-700 mb-8">
            {QURAN_DATA[currentSurah].pages[currentPage]}
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Page {currentPage + 1} of {QURAN_DATA[currentSurah].pages.length}
          </p>

          <div className="flex gap-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-emerald-600 text-white rounded disabled:opacity-50"
            >
              ← Back
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === QURAN_DATA[currentSurah].pages.length - 1}
              className="px-4 py-2 bg-emerald-600 text-white rounded disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </motion.div>
      </motion.div>

      <p className="text-xs text-gray-600 mt-2 text-center">Scroll or click</p>
    </section>
  );
}
