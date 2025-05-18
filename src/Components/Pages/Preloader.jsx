import React from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
    return (
        <div className='w-full h-dvh grid place-items-center bg-black px-4 relative overflow-hidden'>

            <p
                className="text-[clamp(2.5rem,2.0938rem_+_2.3214vw,4.125rem)] w-full text-center capitalize font-bold absolute top-1/2 left-0 -translate-y-1/2 bg-no-repeat text-transparent bg-clip-text font-['Skilled_Hands'] tracking-widest select-none transition-all duration-300 px-4"
            >
                <motion.span className="inline bg-gradient-to-r from-white to-white bg-no-repeat text-transparent bg-clip-text font-dancingScript tracking-widest select-none"
                    initial={{ backgroundSize: "0% 100%", WebkitTextStroke: "1px #999", opacity: 1 }}
                    animate={{ backgroundSize: ["0% 100%", "50% 100%", "50% 100%", "100% 100%"], opacity: 0 }}
                    transition={{
                        backgroundSize: {
                            delay: 0.2,
                            duration: 4,
                            ease: [0.645, 0.045, 0.355, 1]
                        }
                        ,
                        opacity: {
                            delay: 4,
                            duration: 1,
                            ease: "easeOut",
                        }
                    }}
                >We Don't Just Make Cars. We Invent Them.</motion.span>
            </p>

            <div className='grid place-items-center _510:gap-2 gap-10 _510:grid-cols-3'>
                <motion.img
                    initial={{ opacity: 0, translateX: -50 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{
                        delay: 8,
                        duration: 1.5,
                        ease: [.89, -0.01, .39, .94],
                    }}
                    exit={{opacity: 0}}
                    className='invert w-full max-w-64'
                    src="./assets/images/logos/porsche-logo.png"
                    alt="porsche"
                />

                <motion.div className="X relative h-[75px] w-[50px]"
                    initial={{ scaleY: 0, rotate: 0 }}
                    animate={{ scaleY: 1, rotate: 360 }}
                    transition={{
                        duration: 2.5,
                        scaleY: {
                            delay: 5,
                            duration: 1,
                            ease: [0.645, 0.045, 0.355, 1]
                        },
                        rotate: {
                            delay: 6,
                            duration: 2,
                            ease: "backInOut"
                        }
                    }}>

                    <motion.div className="left absolute h-full w-1 inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
                        initial={{ rotate: 0, translate: "-50% -50%" }}
                        animate={{ rotate: 385, translate: "-50% -50%" }}
                        transition={{
                            delay: 6,
                            duration: 2,
                            ease: [0.45, 0, 0.55, 1],
                        }}
                    ></motion.div>
                    <motion.div className="right absolute h-full w-1 inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
                        initial={{ rotate: 0, translate: "-50% -50%" }}
                        animate={{ rotate: -385, translate: "-50% -50%" }}
                        transition={{
                            delay: 6,
                            duration: 2,
                            ease: [0.45, 0, 0.55, 1],
                        }}
                    ></motion.div>
                </motion.div>

                <motion.img
                    initial={{ opacity: 0, translateX: 50 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{
                        delay: 8,
                        duration: 1.5,
                        ease: [.89, -0.01, .39, .94],
                    }}
                    className='invert w-full max-w-64'
                    src="./assets/images/logos/maserati-logo.png"
                    alt="maserati"
                />
            </div>
        </div>
    );
};

export default Preloader;