/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

const _ = () => {
  return (
    <section>
      <div className="flex flex-col gap-4 px-12 py-24">
        <Image src="/assets/awge-halftone-logo.png" alt="awge" width={500} height={100} />
        <div className="relative overflow-visible">
          <h1>
            <span className="text-6xl opacity-50">x </span>Off brand
          </h1>
          <Image
            className="absolute left-8 -top-2 w-72 h-auto"
            src="/assets/ob-signature.png"
            alt="signature"
            width={500}
            height={100}
          />
        </div>
      </div>
      <figure data-quad className="large">
        <img src="/assets/imgs/3.jpg" alt="" />
      </figure>
    </section>
  );
};

export default _;
