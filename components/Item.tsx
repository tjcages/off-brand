import { useState, useEffect } from "react";
import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
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
  const [showCode, setShow] = useState(false)

  useEffect(() => {
    const root = document.getElementById(id);
    if (root) root.style.setProperty("--customBackground", background);
    if (root) root.style.setProperty("--customColor", color);
  });
  
  return (
    <div id={id} className={styles.main}>
      <Scene>
        <BuyButton
          live={live}
          id={id}
          cta={cta}
          color={color}
          background={background}
        />
      </Scene>

      <div className={`${styles.info} ${style ? style.info : ""}`}>
        <div className={styles.titles}>
          <h5>{name}</h5>
          <strong>Item Description</strong>
        </div>

        <div className={styles.actions}>
          <Tooltip.Provider>
            <Tooltip.Root delayDuration={0}>
              <Tooltip.Trigger asChild>
                <button className={styles.icon}>
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
    </div>
  );
}

export default _;
