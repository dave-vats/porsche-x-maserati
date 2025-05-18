import React, { useEffect, useRef, useState } from 'react'
import porscheCars from '../../porscheCarPage'
import { motion, useInView } from 'framer-motion'
import { ArrowFatLinesDown } from '@phosphor-icons/react'
import VideoDvh from '../Elements/VideoDvh'
import ImgDvh from '../Elements/ImgDvh'
import RevealText from '../Elements/RevealText'
import CarPageParallax from '../Elements/CarPageParallax'
import Footer from '../Elements/Footer'
import { useLocation } from 'react-router-dom'

const CarPage = () => {
    const location = useLocation();
    const params = location.state;
    const [onPageData, setOnPageData] = useState(null);
    const [isBgAvailable, setIsBgAvailable] = useState(false);
    const [carBg, setCarBg] = useState('');
    const counterSectionRef = useRef(null);
    const isInView = useInView(counterSectionRef, { once: true, amount: 0.2 });

    // Random values for car specs
    const zeroToSixty = (Math.random() * 3 + 3);
    const horsePower = (Math.random() * 300 + 300);
    const mphSpeed = (Math.random() * 68 + 200);

    const carName = params;
    console.log('Passed Car Name : ' + carName);

    useEffect(() => {
        // Reset state when carName changes
        setOnPageData(null);
        setIsBgAvailable(false);
        setCarBg('');

        if (carName) {
            const carData = porscheCars.find(car => car.name.toLowerCase() === carName.toLowerCase());
            if (carData) {
                setOnPageData(carData);
            } else {
                console.error(`Car data not found for: ${carName}`);
            }
        } else {
            console.error('No car name provided in location state');
        }
    }, [carName]);

    useEffect(() => {
        if (onPageData) {
            const preloadAssets = async () => {
                const promises = onPageData.files.map(file => {
                    if (file.type === 'video/mp4') {
                        return new Promise((resolve) => {
                            const video = document.createElement('video');
                            video.src = file.path;
                            video.onloadeddata = resolve;
                        });
                    } else {
                        return new Promise((resolve) => {
                            const img = new Image();
                            img.src = file.path;
                            img.onload = resolve;
                        });
                    }
                });
                await Promise.all(promises);
            };

            preloadAssets();
        }
    }, [onPageData]);

    // Ensure hooks are called unconditionally
    const { name, carImg, files, text1, text2 } = onPageData || {};
    const isItVideo = files && (files[0]?.type === 'video/mp4' || files[0]?.type === 'x-mpegurl');

    // Update background image if available
    useEffect(() => {
        if (onPageData && onPageData.bg && onPageData.bg.path !== carBg) {
            setCarBg(onPageData.bg.path);
            setIsBgAvailable(true);
        }
    }, [onPageData, carBg]);

    // Ensure that the component always returns a valid JSX structure
    if (!onPageData) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    const textArray1 = text1.split(" ");
    const textArray2 = text2.split(" ");

    return (
        <>
            <section className='h-dvh grid bg-black place-items-center w-full text-white before:-z-[2] before:content-["loading..."] before:text-white relative overflow-hidden bg-cover bg-center bg-no-repeat'
                style={{
                    backgroundImage: isBgAvailable ? `url(${carBg})` : 'none'
                }}
            >
                <div className='z-[1] absolute linear inset-0 size-full'
                    style={{
                        opacity: isBgAvailable ? 0 : 1
                    }}
                ></div>

                <div className='grid place-items-center relative z-[5]'>
                    {carImg && (
                        carImg.endsWith('.webm') ? (
                            <motion.video key={carImg} className='max-w-[960px] w-[110%]' id='maseratiModelVideo' alt={name}  autoPlay muted
                            initial={{
                                translateX: '100%',
                                // opacity: 0,
                            }}
                            animate={{
                                translateX: '0',
                                // opacity: 1,
                            }}
                            transition={{
                                // delay: 1,
                                duration: 2,
                                ease: 'circOut'
                            }}
                            >
                                <source src={carImg} type='video/webm' />
                            </motion.video>
                        ) : (
                            <motion.img src={carImg} className='max-w-[960px] w-[110%]' alt={name}
                                initial={{
                                    translateY: '100%',
                                    opacity: 0,
                                }}
                                animate={{
                                    translateY: '0',
                                    opacity: 1,
                                }}
                                transition={{
                                    delay: 1,
                                    duration: 3,
                                    ease: 'backOut'
                                }}
                            />
                        )
                    )}
                </div>
                <div className='absolute z-[2] inset-0 grid place-items-center size-full font-bold text-center'
                    style={{
                        color: isBgAvailable ? '#fff' : '#777'
                    }}
                >
                    {name && (
                        <h1 className='font-dancingScript text-[clamp(3.75rem,0.7813rem_+_16.9643vw,15.625rem)] select-none'>{name}</h1>
                    )}
                </div>

                <motion.div className='car-info z-[2] lg:px-16 md:px-10 px-4 flex py-10 justify-between items-center absolute w-full bottom-0 left-0'
                    initial={{
                        translateY: '100%'
                    }}
                    animate={{
                        translateY: 0
                    }}
                    transition={{
                        delay: 2,
                        duration: 1.5,
                        ease: [.53, .03, 0, 1.14]
                    }}
                >
                    <div className='bg-[rgba(0,0,0,.4)] md:py-[.5%] py-2 text-slate-100 rounded-lg h-fit w-full backdrop-blur-lg px-5 flex md:px-[3%] justify-between items-center border-[0.001rem]'>
                        <h1 className='text-[clamp(1.75rem,1.6875rem_+_0.3571vw,2rem)] tracking-tighter capitalize'>Porsche {name}</h1>
                        <div className="right">
                            <h2 className='flex gap-3 text-[17px] items-center overflow-hidden'>
                                <span className='_510:block hidden'>Scroll for More</span>
                                <motion.span
                                    animate={{
                                        translateY: ['-120%', '0', '120%'],
                                        opacity: 1
                                    }}
                                    transition={{
                                        delay: 2.5,
                                        duration: 1.5,
                                        ease: 'anticipate',
                                        repeat: Infinity
                                    }}
                                ><ArrowFatLinesDown size={20} /></motion.span>
                            </h2>
                        </div>
                    </div>
                </motion.div>
            </section>

            <section className='bg-black lg:grid grid-cols-3 gap-10 pt-10 md:pt-20 _510:pb-10 text-white'>
                <h1 className='text-[clamp(2rem,1.5625rem_+_2.5vw,3.75rem)]'>Car Specs</h1>
            </section>

            <section className='_510:pb-20 grid lg:px-0 _510:grid-cols-3 _300:grid-cols-2 pb-14 _510:gap-10 w-full bg-black text-white' ref={counterSectionRef}>
                <div className='lg:text-center rounded-xl py-5 _510:py-0 font-medium'>
                    <p className='lg:text-[140px] _451:text-[42px] text-[28px]'>{mphSpeed.toFixed()}</p>
                    <h1 className='text-[20px] capitalize lg:text-[24px]'>mph</h1>
                </div>
                <div className='lg:text-center rounded-xl py-5 _510:py-0 text-[42px] lg:text-[140px] font-medium'>
                    <p className='lg:text-[140px] _451:text-[42px] text-[28px]'>{horsePower.toFixed()}</p>
                    <h1 className='text-[20px] capitalize lg:text-[24px]'>horse Power</h1>
                </div>
                <div className='lg:text-[140px] lg:text-center rounded-xl py-5 _510:py-0 font-medium'>
                    <p className='lg:text-[140px] _451:text-[42px] text-[28px]'>{zeroToSixty.toFixed(1)}</p>
                    <h1 className='text-[20px] capitalize lg:text-[24px]'>0 to 60</h1>
                </div>
            </section>

            {isItVideo ? (
                <VideoDvh path={files[0]?.path} />
            ) : (
                <ImgDvh path={files[0]?.path} />
            )}

            <RevealText addClasses="bg-white py-[10%]" text={textArray1} ></RevealText>

            <CarPageParallax files={files} />

            <RevealText addClasses="bg-white py-[20%]" text={textArray2}></RevealText>

        </>
    )
}

export default CarPage
