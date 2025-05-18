import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom';

const GalleryGrid = () => {

    const GridSection = useRef(null)
    const gridGalleryEnd = useRef(null)

    const { scrollYProgress: gridSectionYprogress } = useScroll({
        target: GridSection,
        offset: ['start end', 'end start'],
    });

    const { scrollYProgress: gridEndYprogress } = useScroll({
        target: gridGalleryEnd,
        offset: ['start end', 'end start'],
    });

    useEffect(() => {
    }, [])

    const startingWidth = window.innerWidth / 2

    const roundness = useTransform(gridSectionYprogress, [0, 0.2], [startingWidth, 0]);
    const exitRoundness = useTransform(gridEndYprogress, [0, 1], [0, startingWidth]);

    

    const carImages = [
        "https://images.unsplash.com/photo-1501829385782-9841539fa6bf?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1681252551872-4e3ab96c89f4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1603132567741-b30e1a9d37b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1704560970274-db801c539779?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1710384897899-02c7b08bc54e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1682059040305-cb13aab11018?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1604755556528-1b9f175bb7d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1651275445921-19126b1033a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ2fHx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1471479917193-f00955256257?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1710384890711-61a0616619a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];



    return (
        <div ref={GridSection}
            className='bg-[linear-gradient(#fff_50%,#111823_50%)]'
        >

            <motion.section className='py-28 grid gap-10 overflow-hidden'
                style={{
                    borderTopLeftRadius: roundness,
                    borderTopRightRadius: roundness,
                    borderBottomLeftRadius: exitRoundness,
                    borderBottomRightRadius: exitRoundness,
                }}
                viewport={{ once: true, root: GridSection }}
                initial={{
                    background: '#fff',
                    color: '#000',
                }}
                whileInView={{
                    background: '#000',
                    color: '#fff',
                }}
                transition={{
                    duration: 1,
                    ease: 'anticipate'
                }}
            >
                <Link to={"/gallery"} className='overflow-hidden flex justify-between text-[42px] w-full border-b-[1px] border-b-slate-600'>
                    <motion.h1
                        viewport={{ once: true, root }}
                        initial={{
                            translateY: '100%'
                        }}
                        whileInView={{
                            translateY: '0'
                        }}
                        transition={{
                            delay: 1,
                            duration: 1,
                            ease: 'anticipate'
                        }}
                    >Our Gallery</motion.h1>
                    <motion.p
                        viewport={{ once: true, root }}
                        initial={{
                            translateX: '-100%',
                            opacity: 0
                        }}
                        whileInView={{
                            translateX: '0',
                            opacity: 1
                        }}
                        transition={{
                            delay: 1,
                            duration: 1,
                            ease: 'anticipate'
                        }}
                     >&rarr;</motion.p>
                </Link>
                    

                <div className='columns-[300px] overflow-hidden'>
                    {
                        carImages.map((e, i) => {
                            return (
                                <motion.div key={i}
                                    className='overflow-hidden pointer-events-none select-none mb-5 rounded-3xl'
                                    viewport={{ once: true, root: GridSection }}
                                    initial={{
                                        translateY: 100,
                                        // opacity: 0,
                                    }}
                                    whileInView={{
                                        translateY: 0,
                                        // opacity: 1,
                                    }}
                                    transition={{
                                        duration: 1,
                                        ease: 'anticipate'
                                    }}
                                >
                                    <img loading='lazy' src={e} className='object-cover rounded-3xl w-full'
                                    />
                                </motion.div>
                            )
                        })
                    }
                </div>

                <div ref={gridGalleryEnd}></div>    

            </motion.section>

        </div>
    )
}

export default GalleryGrid