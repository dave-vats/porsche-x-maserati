import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import storyimages from '../../storyImages';

const StoryTeller = () => {
    const entryItem = useRef(null);
    const storyImg = useRef(null);
    const storyText = useRef(null);

    const para = "You step into your garage, the light flickering on. A familiar tension fills the air as you scan the shadows. You move closer, heart racing, anticipation building.";
    const paraWords = para.split(" ");

    const { scrollYProgress: entryYProgress } = useScroll({
        target: entryItem,
        offset: ['start end', 'end start'],
    });

    const { scrollYProgress: imgEntryYProgress } = useScroll({
        target: storyImg,
        offset: ['start end', 'end start'],
    });

    const { scrollYProgress: storyYProgress } = useScroll({
        target: storyText,
        offset: ['start 0.7', 'end 2'],
    });

    const radiusAmount = useTransform(entryYProgress, [0, 1], [0, window.innerWidth > 800 ? 500 : window.innerWidth > 600 ? 250 : 150]);

    return (
        <section ref={storyText} className='h-[400dvh] grid -z-[1] relative bg-black'>
            <motion.div
                ref={entryItem}
                className='absolute h-[50dvh] left-0 -translate-y-[70%] _300:-translate-y-[65%] _400:-translate-y-[65%] _510:-translate-y-[72%] lg:-translate-y-[90%] top-0 w-full bg-white pointer-events-none mt-[15%]'
                style={{
                    borderBottomRightRadius: radiusAmount,
                    borderBottomLeftRadius: radiusAmount,
                }}
            ></motion.div>

            <section  className='sticky z-[1] h-dvh grid place-items-center top-0'>
                <motion.p
                    
                    className='text-white flex flex-wrap gap-x-10 leading-[1.2] text-[clamp(1.25rem,.7813rem_+_2.6786vw,3.125rem)] overflow-hidden select-none'
                >
                    {
                        paraWords.map((word, i) => {
                            const start = i / paraWords.length;
                            const end = (i + 1) / paraWords.length;
                            const storyOpacity = useTransform(storyYProgress, [start, end], [0, 1]);

                            return (
                                <span key={i} className='relative'>
                                    <span className='opacity-40'>{word}</span>
                                    <motion.span
                                        className='absolute inset-0 opacity-0'
                                        style={{ 
                                            opacity: storyOpacity
                                        }}
                                    >
                                        {word}
                                    </motion.span>
                                </span>
                            );
                        })
                    }
                </motion.p>
            </section>

            <motion.section
                ref={storyImg}
                className='absolute grid left-0 h-dvh bg-cover bg-fixed bottom-0 w-full bg-center overflow-hidden z-[5]'
                style={{ backgroundImage: `url(${storyimages[0]})` }}
            >
                <motion.h1
                    style={{
                        opacity: useTransform(imgEntryYProgress, [0, .45], [0, 1]),
                        translateY: useTransform(imgEntryYProgress, [0, 0.435], [-100, window.innerWidth > 500 ? 0 : 50]),
                    }}
                    className='text-white text-[clamp(1.25rem,.7813rem_+_2.6786vw,3.125rem)] _510:justify-self-center'
                >
                    <span className='opacity-0'>&</span> & Then you see this Car...
                    <span className='opacity-0 hidden _400:block'>You step into your garage, the light flickering on. A familiar tension fills the air as you scan the shadows. You move closer, heart racing, anticipation building.</span>
                </motion.h1>
            </motion.section>
        </section>
    );
}

export default StoryTeller;
