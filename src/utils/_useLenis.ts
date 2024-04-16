"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";

export const useLenis = (
  scrollRef: React.MutableRefObject<HTMLDivElement>,
  eventsTarget: (Window & typeof globalThis) | null = typeof window !== "undefined" ? window : null,
  options: {
    infinite?: boolean;
    orientation?: "vertical" | "horizontal";
    gestureOrientataion?: "both" | "vertical" | "horizontal";
  } = {
    infinite: false,
    orientation: "vertical",
    gestureOrientataion: "vertical"
  }
) => {
  const lenis = useRef<Lenis>();
  const onCompleteRef = useRef<((value: Lenis) => void) | null>(null);

  const buildLenis = () => {
    if (!scrollRef.current) return;
    const content = scrollRef.current.children[0] as HTMLDivElement;
    if (!content) return;
    lenis.current = new Lenis({
      wrapper: scrollRef.current,
      content: content,
      eventsTarget: eventsTarget === null ? undefined : eventsTarget,
      ...options
    });

    function raf(time: number) {
      if (!lenis.current) return;
      lenis.current.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (onCompleteRef.current) onCompleteRef.current(lenis.current);

    return lenis;
  };

  const stop = () => {
    if (!lenis.current) return;
    lenis.current.stop();
  };

  const start = () => {
    if (!lenis.current) return;
    lenis.current.start();
  };

  const destroyLenis = () => {
    if (!lenis.current) return;
    lenis.current.destroy();
  };

  const autoScroll = (duration = 300) => {
    if (
      lenis.current &&
      scrollRef.current !== null &&
      scrollRef.current !== undefined &&
      scrollRef.current.scrollHeight
    )
      if (
        lenis.current &&
        scrollRef.current !== null &&
        scrollRef.current !== undefined &&
        scrollRef.current.scrollHeight
      )
        lenis.current.scrollTo(scrollRef.current.scrollHeight, {
          duration: duration
        });
  };

  const onComplete = (callback: (value: Lenis) => void) => {
    onCompleteRef.current = callback;
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    buildLenis();
    return () => destroyLenis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollRef]);

  return {
    lenis: lenis.current,
    start,
    stop,
    autoScroll,
    destroyLenis,
    onComplete
  };
};
