import { gsap } from "gsap";

const _ = () => {
  return (
    <>
      <div
        ref={(node) => {
          gsap.to(node, {
            x: 0,
            y: -10,
            duration: 0.5,
            delay: 2.5,
            ease: "expo.out",
            onComplete: () => {
              gsap.to(node, {
                y: -20,
                duration: 1,
                delay: 0.5,
                ease: "expo.in",
              });
              gsap.to(node, {
                x: 0,
                y: 0,
                top: -12,
                left: -12,
                duration: 1,
                delay: 1.5,
                ease: "expo.out",
              });
            },
          });
        }}
        className="absolute fs-5 leading-none"
      >
        +
      </div>
      <div
        ref={(node) => {
          gsap.to(node, {
            x: 10,
            y: 0,
            duration: 0.5,
            delay: 2.5,
            ease: "expo.out",
            onComplete: () => {
              gsap.to(node, {
                rotate: 90,
                duration: 1,
                delay: 0.5,
                ease: "expo.in",
              });
              gsap.to(node, {
                x: 0,
                y: 0,
                top: -12,
                right: -12,
                duration: 1,
                delay: 1.5,
                ease: "expo.out",
              });
            },
          });
        }}
        className="absolute fs-5 leading-none"
      >
        +
      </div>
      <div
        ref={(node) => {
          gsap.to(node, {
            x: -10,
            y: 0,
            duration: 0.5,
            delay: 2.5,
            ease: "expo.out",
            onComplete: () => {
              gsap.to(node, {
                rotate: -90,
                duration: 1,
                delay: 0.5,
                ease: "expo.in",
              });
              gsap.to(node, {
                x: 0,
                y: 0,
                bottom: -12,
                left: -12,
                duration: 1,
                delay: 1.5,
                ease: "expo.out",
              });
            },
          });
        }}
        className="absolute fs-5 leading-none"
      >
        +
      </div>
      <div
        ref={(node) => {
          gsap.to(node, {
            x: 0,
            y: 10,
            duration: 0.5,
            delay: 2.5,
            ease: "expo.out",
            onComplete: () => {
              gsap.to(node, {
                y: 20,
                duration: 1,
                delay: 0.5,
                ease: "expo.in",
              });
              gsap.to(node, {
                x: 0,
                y: 0,
                bottom: -12,
                right: -12,
                duration: 1,
                delay: 1.5,
                ease: "expo.out",
              });
            },
          });
        }}
        className="absolute fs-5 leading-none"
      >
        +
      </div>
    </>
  );
};

export default _;
