import { cn } from "@/utils";

interface Props {
  width: number;
  height: number;
  className?: string;
}

const _ = ({ width, height, className }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 2.5H3C2.17157 2.5 1.5 3.17157 1.5 4V12C1.5 12.8284 2.17157 13.5 3 13.5H13C13.8284 13.5 14.5 12.8284 14.5 12V4C14.5 3.17157 13.8284 2.5 13 2.5ZM3 1C1.34315 1 0 2.34315 0 4V12C0 13.6569 1.34315 15 3 15H13C14.6569 15 16 13.6569 16 12V4C16 2.34315 14.6569 1 13 1H3Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.43056 4.51191C3.70012 4.19741 4.1736 4.16099 4.48809 4.43056L7.98809 7.43056C8.15433 7.57304 8.25 7.78106 8.25 8C8.25 8.21894 8.15433 8.42696 7.98809 8.56944L4.48809 11.5694C4.1736 11.839 3.70012 11.8026 3.43056 11.4881C3.16099 11.1736 3.19741 10.7001 3.51191 10.4306L6.34756 8L3.51191 5.56944C3.19741 5.29988 3.16099 4.8264 3.43056 4.51191Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 10.75C8 10.3358 8.33579 10 8.75 10H12.25C12.6642 10 13 10.3358 13 10.75C13 11.1642 12.6642 11.5 12.25 11.5H8.75C8.33579 11.5 8 11.1642 8 10.75Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default _;
