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
  const [mobile, setMobile] = useState(false);

  const determine = () => {
    if (typeof window === "undefined") {
      return false;
    }
    if (window.innerWidth === undefined) {
      return false;
    }
    if (window && window.innerWidth >= 768) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    setMobile(determine());
  }, []);

  return mobile;
};

export { useMedia, mobileBreakpoint, useDevice, isMobileSafari };
