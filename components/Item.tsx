import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import SyntaxHighlighter from "react-syntax-highlighter";

import styles from "@/styles/item.module.scss";
import { Props } from "@/data";

import BuyButton from "@/components/BuyButton";

const cardVariants: Variants = {
  offscreen: {
    opacity: 1,
  },
  onscreen: {
    opacity: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

function _({
  live = false,
  id,
  name,
  description,
  cta,
  href,
  Scene,
  background,
  color,
  style,
  indexCode,
  styleCode,
}: Props) {
  const [showCode, setShow] = useState(false);
  const [index, setIndex] = useState(true);
  const [copied, setCopy] = useState(false);

  const defaultCode = index ? indexCode || "" : styleCode || "";

  useEffect(() => {
    const root = document.getElementById(id);
    if (root) root.style.setProperty("--customBackground", background);
    if (root) root.style.setProperty("--customColor", color);
  }, [id, background, color]);

  useEffect(() => {
    if (!showCode) {
      setIndex(true);
      setCopy(false);
    }
  }, [showCode]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(defaultCode);
    setCopy(true);
    setTimeout(() => setCopy(false), 1500);
  };

  return (
    <motion.div
      id={id}
      className={styles.main}
      initial="offscreen"
      whileInView="onscreen"
    >
      <motion.div className={styles.overlay} variants={cardVariants} />
      <div>
        <Scene>
          <BuyButton
            live={live}
            id={id}
            cta={cta}
            href={href}
            color={color}
            background={background}
          />
        </Scene>
      </div>

      <div className={`${styles.info} ${style ? style.info : ""}`}>
        <div className={styles.titles}>
          <h5>{name}</h5>
          {description && <strong>Item Description</strong>}
        </div>

        {/* Code button */}
        <Tooltip.Provider>
          <Tooltip.Root delayDuration={0}>
            <Tooltip.Trigger asChild>
              <button
                className={styles.icon}
                style={{ visibility: indexCode ? "visible" : "hidden" }}
                onClick={() => setShow(!showCode)}
              >
                <Image
                  src={"/icons/code.svg"}
                  alt="codce icon"
                  width={16}
                  height={16}
                />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="TooltipContent" data-side="bottom">
                Show code
                <Tooltip.Arrow className="TooltipArrow" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>

      {/* Code snippet */}
      <div
        className={`${styles.codeSnippet} ${showCode ? styles.visible : ""}`}
      >
        <div className={styles.sheet} />
        <div className={styles.codeBlock}>
          <div className={styles.title}>
            <strong>Code Snippet</strong>
            <div className={styles.pages}>
              {indexCode && (
                <button
                  className={`${styles.page} ${index ? styles.selected : ""}`}
                  onClick={() => setIndex(true)}
                >
                  <Image
                    src={"/icons/copy.svg"}
                    alt="copy icon"
                    width={12}
                    height={12}
                  />
                  <strong>index.html</strong>
                </button>
              )}
              {styleCode && (
                <button
                  className={`${styles.page} ${!index ? styles.selected : ""}`}
                  onClick={() => setIndex(false)}
                >
                  <Image
                    src={"/icons/copy.svg"}
                    alt="copy icon"
                    width={12}
                    height={12}
                  />
                  <strong>style.css</strong>
                </button>
              )}
              <div className={styles.page} />
            </div>
          </div>
          <div className={styles.code}>
            {showCode && (
              <SyntaxHighlighter
                language={index ? "html" : "css"}
                useInlineStyles={false}
                showLineNumbers
              >
                {defaultCode}
              </SyntaxHighlighter>
            )}
          </div>
        </div>

        {/* Copy button */}
        <button
          className={`${styles.copy} ${copied ? styles.copied : ""}`}
          onClick={() => copyToClipboard()}
        >
          {copied && (
            <Image
              src={"/icons/check.svg"}
              alt="check icon"
              width={12}
              height={12}
            />
          )}
          <h5>{copied ? "Copied" : "Copy"}</h5>
        </button>
      </div>
    </motion.div>
  );
}

export default _;
