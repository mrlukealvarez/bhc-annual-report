"use client";

// 9 motion components ported from bhc-website-v2 — all respect useReducedMotion
import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeInDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const variantMap = {
    up: fadeInUpVariants,
    down: fadeInDownVariants,
    left: fadeInLeftVariants,
    right: fadeInRightVariants,
    none: fadeInVariants,
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      variants={variantMap[direction]}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ staggerChildren: staggerDelay }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      variants={fadeInUpVariants}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 2,
  decimals = 0,
  className,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(
    shouldReduceMotion ? end.toFixed(decimals) : (0).toFixed(decimals)
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplay(end.toFixed(decimals));
      return;
    }
    if (!isInView) return;

    const startTime = performance.now();
    const durationMs = duration * 1000;

    function easeOut(t: number): number {
      return 1 - Math.pow(1 - t, 4);
    }

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeOut(progress);
      const current = eased * end;
      setDisplay(
        decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString()
      );

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(decimals > 0 ? end.toFixed(decimals) : end.toLocaleString());
      }
    }

    requestAnimationFrame(tick);
  }, [isInView, end, duration, decimals, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function EmeraldShimmer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.span
      style={{
        backgroundImage:
          "linear-gradient(90deg, #059669 0%, #34D399 50%, #059669 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
      }}
      animate={
        shouldReduceMotion
          ? { backgroundPosition: "0% 50%" }
          : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
      }
      transition={
        shouldReduceMotion
          ? undefined
          : { duration: 3, repeat: Infinity, ease: "linear" }
      }
      className={className}
    >
      {children}
    </motion.span>
  );
}

export function NavyGlow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "transparent",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              scale: 1.02,
              boxShadow: "0 0 20px rgba(5,150,105,0.15)",
              borderColor: "rgba(5,150,105,0.3)",
            }
      }
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxSection({
  children,
  speed = 0.3,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-100 * speed, 100 * speed]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

export function PulseGlow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              boxShadow: [
                "0 0 20px rgba(5,150,105,0.2)",
                "0 0 40px rgba(5,150,105,0.4)",
                "0 0 20px rgba(5,150,105,0.2)",
              ],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? undefined
          : { scale: 0.8, opacity: 0, rotate: -2 }
      }
      whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
