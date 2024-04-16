import { state } from "@/store";
import { gsap } from "gsap";
import { Howl } from "howler";
import { useCallback, useEffect, useMemo } from "react";
import { useSnapshot } from "valtio";

import useLocalStorageState from "@/hooks/useLocalStorageState";

interface Props {
  track: string;
  loop?: boolean;
  volume?: number;
  delay?: number;
}

export const useSfx = ({ track, loop = false, volume = 1, delay = 0 }: Props) => {
  const [audioEnabled, _] = useLocalStorageState("audioEnabled");
  const { ready, hasSoundPermission } = useSnapshot(state);
  const { sound } = useMemo(
    () => ({
      sound: new Howl({
        src: track,
        loop,
        volume
      })
    }),
    [track, loop, volume]
  );

  const trigger = useCallback(() => {
    if (audioEnabled) {
      if (!hasSoundPermission) return;
      if (!ready) return;
      if (delay > 0) gsap.delayedCall(delay, () => sound.play());
      else sound.play();
    }
  }, [audioEnabled, hasSoundPermission, ready, delay, sound]);

  const stop = useCallback(() => {
    if (sound.playing()) sound.stop();
  }, [sound]);

  const destroy = useCallback(() => {
    sound.unload();
  }, [sound]);

  const pause = useCallback(() => {
    if (sound.playing()) sound.pause();
  }, [sound]);

  const fadeTo = useCallback(
    (volume: number) => {
      if (sound.playing()) sound.fade(sound.volume(), volume, 2500);
    },
    [sound]
  );

  const fadeOut = useCallback(() => {
    if (sound.playing()) sound.fade(volume, 0, 500).once("fade", () => sound.stop());
  }, [sound, volume]);

  useEffect(() => {
    if (!audioEnabled) {
      if (sound.playing()) sound.stop();
    }
  }, [audioEnabled, sound]);

  const playing = sound.playing();

  return { sound, trigger, stop, pause, fadeTo, fadeOut, playing, destroy };
};
