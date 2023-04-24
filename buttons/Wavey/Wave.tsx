import { useRef, useEffect } from "react";
import { useMedia, mobileBreakpoint } from "@/modules/useMedia";
import styles from "./style.module.scss";

const _: React.FC = () => {
  const mobile = useMedia(mobileBreakpoint);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const copiesRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const center = useRef({ x: 0, y: 0 });
  const distanceFromCenter = useRef({ x: 0, y: 0 });
  const distanceLerped = useRef({ x: 0, y: 0 });
  let simulateMouseMovement = useRef(true);
  const perspective = 500;
  const translateZ = -12;
  const rotate = 3;
  const skew = 3;

  const updateCenter = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      center.current.x = rect.left + rect.width / 2;
      center.current.y = rect.top + rect.height / 2;
    }
  };

  const trackMousePosition = (event: MouseEvent) => {
    simulateMouseMovement.current = false;
    mouse.current.x = event.clientX;
    mouse.current.y = event.clientY;
    distanceFromCenter.current.x = center.current.x - mouse.current.x;
    distanceFromCenter.current.y = center.current.y - mouse.current.y;
  };

  const fakeMousePosition = (t: number) => {
    distanceFromCenter.current.x =
      Math.sin(t / 500) * window.innerWidth * (mobile ? 2.0 : 0.5);
    distanceFromCenter.current.y =
      Math.cos(t / 500) * window.innerWidth * (mobile ? 2.0 : 0.2);
  };

  const updateTextPosition = (t: number) => {
    if (simulateMouseMovement.current || mobile) fakeMousePosition(t);

    lerpV2(distanceLerped.current, distanceFromCenter.current);

    if (copiesRef.current) {
      for (let i = 1; i < copiesRef.current.length + 1; i++) {
        const copy = copiesRef.current[i - 1];
        if (copy) {
          copy.style.transform = makeTransformString(
            i * distanceLerped.current.y * 0.03,
            i * translateZ,
            i * rotate * (distanceLerped.current.x * 0.003),
            i * skew * (distanceLerped.current.x * 0.003)
          );
        }
      }
    }

    requestAnimationFrame(updateTextPosition);
  };

  const makeTransformString = (
    y: number,
    z: number,
    rotate: number,
    skew: number
  ) => {
    return `perspective(${perspective}px) translate3d(0px, ${y}px, ${z}px) rotate(${rotate}deg) skew(${skew}deg)`;
  };

  const lerpV2 = (
    position: { x: number; y: number },
    targetPosition: { x: number; y: number }
  ) => {
    position.x += (targetPosition.x - position.x) * 0.2;
    position.y += (targetPosition.y - position.y) * 0.2;
  };

  useEffect(() => {
    copiesRef.current = document.querySelectorAll("#wavey-copy");
    updateCenter();
    document.addEventListener("mousemove", trackMousePosition);
    window.addEventListener("resize", updateCenter);
    requestAnimationFrame(updateTextPosition);

    return () => {
      document.removeEventListener("mousemove", trackMousePosition);
      window.removeEventListener("resize", updateCenter);
    };
  }, [mobile]);

  const copies = ["", "", "", ""];

  return (
    <div
      id="container"
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {/* Render your content here */}
      {copies.map((copy, index) => (
        <div id="wavey-copy" key={`${index}-wavey`} className={styles.copy} />
      ))}
    </div>
  );
};

export default _;
