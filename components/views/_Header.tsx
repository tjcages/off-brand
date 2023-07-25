import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import styles from "@/styles/header.module.scss";
import { useSnapshot } from "valtio";
import { state } from "@/store";
import { partners } from "@/data";
import { useMedia, mobileBreakpoint } from "@/utils";

const _ = () => {
  const snap = useSnapshot(state);
  const mobile = useMedia(mobileBreakpoint);
  return (
    <header className={clsx(styles.main, snap.loaded && styles.visible)}>
      {!mobile && (
        <div className={styles.logo}>
          <Image src="/imgs/icons/logo.png" alt="logo" width={32} height={32} />
        </div>
      )}
      <div className={clsx(styles.v, styles.spaced)}>
        <h5>"Collective"</h5>
        <div className={styles.h}>
          <h5
            className={clsx(snap.view == "grid" && styles.selected)}
            onClick={() => (state.view = "grid")}
            style={{
              pointerEvents: "none",
              cursor: "not-allowed !important",
              textDecoration: "line-through",
            }}
          >
            Grid
          </h5>
          <h5>/</h5>
          <h5
            className={clsx(snap.view == "linear" && styles.selected)}
            onClick={() => (state.view = "linear")}
          >
            Linear
          </h5>
        </div>
      </div>

      <div
        className={clsx(styles.v, styles.spaced)}
        onMouseEnter={() => {
          document.body.style.cursor = "crosshair";
          state.hover = "ethos";
        }}
        onMouseLeave={() => {
          document.body.style.cursor = "grab";
          state.hover = null;
        }}
      >
        <h5
          className={clsx(
            styles.title,
            snap.hover == "ethos" && styles.hovered
          )}
        >
          "Ethos & Work"
        </h5>
        <div className={styles.v}>
          <h5>Product Marketing</h5>
          <h5>Brand Positioning</h5>
          <h5>Creative Engineering</h5>
        </div>
      </div>

      <div
        className={clsx(styles.v, styles.spaced)}
        onMouseEnter={() => {
          document.body.style.cursor = "crosshair";
          state.hover = "partners";
        }}
        onMouseLeave={() => {
          document.body.style.cursor = "grab";
          state.hover = null;
        }}
      >
        <h5
          className={clsx(
            styles.title,
            snap.hover == "partners" && styles.hovered
          )}
        >
          "Partners"
        </h5>
        <div className={styles.v}>
          <h5>(00{partners.length})</h5>
        </div>
      </div>

      <div
        className={clsx(styles.v, styles.spaced, styles.end)}
        onMouseEnter={() => {
          document.body.style.cursor = "crosshair";
          state.hover = "inquire";
        }}
        onMouseLeave={() => {
          document.body.style.cursor = "grab";
          state.hover = null;
        }}
      >
        <h5
          className={clsx(
            styles.title,
            snap.hover == "inquire" && styles.hovered
          )}
        >
          "Contact"
        </h5>
        <div className={styles.v}>
          <h5>Inquire</h5>
        </div>
      </div>
    </header>
  );
};

export default _;
