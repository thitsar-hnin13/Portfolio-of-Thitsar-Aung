import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './sections/Home'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import CustomCursor from './components/CustomCursor'
import IntroAnimation from './components/IntroAnimation'
import ThitsarAungBot from './sections/ThitsarAungBot'

const App = () => {

  const [introDone, setIntroDone] = useState(false);
  return (

    <>
      {!introDone && <IntroAnimation onFinished={() => setIntroDone(true)} />}


      {introDone && (

        <div className='relative gradient text-blue-400 '>
          <CustomCursor />
          <Navbar />
          <Home />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Testimonials />
          <Contact />
          <Footer />
          <ThitsarAungBot />
        </div>
      )}
    </>
  )
}

export default App