import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useSnapshot } from "valtio";
import SplitType from "split-type";
import gsap from "gsap";

import styles from "@/styles/underlay.module.scss";
import { state } from "@/store";

const _ = () => {
  const snap = useSnapshot(state);
  const [count, set] = useState(100);
  const [ready, setReady] = useState(false);

  const ref = useRef() as React.MutableRefObject<HTMLHeadingElement>;

  useEffect(() => {
    var count = 100;
    var speed = 1000;

    function timer() {
      count--;

      set(count);

      if (count <= 1) {
        state.loaded = true;

        setTimeout(() => {
          setReady(true);
        }, 490);
        return;
      }

      speed = (speed / 6) * 3;
      setTimeout(timer, speed);
    }

    setTimeout(() => {
      timer();
    }, 300);

    // animate word
    const text = new SplitType("#header", { types: "chars" });
    gsap.set(text.chars, { y: "110%", filter: "blur(5px)" });

    gsap.to(text.chars, {
      y: "0%",
      filter: "blur(0px)",
      duration: 2,
      stagger: 0.025,
      delay: 2,
      ease: "expo.out",
    });

    const about = new SplitType("#about", { types: "words" });
    gsap.set(about.words, { y: "110%", filter: "blur(5px)" });

    gsap.to(about.words, {
      y: "0%",
      filter: "blur(0px)",
      duration: 2,
      stagger: 0.1,
      delay: 2,
      ease: "expo.out",
    });
  }, []);

  return (
    <section className={clsx(styles.main, snap.loaded && styles.visible)}>
      <div className={styles.container}>
        <h1
          id="header"
          style={{
            visibility:
              snap.view == "linear" && snap.selected ? "hidden" : "visible",
          }}
        >
          Off–Brand
        </h1>
        <div className={styles.animation}>
          <h4 ref={ref} className={styles.one}>
            [{count.toString().padStart(3, "0")}]
          </h4>
          {ready && (
            <Image
              priority
              className={styles.arrow}
              src="/imgs/icons/arrow.png"
              alt="arrow"
              width={64}
              height={64}
            />
          )}
        </div>
        <h4 id="about" className={styles.about}>
          Creative Studio, New York City
        </h4>
      </div>
    </section>
  );
};

export default _;
