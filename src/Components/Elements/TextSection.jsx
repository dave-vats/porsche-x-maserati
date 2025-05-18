import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import porscheImages from '../../porscheImages';
import { Link } from 'react-router-dom';

const TextSection = () => {
    const imageOne = porscheImages[0];
    const imageTwo = porscheImages[4];
    const paragraphText = "Introducing Porsche x Maserati: a perfect blend of Porsche's engineering and Maserati's style. Experience unmatched power and elegance in every drive.";
    const words = paragraphText.split(" ");
    const element = useRef(null);
    const photosContainer = useRef(null);

    const { scrollYProgress: textYProgress } = useScroll({
        target: element,
        offset: ['start 0.9', 'end 0.2']
    });

    const { scrollYProgress: parallaxYProgress } = useScroll({
        target: photosContainer,
        offset: ['end start', 'start end']
    });
    const [isHovered, setIsHovered] = useState(false); // State to track hover



    // const parallaxDistance = ; // Adjust parallax distance on scroll
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <section className='lg:py-16 md:py-12 _400:py-8 py-7'>
            <span ref={element} className='font-[550] text-[clamp(1.25rem,.5625rem_+_3.9286vw,4rem)]'>
                <p className='text-slate-500 leading-[1.2] md:leading-[1.1] relative flex gap-x-6 flex-wrap max-w-screen-lg w-full mx-auto'>
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = (i + 1) / words.length;
                        const opacity = useTransform(textYProgress, [start, end], [0, 1]);
                        return (
                            <span key={i} className='relative'>
                                <span className='opacity-30'>{word}</span>
                                <motion.span className='absolute inset-0 opacity-0' style={{ opacity }}>
                                    {word}
                                </motion.span>
                            </span>
                        );
                    })}
                </p>
            </span>
            <div ref={photosContainer} className={`md:mt-[12%] mt-[14%] ${windowHeight < 1000 ? 'lg:h-dvh' : 'lg:h-[85dvh]'} grid lg:grid-cols-3 md:grid-cols-2 w-full md:gap-10 gap-8 relative`}>
                <motion.div className='h-fit overflow-hidden'
                    style={{ translateY: window.innerWidth > 766 ? useTransform(parallaxYProgress, [0, 1], [150, 0]) : 0 }}
                >
                    <motion.img
                        style={{
                            scale: useTransform(parallaxYProgress, [0, 1], [1, 1.2]),
                            // translateY: useTransform(parallaxYProgress, [0, 1], [0, -50])
                        }}
                        className='w-full object-cover object-right-bottom h-full max-h-[300px] _400:max-h-[350px] _451:max-h-[450px]'
                        src={imageOne}
                        alt="Porsche"
                    />
                </motion.div>
                <div className='relative md:block hidden'
                >
                    <motion.div className='lg:w-3/4 w-full lg:max-w-[auto] max-w-[400px] absolute right-5 lg:bottom-0  overflow-hidden'
                        style={{ translateY: useTransform(parallaxYProgress, [0, 1], [-200, 50]), }}
                    >
                        <motion.img
                            className='object-cover'
                            src={imageTwo}
                            alt="Maserati"
                            style={{
                                scale: useTransform(parallaxYProgress, [0, 1], [1, 1.3])
                            }}
                        />
                    </motion.div>
                </div>
                <div className='lg:col-span-1 md:col-span-2 lg:pt-[20%] md:pt-[12%]'>
                    <motion.span className='flex flex-col gap-10'
                        style={{ 
                            opacity: useTransform(parallaxYProgress, [.6, 1], [1, 0])
                        }}
                    >
                        <p className='_400:text-[20px]'>
                            Experience the ultimate fusion of performance and luxury with Porsche x Maserati. This collaboration combines engineering excellence with timeless design, delivering an unparalleled driving experience that sets a new standard for automotive enthusiasts.
                        </p>
                        <Link to="/gallery" className='md:w-fit'>
                            <div className='btn w-full'
                                onMouseEnter={() => setIsHovered(true)}  // Set hover state on mouse enter
                                onMouseLeave={() => setIsHovered(false)} // Reset hover state on mouse leave
                            >
                                <span>
                                    Explore Endless Visuals
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
                    </motion.span>
                </div>
            </div>
        </section>
    );
};

export default TextSection;