import React, { useState, useRef } from 'react'
import sliderVideos from '../../sliderVideos'
import ReactPlayer from 'react-player'

const CarSlider = () => {

    const [currentCar, setCurrentCar] = useState(0)
    const [forwardOpacity, setForwardOpacity] = useState(true)
    const [backwardOpacity, setBackwardOpacity] = useState(false)
    const [forwardPlaying, setForwardPlaying] = useState(false)
    const [backwardPlaying, setBackwardPlaying] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    // Create refs for ReactPlayer instances
    const playerRefs = useRef([]);
    const backwardRefs = useRef([]);

    const handleCarChange = (direction, directStep) => {
        setIsDisabled(true);

        // Reset playing and opacity states
        setForwardPlaying(false);
        setBackwardPlaying(false);
        setForwardOpacity(false);
        setBackwardOpacity(false);

        if (directStep !== 'direct') {
            // Incremental change
            const newCar = currentCar + direction;
            if (direction === -1) {
                setBackwardOpacity(true);
                setBackwardPlaying(true);
            } else {
                setForwardOpacity(true);
                setForwardPlaying(true);
            }
            setCurrentCar(newCar);
        } else {
            // Direct change
            if (currentCar === direction) {
                setIsDisabled(false); // Prevent unnecessary re-disabling
                return;
            }

            const isBackward = direction < currentCar;
            setCurrentCar(direction);

            if (isBackward) {
                setBackwardOpacity(true);
                setBackwardPlaying(true);
            } else {
                setForwardOpacity(true);
                setForwardPlaying(true);
            }
        }

        // Stop currently playing videos and reset progress
        if (playerRefs.current[currentCar]) {
            playerRefs.current[currentCar].seekTo(0);
        }
        if (backwardRefs.current[currentCar]) {
            backwardRefs.current[currentCar].seekTo(0);
        }

        setTimeout(() => {
            setIsDisabled(false);
        }, 2000); // Duration should match your video transition
    };

    const handleEnded = (index) => {
        setForwardPlaying(false);
        setBackwardPlaying(false);

        if (playerRefs.current[index]) {
            playerRefs.current[index].seekTo(0);
        }
        if (backwardRefs.current[index]) {
            backwardRefs.current[index].seekTo(0);
        }

        setIsDisabled(false);
    };


    return (
        <>

            <section className="h-dvh w-full before:content-['Loading...'] text-white bg-slate-800 grid place-items-center relative">

                <div className='absolute inset-0 size-full pointer-events-none transition-all duration-1000 ease-in-out z-10 bg-cover bg-center bg-no-repeat'
                    style={{
                        backgroundImage: `url(${sliderVideos[currentCar].bgImage})`
                    }}
                ></div>
                {
                    sliderVideos.map((e, i) => {
                        return (
                            <div key={i} className="absolute z-20 inset-0 grid size-full transition-all duration-[2s] ease-[cubic-bezier(.48,.18,.18,1)] justify-center _451:pb-[20%] _510:pb-[10%] pb-[45%] _350:pb-[38%] _400:pb-[35%] place-items-end pointer-events-none"
                                style={{
                                    transform: `translateX(${i - currentCar}00%)`,
                                }}
                            >
                                <div className='relative'
                                >
                                    <ReactPlayer
                                        url={e.carImage}
                                        ref={el => playerRefs.current[i] = el}
                                        width="100%"
                                        height="100%"
                                        playing={forwardPlaying && currentCar === i || (currentCar === i + 1 && forwardPlaying)}
                                        loop={false}
                                        onEnded={() => handleEnded(i)}
                                        controls={false}
                                        muted={true}
                                        config={{
                                            file: {
                                                attributes: {
                                                    controlsList: 'nodownload',
                                                    className: 'transition-all duration-100 ease-in',
                                                    style: {
                                                        opacity: forwardOpacity ? '1' : '0'
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                    <div className='absolute z-20 inset-0 size-fit transition-all duration-100 ease-in'
                                        style={{
                                            opacity: backwardOpacity ? '1' : '0'
                                        }}
                                    >
                                        <ReactPlayer
                                            url={e.carImageRev}
                                            ref={el => backwardRefs.current[i] = el}
                                            width="100%"
                                            height="100%"
                                            playing={backwardPlaying && currentCar === i || (currentCar === i - 1 && backwardPlaying)}
                                            loop={false}
                                            onEnded={() => handleEnded(i)}
                                            controls={false}
                                            muted={true}
                                        />
                                    </div>
                                    <div className='absolute bottom-full left-0 leading-[0] transition-all duration-700 ease-in-out text-[clamp(2rem,.625rem_+_7.8571vw,7.5rem)] font-dancingScript w-full text-center'
                                        style={{
                                            transform: `translateY(${i === currentCar ? '0' : '100 %'})`,
                                            opacity: i === currentCar ? 1 : 0,
                                            filter: `blur(${i === currentCar ? 0 : 10}px)`,
                                        }}
                                    ><h1>{e.carName}</h1></div>
                                </div>
                            </div>
                        )
                    })
                }

                <section className='absolute bottom-0 z-20 left-0 text-white'>
                    <div className='flex pb-0 md:flex-row flex-col md:gap-0 gap-2 md:justify-between items-center'>
                        <div className='py-4 px-4 rounded-lg md:w-auto w-full bg-[rgba(0,0,0,0.5)]'>
                            <div className='relative md:text-2xl _400:text-xl leading-[1] tracking-[1px]text-[14px] overflow-hidden'>
                                <p className='pe-10 pb-1 opacity-0'>Drive Like the Best Is Yet to Come</p>
                                {
                                    sliderVideos.map(({ tagLine }, i) => {
                                        return (
                                            <p key={i} className='absolute inset-0 transition-all duration-1000 ease-in-out'
                                                style={{
                                                    transform: `translateY(${i - currentCar}00%)`,
                                                    opacity: i === currentCar ? 1 : 0,
                                                    filter: `blur(${i === currentCar ? 0 : 10}px)`,
                                                }}
                                            >{tagLine}</p>
                                        )
                                    })
                                }
                            </div>
                            <div className='progress-bar rounded-full overflow-hidden w-full h-1 bg-[rgba(255,255,255,0.5)]'>
                                <div className='block h-full transition-all duration-300 ease-in-out bg-[rgba(255,255,255,1)] rounded-full'
                                    style={{
                                        width: `${100 / sliderVideos.length}%`,
                                        transform: `translateX(${currentCar * 100}%)`,
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div className='flex w-full md:w-auto flex-col _400:flex-row md:flex-col gap-2'>
                            <div className='px-2 flex justify-between items-center bg-[rgba(0,0,0,0.5)] rounded-md'>
                                {
                                    sliderVideos.map((_, i) => {
                                        return (
                                            <button className='px-2 py-2' key={i}
                                                disabled={isDisabled}
                                                onClick={() => handleCarChange(i, 'direct')}
                                            >
                                                <span className={`block size-1.5 rounded-full transition-all duration-300 ease-in-out`}
                                                    style={{
                                                        background: i === currentCar ? 'white' : 'rgba(255, 255, 255, 0.5)',
                                                    }}
                                                ></span>
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            <div className='w-full flex gap-2'>
                                <button className='w-full bg-[rgba(0,0,0,0.5)] transition-all duration-500 ease-in-out rounded-md py-1.5 grid place-items-center'
                                    onClick={() => handleCarChange(-1, 'prev')}
                                    disabled={isDisabled}
                                    style={{
                                        transform: `translateX(${currentCar === 0 ? -10 : 0}px)`,
                                        opacity: currentCar === 0 ? 0 : 1,
                                        pointerEvents: currentCar === 0 ? 'none' : 'auto'
                                    }}
                                >
                                    {/* Left Arrow Icon */}
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1.02698 11.9929L5.26242 16.2426L6.67902 14.8308L4.85766 13.0033L22.9731 13.0012L22.9728 11.0012L4.85309 11.0033L6.6886 9.17398L5.27677 7.75739L1.02698 11.9929Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>
                                <button className='w-full bg-[rgba(0,0,0,0.5)] transition-all duration-500 ease-in-out rounded-md py-1.5 grid place-items-center'
                                    onClick={() => handleCarChange(1, 'next')}
                                    disabled={isDisabled}
                                    style={{
                                        transform: `translateX(${currentCar === sliderVideos.length - 1 ? 10 : 0}px)`,
                                        opacity: currentCar === sliderVideos.length - 1 ? 0 : 1,
                                        pointerEvents: currentCar === sliderVideos.length - 1 ? 'none' : 'auto'
                                    }}
                                >
                                    {/* Right Arrow Icon */}
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M23.0677 11.9929L18.818 7.75739L17.4061 9.17398L19.2415 11.0032L0.932469 11.0012L0.932251 13.0012L19.2369 13.0032L17.4155 14.8308L18.8321 16.2426L23.0677 11.9929Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <div className='absolute lg:top-0 left-0 _400:top-[8%] top-[5%] size-full z-10'
                    style={{
                        background: `linear-gradient(to top, white 30%, rgba(255, 255, 255, 0.2) 32%, rgba(0, 0, 0, 0.6) 35%, rgba(0, 0, 0, 0.1) 55%, rgba(0, 0, 0, 0) 75%)`
                    }}
                ></div>

            </section>

        </>
    )
}

export default CarSlider
