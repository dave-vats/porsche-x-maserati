import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import models from '../../models';
import maseratiArray from '../../maseratiModels';
import { ArrowLeft } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import menuLinks from '../../menuOptions';

const Header = () => {
  const [toggle, setToggle] = useState(false)
  const [porscheModels, setPorscheModels] = useState(false)
  const [maseratiModels, setMaseratiModels] = useState(false)
  const [isSelected, setIsSelected] = useState(null);


  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  // console.log(porscheModels);
  useEffect(() => {
  }, []) // Closing bracket for the first useEffect

  useEffect(() => {

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      // console.log(`Screen width: ${screenWidth}px`);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [screenWidth]);

  return (
    <>
      <header className='fixed inset-0 w-full z-[9999] h-16 bg-[rgba(0,0,0,.3)] backdrop-blur-lg flex items-center justify-between'>
        <Link to='/'>
          <img className='invert w-40 _400:w-full' src="./assets/images/logos/header-logo.png" alt="Logo" />
        </Link>
        <div onClick={() => { setToggle(!toggle), !toggle ? null : (setPorscheModels(false), setMaseratiModels(false)) }} className={`relative cursor-pointer transition-all duration-300 ease-[cubic-bezier(.44,-0.07,0,.75)] group overflow-hidden ${toggle ? 'rotate-90 w-7 h-9' : 'rotate-0 h-5 w-9'}`} id="menu-btn">
          <span className={`before:absolute before:size-full before:top-0 before:left-[120%] before:bg-slate-300 absolute inset-1/2 -translate-x-1/2 h-0.5 w-full bg-white transition-all group-hover:-translate-x-[120%] group-hover:left-0 duration-100 ease-[cubic-bezier(.44,-0.07,0,.75)] ${toggle ? '-transition-y-1/2 hover:text-white group-hover:translate-x-0 rotate-45 before:hidden' : '-translate-y-2.5'}`} id='menu-top'></span>
          <span className={`before:absolute before:size-full before:top-0 before:left-[120%] before:bg-slate-300 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-0.5 w-full bg-white transition-all group-hover:-translate-x-[120%] group-hover:left-0 duration-300 ease-[cubic-bezier(.44,-0.07,0,.75)] ${toggle ? 'hidden' : 'block'}`} id='menu-middle'></span>
          <span className={`before:absolute before:size-full before:top-0 before:left-[120%] before:bg-slate-300 absolute inset-1/2 -translate-x-1/2 h-0.5 w-full bg-white transition-all group-hover:-translate-x-[120%] group-hover:left-0 duration-500 ease-[cubic-bezier(.44,-0.07,0,.75)] ${toggle ? '-transition-y-1/2 hover:text-white group-hover:translate-x-0 -rotate-45 before:hidden' : 'translate-y-2'}`} id='menu-bottom'></span>
        </div>

        <menu className={`absolute top-full w-full _451:w-3/4 md:w-2/5 h-[calc(100dvh_-_64px)] transition-all duration-500 ease-[.23,-1.14,.22,1.03] right-0 bg-[rgba(0,0,0,.3)] z-[99999] ${toggle ? 'translate-x-0 rounded-0' : 'rounded-[60%_0_0_60%] translate-x-full'}`}
        >
          <nav className={`size-full capitalize flex justify-center items-center text-white flex-col transition-all duration-1000 ease-in text-center ${screenWidth < 582 && screenWidth > 451 ? porscheModels || maseratiModels ? "text-end pe-5" : "text-center pe-0" : ''}`}>
            {
              menuLinks.map((e, i) => {
                return i < 2 ? (<motion.p style={{
                  color: porscheModels && i === 0 ? '#fecaca' : maseratiModels && i === 1 ? '#fecaca' : ''
                }}
                  onClick={i === 0 ? () => (setPorscheModels(!porscheModels), porscheModels ? null : setMaseratiModels(false), setIsSelected(i)) : i === 1 ? () => (setMaseratiModels(!maseratiModels), maseratiModels ? null : setPorscheModels(false), setIsSelected(i)) : null} className='transition-all duration-300 hover:text-slate-400 ease-in py-3 w-full cursor-pointer' key={i}>{e}</motion.p>) : (<Link className='transition-all duration-300 hover:text-slate-400 ease-in py-3 w-full' key={i} to={`/${e.split(' ').pop()}`}>{e}</Link>)
              })
            }
          </nav>
        </menu>
        <div className={`absolute top-full w-full _451:w-3/4 md:w-2/5 h-[calc(100dvh_-_64px)] transition-all duration-500 ease-[.23,-1.14,.22,1.03] right-0 z-[999] blur-md pointer-events-none bg-[rgba(0,0,0,.4)] overflow-hidden ${toggle ? 'translate-x-0 rounded-0' : 'rounded-[60%_0_0_60%] translate-x-full'}`}></div>


        <div className={`models-menu absolute top-full w-full _451:w-[270px] md:w-[380px] h-[calc(100dvh_-_64px)] transition-all duration-1000 ease-[.23,-1.14,.22,1.03] left-0 bg-[rgba(0,0,0,.8)] z-[99999] px-5 py-8 grid gap-8 scroll-bar ${porscheModels ? 'translate-x-0 overflow-y-scroll rounded-0 active' : '-translate-x-full rounded-[0_60%_60%_0]'}`}>
          <ArrowLeft onClick={() => setPorscheModels(!porscheModels)} className={`_451:hidden cursor-pointer block text-white transition-all duration-[1.7s] ease-in-out ${porscheModels ? 'rotate-0' : 'rotate-180'}`} size={32} />
          {
            models.map((e, i) => {
              return (
                <Link to={'/model'} state={e.name} key={i} className={`sticky top-0 model-card cursor-pointer w-full bg-[rgba(255,255,255,.3)] backdrop-blur-md rounded-2xl`}>
                  <div className="model-image w-full h-44 md:h-48 grid place-items-center" title={e.name}>
                    <img loading='lazy' src={e.image} alt={e.name} />
                  </div>
                  <h3 className='text-white absolute inset-2'>{e.name}</h3>
                </Link>
              )
            })
          }
        </div>

        <div className={`models-menu absolute top-full w-full _451:w-[270px] md:w-[380px] h-[calc(100dvh_-_64px)] transition-all duration-1000 ease-[.23,-1.14,.22,1.03] left-0 bg-[rgba(0,0,0,.4)] before:absolute before:inset-0 before:size-full before:bg-[rgba(0,0,0,.6)] z-[99999] px-5 py-8 grid gap-8 scroll-bar ${maseratiModels ? 'translate-x-0 overflow-y-scroll rounded-0 active' : '-translate-x-full rounded-[0_60%_60%_0]'}`}>
          <ArrowLeft onClick={() => setMaseratiModels(!maseratiModels)} className={`_451:hidden cursor-pointer block text-white transition-all duration-[1.7s] ease-in-out ${maseratiModels ? 'rotate-0' : 'rotate-180'}`} size={32} />
          {
            maseratiArray.map((e, i) => {
              return (
                <Link to={'/model'} state={e.name} key={i} >
                  <div className={`sticky top-0 model-card cursor-pointer w-full bg-[rgba(255,255,255,.3)] backdrop-blur-md rounded-2xl`}>
                    <div className="model-image w-full h-44 before:content-[Loading...] before:absolute inset-1/2 md:h-48 grid place-items-center" title={e.name}>
                      <video>
                        <source src={e.image} type='video/webm' />
                      </video>
                    </div>
                    <h3 className='text-white absolute inset-2 '>{e.name}</h3>
                  </div>
                </Link>
              )
            })
          }
        </div>

      </header >
    </>
  )
}

export default Header
