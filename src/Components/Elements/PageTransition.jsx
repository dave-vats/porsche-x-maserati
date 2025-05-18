import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const PageTransition = ({ children }) => {
  const noOfCols = 5;

  const expand = {
    initial: {
      top: 0,
    },
    enter: (i) => ({
      top: "100%",
      transition: {
        duration: 1,
        delay: 0.05 * i,
        ease: [0.645, 0.045, 0.355, 1],
      },
      transitionEnd: {
        height: 0,
        top: 0,
      }
    }),
    exit: (i) => ({
      height: "100%",
      transition: {
        duration: 1,
        delay: 0.05 * i,
        ease: [0.645, 0.045, 0.355, 1],
      },
    }),
  };

  return (
    <>
      {children}
      <div className="fixed top-0 left-0 w-full grid grid-cols-5 h-dvh pointer-events-none z-[99999]">
        {Array.from({ length: noOfCols }, (_, i) => (
          <motion.div
            key={i}
            variants={expand}
            initial="initial"
            animate="enter"
            exit="exit"
            custom={noOfCols - i}
            className="w-full h-full bg-black relative will-change-transform"
          />
        ))}
      </div>
    </>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTransition;
