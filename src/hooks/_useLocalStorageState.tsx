import { useLocalStorage } from "usehooks-ts";

const LocalStorageKeyAndDefaultValue = {
  seenEntryIntroAnimation: false,
  seenEntryTutorial: false,
  seenTribeAssignment: false,
  castVote: "",
  seenAudioPopup: false,
  audioEnabled: false,
  miniGameIntroDay: 0
};

export function useLocalStorageState(key: keyof typeof LocalStorageKeyAndDefaultValue) {
  const [value, set] = useLocalStorage(key, LocalStorageKeyAndDefaultValue[key]);

  return [value, set] as const;
}
