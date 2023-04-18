import { useState, useEffect } from "react";
import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
import SyntaxHighlighter from "react-syntax-highlighter";

import styles from "@/styles/item.module.scss";
import { Props } from "@/data";

import BuyButton from "@/components/BuyButton";

function _({
  live = false,
  id,
  name,
  cta,
  Scene,
  background,
  color,
  style,
}: Props) {
  const [showCode, setShow] = useState(false);
  const [index, setIndex] = useState(true);

  const defaultCode = `import React from "react"
  
<script async
  src="https://js.stripe.com/v3/buy-button.js">
</script>

<stripe-buy-button
  buy-button-id="buy_btn_1Mxu3xJWmqHDfKfmbBnARbSX"
  publishable-key="pk_live_5LIeQrBieZ0peepk98EKkdWp007ZEzqjCO"
>
</stripe-buy-button>`;

  useEffect(() => {
    const root = document.getElementById(id);
    if (root) root.style.setProperty("--customBackground", background);
    if (root) root.style.setProperty("--customColor", color);
  }, [id, background, color]);

  return (
    <div id={id} className={styles.main}>
      <div>
        <Scene>
          <BuyButton
            live={live}
            id={id}
            cta={cta}
            color={color}
            background={background}
          />
        </Scene>
      </div>

      <div className={`${styles.info} ${style ? style.info : ""}`}>
        <div className={styles.titles}>
          <h5>{name}</h5>
          <strong>Item Description</strong>
        </div>

        <div className={styles.actions}>
          <Tooltip.Provider>
            <Tooltip.Root delayDuration={0}>
              <Tooltip.Trigger asChild>
                <button
                  className={styles.icon}
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

          <Tooltip.Provider>
            <Tooltip.Root delayDuration={0}>
              <Tooltip.Trigger asChild>
                <div className={styles.icon}>
                  <Image
                    src={"/icons/copy.svg"}
                    alt="copy icon"
                    width={12}
                    height={12}
                  />
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="TooltipContent" data-side="bottom">
                  Copy code
                  <Tooltip.Arrow className="TooltipArrow" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      </div>

      <div
        className={`${styles.codeSnippet} ${showCode ? styles.visible : ""}`}
      >
        <div className={styles.overlay} />
        <div className={styles.sheet} />
        <div className={styles.codeBlock}>
          <div className={styles.title}>
            <strong>Code Snippet</strong>
            <div className={styles.pages}>
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
                <strong>index.js</strong>
              </button>
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
              <div className={styles.page} />
            </div>
          </div>
          <div className={styles.code}>
            <SyntaxHighlighter
              language="javascript"
              useInlineStyles={false}
              showLineNumbers
            >
              {defaultCode}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}

export default _;
