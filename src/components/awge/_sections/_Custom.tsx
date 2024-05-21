/* eslint-disable @next/next/no-img-element */
const _ = () => {
  return (
    <section>
      <figure data-quad className="mid">
        <video
          crossOrigin="anonymous"
          playsInline={true}
          autoPlay={true}
          loop={true}
          muted={true}
          src="https://assets.website-files.com/6176c3b63b320c8e291dda54/630617294dc69423131d7a61_b2efca96-9d60-47b4-bdaf-60a0655210ff%20(1)-transcode.mp4"
          width="100%"
        ></video>
        {/* <img src="/assets/actual/digital.png" alt="" /> */}
      </figure>
      <figure data-quad className="small overlay">
        <img src="/assets/actual/physical.png" alt="" />
      </figure>

      <div className="flex flex-col items-start justify-start w-full px-[10vw]">
        <h2>Digital experiences attached to physical memorabilia</h2>
        <a
          className="text-4xl opacity-50"
          href="https://hiphopdx.com/news/lil-uzi-soundcloud-revenue-minority-superfans"
          target="_blank"
          rel="noreferrer"
        >
          Simple to launch, visually attractive, culturally relevant →
        </a>
      </div>
    </section>
  );
};

export default _;
