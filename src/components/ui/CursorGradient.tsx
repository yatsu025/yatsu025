import { useState, useEffect, useMemo } from 'react';
import { motion, useSpring, useMotionValue, useVelocity, useTransform } from 'framer-motion';

const CursorGradient = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Velocity tracking
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);
  
  // Calculate total velocity
  const velocity = useMemo(() => {
    return Math.sqrt(Math.pow(velocityX.get(), 2) + Math.pow(velocityY.get(), 2));
  }, [velocityX, velocityY]);

  // Map velocity to scale (grows when moving fast)
  const scale = useTransform(
    [velocityX, velocityY],
    ([latestX, latestY]) => {
      const speed = Math.sqrt(Math.pow(latestX as number, 2) + Math.pow(latestY as number, 2));
      return 1 + Math.min(speed / 1500, 0.6); // Slightly more grow effect
    }
  );

  // Smooth spring physics for the cursor movement
  const springConfig = { damping: 30, stiffness: 250 }; // Faster and snappier
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Hover state for interactive elements
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest('a, button, [role="button"], input, select, textarea');
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Real Cursor Dot Replacement */}
      <motion.div
        className="fixed top-0 left-0 bg-white rounded-full z-[10000] mix-blend-difference"
        animate={{
          width: isHovering ? 40 : 10,
          height: isHovering ? 40 : 10,
          opacity: isHovering ? 0.3 : 1,
        }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Primary Soft White Glow - Tighter Spread */}
      <motion.div
        className="absolute w-[150px] h-[150px] rounded-full blur-[40px] opacity-[0.12] bg-white/20"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 2 : scale,
        }}
      />
      
      {/* Outer Subtle Aura - Reduced Size */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full blur-[70px] opacity-[0.06] bg-white/10"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 2.5 : useTransform(scale, [1, 1.5], [1, 1.1]),
        }}
      />
    </div>
  );
};

export default CursorGradient;
