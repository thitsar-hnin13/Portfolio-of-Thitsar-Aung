import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react'

const IntroAnimation = ({ onFinished }) => {

  const greetings = useMemo(() => ["Welcome", "Bienvenue", "Willkommen", "Bienvenido", "Benvenuto", "欢迎", "ようこそ", "환영합니다", "пожаловать", "स्वागत है"],
    []);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const id = setInterval(() => {
        setIndex((i) => i + 1);
      }, 300);
      return () => clearInterval(id);
    } else {
      const timeoutId = setTimeout(() => {
        setVisible(false);  
      }, 80);
      return () => clearTimeout(timeoutId); 
    }
  }, [index, greetings.length]);

  return (
    <AnimatePresence onExitComplete={onFinished}>
      {visible && ( 
        <motion.div
          className='fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white overflow-hidden'
          initial={{ y: 0 }}
          exit={{ y: '-100%' ,
            transition:{
            duration: 1.05,
            ease: [0.22 ,1 ,0.36 ,1 ],
          } ,}}
          
        >
          <motion.h1
            key={index}
            className='text-5xl md:text-7xl lg:text-8xl font-bold'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.12 }}
          > 
             {greetings[index]}
          </motion.h1>
        </motion.div>
      )}


    </AnimatePresence>
  )
}

export default IntroAnimation