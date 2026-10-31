import type { Variants, Transition } from "framer-motion";

// Smooth, refined cubic-bezier curves for luxury interaction
export const easeLuxury: Transition["ease"] = [0.16, 1, 0.3, 1];
export const easeSnappy: Transition["ease"] = [0.25, 1, 0.5, 1];

// Page Entrance
export const pageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeLuxury,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.3,
      ease: easeSnappy,
    },
  },
};

// Stagger Container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Fade In Up
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: easeLuxury,
    },
  },
};

// Fade In Scale
export const fadeInScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: easeLuxury,
    },
  },
};

// Editorial Staggered Word Reveal
export const editorialWord: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeLuxury,
    },
  },
};

// Card Hover Variant
export const cardHoverVariants: Variants = {
  initial: {
    y: 0,
    boxShadow: "0 1px 3px rgba(48, 35, 29, 0.06)",
    borderColor: "#D7D0C9",
  },
  hover: {
    y: -3,
    boxShadow: "0 10px 20px -5px rgba(111, 78, 55, 0.12)",
    borderColor: "#6F4E37",
    transition: {
      duration: 0.25,
      ease: easeLuxury,
    },
  },
};

// Button Interaction Presets
export const buttonMotion = {
  whileHover: { scale: 1.02, y: -1 },
  whileTap: { scale: 0.98, y: 1 },
  transition: { duration: 0.15, ease: easeLuxury },
};

// Modal & Dropdown Animation
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: easeLuxury,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 10,
    transition: {
      duration: 0.2,
      ease: easeSnappy,
    },
  },
};

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};
