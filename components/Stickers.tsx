import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationControls,
} from "framer-motion";
import styles from "@/styles/stickers.module.scss";

const translate = [
  "translate(-50%, -15%) rotate(10deg)",
  "translate(-35%, -5%) rotate(-30deg)",
  "translate(-80%, 5%) rotate(40deg)",
];

const translateHover = [
  "translate(-50%, -50%) rotate(0deg)",
  "translate(-25%, -25%) rotate(-25deg)",
  "translate(-95%, -25%) rotate(35deg)",
];

const _ = () => {
  const [width, setWidth] = useState(0);
  const [hover, hovering] = useState<boolean | null>(null);

  const controls = useAnimationControls();

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onRoute = useCallback(
    () => async () => {
      if (hover === null) {
        controls.set("hidden");
        await controls.start("enter");
        return;
      } else if (hover) {
        controls.set("enter");
        await controls.start("hover");
        return;
      }
      controls.set("enter");
      await controls.start("enter");
    },
    [controls, hover]
  );

  useEffect(() => {
    controls.set("hidden");
    onRoute()();
  }, [onRoute]);

  var size = width ? width * 0.2 : 300;
  if (size > 350) size = 350;

  return (
    <div className={styles.main}>
      <div
        className={styles.container}
        style={{ maxWidth: width }}
        onMouseEnter={() => hovering(true)}
        onMouseLeave={() => hovering(false)}
      >
        {[0, 1, 2].map((i) => {
          const x = useMotionValue(0);
          const y = useMotionValue(0);
          const rotate = useTransform(x, [-150, 150], [-40, 40]);
          return (
            <motion.div
              className={styles.sticker}
              animate={controls}
              variants={{
                hidden: {
                  opacity: 0,
                  transform: "translate(-50%, 50%) rotate(90deg)",
                },
                enter: { opacity: 1, transform: translate[i] },
                hover: { opacity: 1, transform: translateHover[i] },
              }}
              transition={{
                type: "spring",
                damping: 10,
                stiffness: 200,
                restDelta: 0.001,
                delay: hover ? 0 : 1,
                opacity: { duration: 0.1, delay: 1 },
              }}
            >
              <motion.img
                // src={`/stickers/${i}.png`}
                src="/stickers/1.png"
                alt="Sticker"
                width={size}
                height={size}
                style={{ x, y, rotate }}
                drag={true}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                whileTap={{ cursor: "grabbing" }}
              />
            </motion.div>
          );
        })}
      </div>
      <div className={styles.light} />
    </div>
  );
};

export default _;
