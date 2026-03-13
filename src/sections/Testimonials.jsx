import React from 'react'
import m1 from '../assets/l3.jpg'
import m2 from '../assets/l2.jpg'
import m3 from '../assets/l.jpg'
import m4 from '../assets/l1.jpg'
import {motion} from 'framer-motion'

const testimonials = [
  {
    name: "Moe Kaung",
    role: "Full Stack Developer at Unique Solution",
    review: "Working with this team was a fantastic experience. The project management and technical guidance helped me grow professionally.",
    image: m1,
  },
  {
    name: "Min Wai Tun",
    role: "Frontend Developer at Unique Solution",
    review: "I truly appreciate the supportive work environment. Collaboration here leads to innovative solutions every day.",
    image: m2,
  },
  {
    name: "Nay Lin Soe",
    role: "Backend Developer at Unique Solution",
    review: "The mentorship and learning opportunities were amazing. I could tackle complex projects confidently.",
    image: m3,
  },
  {
    name: "Naing Ye Thway",
    role: "Backend Developer at Unique Solution",
    review: "Every day brought new challenges and learning moments. The culture encourages growth and creativity.",
    image: m4,
  },
]



const Testimonials = () => {
  return (
    <div id='testimonials' className="relative min-h-screen bg-black text-red-500 flex flex-col items-center justify-between px-6 py-20 lg:px-30cd">
     <motion.h2 className='text-4xl font-bold mb-16'
     initial={{opacity:0,y: -50}}
     animate={{opacity:1,y:0}}
     transition={{duration:0.6}}
     >
    What People Say 

     </motion.h2>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6wl w-full">
      {testimonials.map((t,i) => (
        <motion.div 
        key={t.name +1}
        initial={{opacity:0,y:50}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:0.5,delay:i*0.2}}
        viewport={{once:true}}
        className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:-rotate-1 '
        >
          <img src={t.image} alt={t.name} className='w-20 h-20 rounded-full border-2 border-white/40 mb-4 object-cover' loading='lazy'/>
          <p className="text-blue-200 italic mb-4">
            {t.review}
          </p>
          <h3 className='text-lg font-semibold'>
            {t.name}
          </h3>
          <p className="text-sm text-blue-400">
            {t.role}
          </p>

        </motion.div>
      ))}

     </div>
      
    </div>
  )
}

export default Testimonials