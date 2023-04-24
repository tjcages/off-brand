import { useRef, useState, useEffect } from "react";
import { useParentSize } from "@/modules/useParentSize";
import styles from "./style.module.scss";

interface Props {
  children: React.ReactNode;
}

const _ = ({ children }: Props) => {
  // const dvd = useRef() as React.MutableRefObject<HTMLDivElement>;
  // const [ref, size] = useParentSize() as [
  //   any,
  //   { width: number; height: number }
  // ];
  // const [rotate, setRotate] = useState("");
  // let hspeed = 1;
  // let vspeed = 1;
  // let width = size.width - 288;
  // let height = size.height - 48 - 80;

  // useEffect(() => {
  //   console.log("called");
  //   setInterval(() => {
  //     bounce();
  //   }, 15);
  // }, []);

  // function huerotate() {
  //   setRotate(`filter: hue-rotate(${Math.floor(Math.random() * 360)}deg);`);
  // }

  // function bounce() {
  //   if (dvd.current) {
  //     dvd.current.setAttribute(
  //       "style",
  //       `${rotate} left: ${dvd.current.offsetLeft + hspeed}px; top: ${
  //         dvd.current.offsetTop + vspeed
  //       }px;`
  //     );

  //     if (dvd.current.offsetLeft >= width || dvd.current.offsetLeft <= 0) {
  //       hspeed *= -1;
  //       huerotate();
  //     }
  //     if (dvd.current.offsetTop >= height || dvd.current.offsetTop <= 0) {
  //       vspeed *= -1;
  //       huerotate();
  //     }
  //   }
  // }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.button} style={{ position: "relative" }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default _;
