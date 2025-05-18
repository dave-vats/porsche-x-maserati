import React from 'react';
import { motion } from 'framer-motion';

const RevealText = ({ text, addClasses }) => {
  // Ensure hooks are called unconditionally
  const textArray = Array.isArray(text) ? text : []; // Ensure text is an array

  return (
    <section className={`reveal-text font-semibold text-slate-500 text-[clamp(1.5rem,1.0625rem_+_2.5vw,3.25rem)] ${addClasses}`}>
      <p className='text-center gap-x-10 flex-wrap flex'>
        {textArray.map((word, index) => (
          <motion.span
            key={index} // Ensure a stable key
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }} // Example transition
          >
            {word}
          </motion.span>
        ))}
      </p>
    </section>
  );
};

export default RevealText;
