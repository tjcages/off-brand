/* eslint-disable @next/next/no-img-element */
const _ = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-end justify-end w-full px-[7vw] pt-[2vh]">
        <h2>User-centric (digital & physical) products to better monetize superfans</h2>
        <a
          className="text-4xl opacity-50"
          href="https://hiphopdx.com/news/lil-uzi-soundcloud-revenue-minority-superfans"
          target="_blank"
          rel="noreferrer"
        >
          7% of fans generate over 70% of revenue →
        </a>
      </div>
      <section>
        <figure data-quad className="mid">
          <img src="/assets/imgs/2.png" alt="" />
        </figure>
        <figure data-quad className="small">
          <img src="/assets/imgs/3.png" alt="" />
        </figure>
        <figure data-quad className="small">
          <img src="/assets/imgs/4.png" alt="" />
        </figure>
        <figure data-quad className="small">
          <img src="/assets/imgs/5.png" alt="" />
        </figure>
      </section>
    </div>
  );
};

export default _;
