"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateFunc = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateFunc);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateFunc);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
