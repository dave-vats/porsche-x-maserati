import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import videos from '../../heroVideos';

const HeroSection = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const playerRef = useRef(null);

  const onResize = () => setScreenWidth(window.innerWidth);

  const resetProgressAndTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setProgress(0);
    if (playerRef.current) {
      playerRef.current.seekTo(0);
    }
  };

  const handleVideoChange = (i) => {
    resetProgressAndTimer();

    let newVideoIndex;
    if ((i + currentVideo) < 0) {
      newVideoIndex = videos.length - 1;
    } else if ((i + currentVideo) > (videos.length - 1)) {
      newVideoIndex = 0;
    } else {
      newVideoIndex = currentVideo + i;
    }

    setCurrentVideo(newVideoIndex);

    const videoSource = screenWidth > 540 ? videos[newVideoIndex].desktop : videos[newVideoIndex].mobile;

    if (videoSource.endsWith('.webp')) {
      startImageTimer();
    } else {
      if (playerRef.current) {
        playerRef.current.seekTo(0);
      }
    }
  };

  const handleDirectVideoSelect = (index) => {
    if (index !== currentVideo) {
      resetProgressAndTimer();
      setCurrentVideo(index);
    }
  };

  const startImageTimer = () => {
    let startTime = Date.now();
    timerRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      setProgress(elapsedTime / 5000);
      if (elapsedTime >= 5000) {
        clearInterval(timerRef.current);
        handleVideoChange(1);
      }
    }, 100);
  };

  const onVideoProgress = (e) => {
    setProgress(e.played);
  };

  useEffect(() => {
    const videoSource = screenWidth > 540 ? videos[currentVideo].desktop : videos[currentVideo].mobile;
    if (videoSource.endsWith('.webp')) {
      startImageTimer();
    }
    return () => resetProgressAndTimer();
  }, [currentVideo]);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <section className="h-dvh w-full relative bg-black after:absolute after:top-1/2 after:-translate-y-1/2 after:left-0 after:w-full after:text-white text-center after:content-['Loading...'] overflow-hidden">
        {videos.map((e, i) => {
          const source = screenWidth > 540 ? e.desktop : e.mobile;
          const isImage = source.endsWith('.webp');
          return isImage ? (
            <div
              key={i}
              className="inset-0 size-full absolute transition-all duration-1000 ease-in-out z-10"
              style={{
                translate: `${100 * (i - currentVideo)}% 0`,
              }}
            >
              <img src={source} alt={e.title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div
              key={i}
              className="w-full absolute inset-0 transition-all duration-500 ease-in-out size-full z-10"
              style={{
                translate: `${100 * (i - currentVideo)}% 0`,
              }}
            >
              <ReactPlayer
                ref={i === currentVideo ? playerRef : null}
                url={source}
                width="100%"
                height="100%"
                muted
                loop={false}
                playing={i === currentVideo}
                controls={false}
                onEnded={() => handleVideoChange(1)}
                onProgress={onVideoProgress}
                config={{
                  file: {
                    attributes: {
                      crossOrigin: 'anonymous',
                      className: 'object-cover',
                    },
                  },
                }}
              />
            </div>
          );
        })}

        <section className="absolute z-20 bottom-0 left-0 _510:pb-3">
          <div className="flex justify-between md:flex-row flex-col md:gap-0 _510:gap-2 rounded-lg items-center">
            <div className="block _451:py-4 py-4 bg-[rgba(0,0,0,.6)] md:w-auto w-full backdrop-blur-md rounded-lg px-6 relative text-start md:text-3xl _451:text-2xl text-[14px] leading-[1.2] _400:text-lg overflow-hidden">
              {videos.map((e, i) => (
                <p
                  key={i}
                  className="text-white transition-all duration-500 ease-in-out _451:px-0.5 top-2 left-6 _451:top-2.5 _451:left-5 size-full absolute"
                  style={{
                    translate: `0 ${(i - currentVideo) * 120}px`,
                    opacity: i === currentVideo ? 1 : 0,
                    filter: `blur(${i === currentVideo ? 0 : 10}px)`,
                  }}
                >
                  {e.title}
                </p>
              ))}
              <p className="opacity-0 _451:px-0.5 md:text-3xl _451:text-2xl text-[14px] leading-[1.2] _400:text-lg">MC20 Icona & MC20 Leggenda</p>
              <div className="progress-bar w-full _451:h-1 h-[1px] bg-slate-500 rounded-lg overflow-hidden">
                <div
                  className="progress h-full transition-all duration-300 ease-in bg-slate-300 rounded-lg"
                  style={{
                    width: `${(progress * 100)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="flex md:w-auto w-full md:flex-col _510:flex-row flex-col _510:py-0 _451:py-4 py-2 gap-2">
              <div className="flex justify-between md:w-auto w-full bg-[rgba(0,0,0,.6)] px-4 rounded-md">
                {videos.map((_, i) => (
                  <button
                    key={i}
                    className="px-2 inline-block py-2"
                    onClick={() => handleDirectVideoSelect(i)}
                  >
                    <span
                      className="size-1.5 rounded-full block bg-white"
                      style={{
                        backgroundColor: i === currentVideo ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.3)',
                      }}
                    ></span>
                  </button>
                ))}
              </div>
              <div className="flex gap-2 w-full _510:max-w-56 md:justify-between text-white">
                <button
                  className="px-4 py-2 bg-[rgba(0,0,0,.6)] w-full _510:max-w-[120px] grid place-items-center rounded-lg"
                  onClick={() => handleVideoChange(-1)}
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
                <button
                  className="px-4 py-2 bg-[rgba(0,0,0,.6)] w-full _510:max-w-[120px] grid place-items-center rounded-lg"
                  onClick={() => handleVideoChange(1)}
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
      </section>
    </>
  );
};

export default HeroSection;
