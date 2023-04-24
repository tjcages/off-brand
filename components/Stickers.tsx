import { useEffect, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationControls,
} from "framer-motion";
import { useMedia, mobileBreakpoint } from "@/modules/useMedia";
import styles from "@/styles/stickers.module.scss";

const _ = () => {
  const mobile = useMedia(mobileBreakpoint);
  const [loaded, setLoaded] = useState(false);
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

  useEffect(() => {
    if (loaded) {
      controls.start("enter");
    }
  }, [loaded, onRoute]);

  const getSize = (factor: number, max: number) => {
    var size = width ? width * factor : max;
    if (size > max) return max;
    return size;
  };

  const images = [
    {
      src: "/stickers/stripe.png",
      size: getSize(mobile ? 0.35 : 0.3, 250),
      translate: `translate(-50%, ${mobile ? "50%" : "20%"}) rotate(${
        mobile ? "20deg" : "10deg"
      })`,
      translateHover: `translate(-50%, ${
        mobile ? "-20%" : "-50%"
      }) rotate(-10deg)`,
    },
    {
      src: "/stickers/buybuybuy.png",
      size: getSize(mobile ? 0.5 : 0.3, mobile ? 500 : 400),
      translate: `translate(-35%, ${mobile ? "145%" : "95%"}) rotate(${
        mobile ? "-40deg" : "-20deg"
      })`,
      translateHover: `translate(${mobile ? "-15%" : "5%"}, ${
        mobile ? "75%" : "15%"
      }) rotate(${mobile ? "-20deg" : "-10deg"})`,
    },
    {
      src: "/stickers/copypayste.png",
      size: getSize(mobile ? 0.5 : 0.3, mobile ? 500 : 400),
      translate: `translate(${mobile ? "-80%" : "-70%"}, ${
        mobile ? "155%" : "125%"
      }) rotate(40deg)`,
      translateHover: `translate(${mobile ? "-85%" : "-95%"}, ${
        mobile ? "95%" : "15%"
      }) rotate(${mobile ? "20deg" : "30deg"})`,
    },
  ];

  return (
    <div className={styles.main}>
      <div
        className={styles.container}
        onMouseEnter={() => hovering(true)}
        onMouseLeave={() => hovering(false)}
        onClick={() => {
          if (mobile) hovering(!hover);
        }}
      >
        {images.map((image) => {
          const x = useMotionValue(0);
          const y = useMotionValue(0);
          const rotate = useTransform(x, [-150, 150], [-40, 40]);
          return (
            <motion.div
              key={image.src}
              className={styles.sticker}
              animate={controls}
              variants={{
                hidden: {
                  opacity: 0,
                  transform: "translate(-50%, 450%) rotate(90deg)",
                },
                enter: { opacity: 1, transform: image.translate },
                hover: { opacity: 1, transform: image.translateHover },
              }}
              transition={{
                type: "spring",
                damping: 10,
                stiffness: 200,
                restDelta: 0.001,
                delay: hover ? 0 : 0.2,
                opacity: { duration: 0, delay: 0 },
              }}
            >
              <motion.img
                src={image.src}
                alt="Sticker"
                width={image.size}
                height={image.size}
                style={{ x, y, rotate }}
                drag={true}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                whileTap={{ cursor: "grabbing" }}
                onLoad={() => setLoaded(true)}
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
