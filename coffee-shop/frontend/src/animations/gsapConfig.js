import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const initSmoothScroll = () => {
  if (typeof window === "undefined") return null;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
};

export const animateOnScroll = (element, options = {}) => {
  if (!element) return;
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: options.y || 40,
      ...options.from,
    },
    {
      opacity: 1,
      y: 0,
      duration: options.duration || 1,
      ease: options.ease || "power3.out",
      scrollTrigger: {
        trigger: element,
        start: options.start || "top 85%",
        toggleActions: "play none none reverse",
        ...options.scrollTrigger,
      },
      ...options.to,
    }
  );
};

export { gsap, ScrollTrigger };

