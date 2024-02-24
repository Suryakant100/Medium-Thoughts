import { AnimatePresence, motion } from "framer-motion";

const AnimationWrapper = ({
  children,
  keyValue,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  duration = { duration: 1 },
  className,
}) => {
  return (
    <motion.div
      key={keyValue}
      initial={initial}
      animate={animate}
      transition={duration}
      className={className}
    >
      {children}
    </motion.div>
  );
};
export default AnimationWrapper;
