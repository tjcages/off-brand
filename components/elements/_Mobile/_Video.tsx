import { useRef, useEffect } from "react";

interface Props {
  id: string;
  src: string;
  fallback: string;
  selected: boolean;
}

const _ = ({ id, src, fallback, selected }: Props) => {
  const ref = useRef() as React.RefObject<HTMLVideoElement>;
  useEffect(() => {
    if (!ref.current) return;
    if (selected) ref.current.play();
    else ref.current.pause();
  }, [selected]);

  return (
    <video ref={ref} id={id} loop muted playsInline autoPlay>
      <source src={src} type="video/mp4" />
      <img src={fallback} alt="video preview" width={1000} height={1000} />
    </video>
  );
};

export default _;
