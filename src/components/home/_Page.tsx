"use client";

import { Intro } from "./_sections";

const _ = () => {
  return (
    <main className="bg-[#EFE6E1]">
      <div data-quad-grid />

      <div className="fixed left-0 top-0 right-0 bottom-0 z-10" data-scroll>
        <Intro />
      </div>

      <canvas id="c" />
    </main>
  );
};

export default _;
