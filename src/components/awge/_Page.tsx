"use client";

import Overlay from "./_Overlay";
import { About, Collectibles, Custom, Intro } from "./_sections";

const _ = () => {
  return (
    <main>
      {/* <!-- UI --> */}
      <div className="ui">
        <button data-ui="grid">
          <div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
        </button>
      </div>

      {/* <!-- Grid --> */}
      <div className="relative z-10">
        <section className="grid-w">
          <div>
            <div></div>
            <div data-quad-grid></div>
            <div></div>
            <div data-quad-grid></div>
            <div data-quad-grid></div>
            <div data-quad-grid></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
            <div data-quad-grid></div>
            <div data-quad-grid></div>
            <div data-quad-grid></div>
            <div></div>
            <div></div>
            <div data-quad-grid></div>
          </div>
          <div>
            <div></div>
            <div data-quad-grid></div>
            <div></div>
            <div data-quad-grid></div>
            <div data-quad-grid></div>
            <div></div>
            <div data-quad-grid></div>
            <div data-quad-grid></div>
          </div>
          <div>
            <div></div>
            <div data-quad-grid></div>
            <div></div>
            <div data-quad-grid></div>
            <div data-quad-grid></div>
            <div data-quad-grid></div>
            <div></div>
          </div>
        </section>
      </div>

      <div className="relative z-10" data-scroll>
        {/* <!-- Scroller --> */}
        <Intro />
        <About />
        <Collectibles />
        <Custom />

        <section>
          <figure data-quad className="ho">
            <img src="/assets/imgs/8.png" alt="" />
          </figure>
        </section>
        <section>
          <figure data-quad className="mid">
            <img src="/assets/imgs/1.png" alt="" />
          </figure>
          <figure data-quad className="large">
            <img src="/assets/imgs/2.png" alt="" />
          </figure>
          <figure data-quad className="small overlay-s">
            <img src="/assets/imgs/3.png" alt="" />
          </figure>
        </section>
        <section>
          <figure data-quad className="small">
            <img src="/assets/imgs/11.png" alt="" />
          </figure>
        </section>
      </div>

      <canvas id="c"></canvas>

      <Overlay />
    </main>
  );
};

export default _;
