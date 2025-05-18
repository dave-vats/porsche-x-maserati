import React, { useRef } from 'react'
import ReactPlayer from 'react-player';
import { motion, useScroll, useTransform } from 'framer-motion';

const CarPageParallax = (props) => {
  const parallaxRef = useRef(null)
  const { files } = props;
  const filesAfterIndex0 = files.slice(1);

  // Check if filesAfterIndex0 is empty
  if (filesAfterIndex0.length === 0) return null; // Early return if no files

  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"]
  });

  const divideBy = window.innerWidth > 950 ? 2 : 3; 

  return (
    <>
      <div ref={parallaxRef} className='pt-[12%] bg-white h-fit _700:h-[150dvh] _510:overflow-auto overflow-hidden lg:h-[200dvh]'>
        <section className='size-full relative'>
          {
            filesAfterIndex0.map((file, index) => {
              const isVideo = file.path.endsWith('.mp4') || file.path.endsWith('.m3u8'); // Updated condition
              let className = '';
              let yOffset = 0;

              if (index === 0) {
                className = 'rounded-xl max-h-[500px] overflow-hidden w-full _700:w-3/4 h-auto mb-8';
                yOffset = (window.innerHeight / divideBy) ;
              } else if (index === 1) {
                className = 'rounded-xl max-h-[500px] overflow-hidden w-full _700:w-1/2 h-auto _700:absolute right-[9%] top-1/2 transform -translate-y-1/4';
                yOffset = window.innerHeight / 3;
              } else if (index === 2) {
                className = 'rounded-xl max-h-[500px] overflow-hidden w-full _700:w-5/12 h-auto _700:absolute left-[11%] -translate-x-1/3 bottom-0';
                yOffset = (window.innerHeight / 2) * -1;
              }

              const y = useTransform(scrollYProgress, [0, 1], [0, yOffset]);

              return (
                <motion.div
                  key={index}
                  className={className}
                  style={{
                    y: y,
                    transition: { type: 'tween', ease: 'easeOut' }
                  }}
                >
                  {isVideo ? (
                    <ReactPlayer
                      url={file.path}
                      width="100%"
                      height="100%"
                      playing 
                      muted
                      playsinline
                      loop
                      config={{
                        file: {
                          attributes: {
                            playsInline: true,
                            preload: 'auto',
                          },
                          forceHLS: file.path.endsWith('.m3u8'),
                        }
                      }}
                    />
                  ) : (
                    <img src={file.path} alt={`Car image ${index + 1}`} className="w-full h-full max-w-[100%] max-h-[500px] object-center object-scale-down" />
                  )}
                </motion.div>
              );
            })
          }
        </section>
      </div>
    </>
  )
}

export default CarPageParallax
