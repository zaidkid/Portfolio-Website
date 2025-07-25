'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import boyAnimation from '../assets/Coder.json'; // your animation file

const JumpingBoy = ({ layoutId = "jumping-boy", className = "" }) => {
  return (
    <motion.div
      layoutId={layoutId}
      className={`w-full h-full ${className}`}
      transition={{ type: "spring", stiffness: 80 }}
    >
      <Lottie animationData={boyAnimation} loop />
    </motion.div>
  );
};

export default JumpingBoy;
