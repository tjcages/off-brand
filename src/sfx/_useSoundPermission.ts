import { state } from "@/store";
import { useEffect, useState } from "react";

export const useSoundPermission = () => {
  const [retryCount, setRetryCount] = useState(0);
  useEffect(() => {
    if (state.hasSoundPermission) return;
    isAudioLocked().then(locked => {
      state.hasSoundPermission = !locked;
      if (locked) {
        setTimeout(() => {
          setRetryCount(retryCount + 1);
        }, 2000);
      }
    });
  }, [retryCount]);
};

export const isAudioLocked = () => {
  return new Promise(resolve => {
    const checkHTML5Audio = async () => {
      const audio = new Audio();
      try {
        audio.play();
        resolve(false);
      } catch (err) {
        resolve(true);
      }
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      resolve(context.state === "suspended");
    } catch (e) {
      checkHTML5Audio();
    }
  });
};
