import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
import styles from "@/styles/item.module.scss";

import BuyButton from "@/components/BuyButton";

function _() {
  return (
    <div className={styles.main}>
      <BuyButton />
      <div className={styles.info}>
        <div className={styles.titles}>
          <h5>Button Name</h5>
          <strong>Item Description</strong>
        </div>

        <div className={styles.actions}>
          <Tooltip.Provider>
            <Tooltip.Root delayDuration={0}>
              <Tooltip.Trigger asChild>
                <div className={styles.icon}>
                  <Image
                    src={"/icons/code.svg"}
                    alt="codce icon"
                    width={16}
                    height={16}
                  />
                </div>
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
