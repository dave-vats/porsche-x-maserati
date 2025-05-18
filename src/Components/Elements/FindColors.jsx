import React, { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import storyimages from '../../storyImages';
import { Link } from 'react-router-dom';

const FindColors = () => {  
    const [isHovered, setIsHovered] = useState(false)
    const colorSection = useRef(null)

    const { scrollYProgress: colorSecYprogress } = useScroll({
        target: colorSection,
        offset: ['start end', 'end start'],
    });

    const speed = 2 * 5 
    const offsetX = window.innerWidth / speed;
    // console.log(rm);
    

    const xValue = useTransform(colorSecYprogress, [0, 1], [offsetX, 0])

    const Imageurl = storyimages[2];

    return (
        <>
            <section ref={colorSection} className="lg:h-dvh pt-10 _510:pt-[15%] lg:pt-0 px-0 grid lg:grid-cols-2 relative w-full">

                <motion.div className='lg:pt-28 lg:px-16 md:px-10 px-4 flex flex-col gap-6'
                    initial={{
                        translateY: '50px',
                        opacity: 0,
                    }}
                    whileInView={{
                        translateY: '0',
                        opacity: 1
                    }}
                    viewport={{ once: true, root: colorSection}}
                    transition={{
                        duration: 2,
                        ease: 'anticipate'
                    }}
                >
                    <h1 className='text-[clamp(1.75rem,1.6875rem_+_0.3571vw,2rem)] font-semibold text-slate-700  lg:max-w-xl'>
                        Explore a futuristic car, 'Aeryth', and experience the future of automotive design.
                    </h1>

                    <Link to="/aeryth" className='md:w-fit'>
                        <div className='btn'
                            onMouseEnter={() => setIsHovered(true)}  // Set hover state on mouse enter
                            onMouseLeave={() => setIsHovered(false)} // Reset hover state on mouse leave
                        >
                            <span>
                                Experience Future in 3D
                            </span>

                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div className='pseudoElement'
                                        initial={{ translateY: '100%' }}  // Start from 100% below
                                        animate={{ translateY: '0%' }}  // Move to the visible state
                                        exit={{ translateY: '-100%' }}  // Animate out to -100%
                                        transition={{
                                            duration: .5,  // Set a duration for smooth animation
                                            ease: "anticipate"
                                        }}
                                    ></motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Link>

                </motion.div>
                <motion.img style={{ translateX: xValue }} className='lg:absolute -z-[1] right-0 bottom-0' src={Imageurl} alt="" />

            </section>
        </>
    )
}

export default FindColors;