import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { motion, useScroll, useTransform } from "framer-motion";
import { span } from "framer-motion/client";

const Passion = () => {
  const blobSrc = "./assets/videos/passion/blob.mp4";
  const overlaySrc = "url(./assets/videos/passion/overlay.png)";

  const bigText = [
    "We Believe in",
    "Passion & Life.",
    "Combining",
    "Porsche's Power",
    "and Maserati's",
    "Elegance,",
    "to create cars",
    "that flow with",
    "unmatched style,",
    "& Performance.",
  ];

  const beasts = [
    "We",
    "create",
    "Beasts",
    "that",
    "flow",
    "flawlessly",
    "on",
    "the",
    "Roads.",
  ];

  const blobSection = useRef(null);
  const getBigTextEnd = useRef(null);
  const blobEntry = useRef(null);
  const beastText = useRef(null);
  const beastEnd = useRef(null);

  const { scrollYProgress: beastYprogress } = useScroll({
    target: beastEnd,
    offset: ["start end", "end start"],
  });

  const blurAmmount = useTransform(beastYprogress, [0, 0.3], [0, 1]);

  const bigTextSection = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(-1); // Track which line is visible

  const checkVisibility = () => {
    const section = bigTextSection.current;
    if (!section) return; // Check if section is null
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Calculate the 45% and 55% of the viewport height
    const startThreshold = viewportHeight * 0.7;
    const endThreshold = viewportHeight * 0.6;

    bigText.forEach((_, i) => {
      const lineRect = section.children[i].getBoundingClientRect();
      // Check if the line is within the 45%-55% viewport range
      if (lineRect.top < endThreshold && lineRect.bottom > startThreshold) {
        setVisibleIndex(i); // Update the visible index
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility);
    return () => {
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  // const blurAmount = useTransform(blobYprogress, [0, 1], [0, 24])

  return (
    <>
      <main ref={blobSection} className="bg-[rgba(0,0,0,.3)]">
        <div className="sticky top-0 -z-[5]">
          <div className="video-wrapper pointer-events-none select-none h-dvh w-full">
            <div
              className="overlay absolute z-[4] inset-0 size-full bg-cover bg-no-repeat bg-center"
              style={{ backgroundImage: overlaySrc }}
            >
              <div ref={blobEntry} className="relative size-full">
                <motion.div
                  className="absolute z-[10] backdrop-blur-lg inset-0 size-full object-cover"
                  style={{
                    opacity: blurAmmount,
                  }}
                ></motion.div>

                <motion.div className="absolute inset-0 size-full object-cover">
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    controls={false}
                    url={blobSrc}
                    playing={true}
                    muted
                    loop={true}
                    playsinline
                    config={{
                      file: {
                        attributes: {
                          className: "size-full absolute inset-0 object-cover",
                          playsInline: true,
                          preload: "auto",
                        },
                      },
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <section
          ref={beastText}
          className="py-10 h-dvh z-[5] font-bold leading-[1] text-slate-400 text-[clamp(2rem,0.625rem_+_7.8571vw,7.5rem)]"
        >
          <section
            className="block size-full"
            viewport={{
              once: true,
              root: getBigTextEnd,
            }}
            transition={{
              duration: 0.5,
              ease: "anticipate",
            }}
          >
            <p className="flex flex-wrap _300:gap-x-5 gap-x-3 _451:gap-x-6 md:gap-x-5 lg:gap-x-10">
              {beasts.map((e, i) => {
                return (
                  <motion.span
                    key={i}
                    initial={{
                      translateX: i % 2 !== 0 ? `-100%` : "100px",
                      opacity: 0,
                    }}
                    whileInView={{
                      translateX: `0`,
                      opacity: 1,
                    }}
                    viewport={{
                      once: true,
                      root: beastText,
                    }}
                    transition={{
                      duration: 1,
                      ease: "anticipate",
                    }}
                  >
                    <span>{e}</span>
                  </motion.span>
                );
              })}
            </p>
          </section>
          <div ref={beastEnd}></div>
        </section>

        <section
          ref={bigTextSection}
          className="py-[10%] text-slate-400 tracking-tighter text-[clamp(2rem,0.625rem_+_7.8571vw,7.5rem)] font-bold"
        >
          {bigText.map((e, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: visibleIndex === i ? 1 : 0.1 }} // Only show the current line
              transition={{ duration: 0.5 }}
              className="relative block"
            >
              <span className="opacity-10">{e}</span>
              <span className="absolute inset-0">{e}</span>
            </motion.span>
          ))}
        </section>
      </main>
    </>
  );
};

export default Passion;
