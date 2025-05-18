import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from "framer-motion";

const imgDvh = (props) => {

    const imgExit = useRef(null)
    console.log(props.path);
    const imgSrc = `url(${props.path})`

    const { scrollYProgress } = useScroll({
        target: imgExit,
        offset: ["start 0.9", "end 0.2"],
    });

    const imgRadius = useTransform(scrollYProgress, [0.5, 0.7], [0, 50]);
    const opacityAmt = useTransform(scrollYProgress, [0.5, 0.7], [0.4, 1]);
    const imgScale = useTransform(scrollYProgress, [0.5, 0.7], [1, 0.8]);


    return (
        <div ref={imgExit} className='h-[200dvh] bg-white'>
            <div className='sticky top-0 '>
                <div className="image-wrapper relative overflow-hidden">
                    <motion.div className='absolute overflow-hidden z-[2] inset-1/2 size-full bg-[rgba(0,0,0,.5)]'
                        style={{
                            opacity: opacityAmt,
                            translateX: '-50%',
                            translateY: '-50%',
                            borderRadius: imgRadius,
                            scale: imgScale
                        }}
                    ></motion.div>
                    <motion.div className='h-dvh bg-center bg-cover bg-no-repeat'
                        style={{
                            backgroundImage: imgSrc,
                            borderRadius: imgRadius,
                            scale: imgScale
                        }}
                    ></motion.div>
                </div>
            </div>
        </div>
    )
}

export default imgDvh
