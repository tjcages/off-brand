"use client";

import { useCallback, useEffect, useState } from "react";
import { isMobileSafari } from "react-device-detect";

const mobileBreakpoint = 768;

const useMedia = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateTarget = useCallback((e: any) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addListener(updateTarget);

    // Check on mount
    if (media.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }

    return () => media.removeListener(updateTarget);
  }, [updateTarget, width]);

  return targetReached;
};

const useDevice = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const determineDevice = () => {
    if (typeof window === "undefined" || window.innerWidth === undefined) {
      return { mobile: false, tablet: false };
    }

    const width = window.innerWidth;
    return {
      mobile: width < 768,
      tablet: width >= 768 && width < 1024
    };
  };

  useEffect(() => {
    const handleResize = () => {
      const { mobile, tablet } = determineDevice();
      setIsMobile(mobile);
      setIsTablet(tablet);
    };

    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile, isTablet };
};

export default useDevice;

export { useMedia, mobileBreakpoint, useDevice, isMobileSafari };
