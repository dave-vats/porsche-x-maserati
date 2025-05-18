import React, { useRef } from "react";
import ReactPlayer from "react-player";
import { motion, useScroll, useTransform } from "framer-motion";

const VideoDvh = (props) => {
  console.log(props);
  const videoExit = useRef(null);

  const { scrollYProgress: videoYprogress } = useScroll({
    target: videoExit,
    offset: ["start 0.9", "end 0.2"],
  });

  const videoRadius = useTransform(videoYprogress, [0.5, 0.7], [0, 50]);
  const opacityAmt = useTransform(videoYprogress, [0.5, 0.7], [0.4, 1]);
  const videoScale = useTransform(videoYprogress, [0.5, 0.7], [1, 0.8]);

  return (
    <>
      <div ref={videoExit} className="h-[200dvh] bg-white w-full">
        <motion.div className="h-dvh sticky top-0">
          <motion.div className="video-wrapper overflow-hidden absolute inset-1/2 size-full object-cover"
                style={{
                    scale: videoScale,
                    translateX : '-50%',
                    translateY : '-50%',
                }}
          >
            <motion.div
              className="absolute inset-0 size-full bg-[rgba(0,0,0,.5)]"
              style={{
                opacity: opacityAmt,
                borderRadius: videoRadius,
              }}
            ></motion.div>

            <motion.div
              className="overflow-hidden absolute -z-[1] inset-0 size-full"
              style={{
                borderRadius: videoRadius,
              }}
            >
              <ReactPlayer
                width="100%"
                height="100%"
                controls={false}
                url={props.path}
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
                    forceHLS: props.path.endsWith('.m3u8')
                  },
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default VideoDvh;
