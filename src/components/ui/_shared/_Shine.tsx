"use client";

import React, { useEffect, useId, useRef } from "react";

interface Props {
  id?: string;
  children: React.ReactNode;
  lightColor?: `#${string}`;
  puffyness?: "0.5" | "0.75" | "1" | "1.25" | "1.5" | "1.75" | "2" | "3";
}

const _ = ({
  id,
  children,
  lightColor = "#666666",
  puffyness = "1",
  ...otherProps
}: Props & React.ComponentProps<"div">) => {
  const filterId = useId();
  const filterRef = useRef<SVGFilterElement>(null);
  const childrenWrapperRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const children = childrenWrapperRef.current;
    const filterElement = filterRef.current;
    const lightElement = filterElement?.querySelector("fePointLight");
    if (!filterElement || !children || !lightElement) return;

    const onPointerMove = (event: PointerEvent) => {
      const childrenBox = children.getBoundingClientRect();
      mouse.current = {
        x: event.pageX - window.scrollX,
        y: event.pageY - window.scrollY,
      };

      lightElement.setAttribute(
        "y",
        (mouse.current.y - childrenBox.top).toString()
      );
      lightElement.setAttribute(
        "x",
        (mouse.current.x - childrenBox.left).toString()
      );
    };

    const onScroll = () => {
      const childrenBox = children.getBoundingClientRect();
      lightElement.setAttribute(
        "y",
        (mouse.current.y - childrenBox.top).toString()
      );
      lightElement.setAttribute(
        "x",
        (mouse.current.x - childrenBox.left).toString()
      );
    };

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      id={id}
      style={{
        position: "relative",
        userSelect: "none",
        width: "inherit",
      }}
      {...otherProps}
    >
      <svg
        width="0"
        height="0"
        // This is crucial. Without these styles the effect breaks on some browsers
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <filter id={filterId} ref={filterRef} colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation={puffyness} />
          <feSpecularLighting
            result="light-source"
            // represents the height of the surface for a light filter primitive
            surfaceScale="10"
            // The bigger the value the bigger the reflection
            specularConstant="0.9"
            // controls the focus for the light source. The bigger the value the brighter the light
            specularExponent="120"
            lightingColor={lightColor}
          >
            <fePointLight x="60" y="69" z="300" />
          </feSpecularLighting>
          <feComposite
            result="reflections"
            in="light-source"
            in2="SourceAlpha"
            operator="in"
          />
          <feComposite
            in="SourceGraphic"
            in2="reflections"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
          />
        </filter>
      </svg>
      <div
        style={{
          filter: `url(#${filterId})`,
          isolation: "isolate",
          width: "inherit",
        }}
        ref={childrenWrapperRef}
      >
        {children}
      </div>
    </div>
  );
};

export default _;
