"use client";

import { projects } from "@/store";

import { Intro } from "./_sections";

const _ = () => {
  return (
    <main>
      <div className="absolute left-0 right-0 top-0 bottom-0 z-10">
        <Intro />
      </div>
      <div data-scroll className="z-10 flex flex-col gap-14 p-4 grid-w">
        {projects.map((_, i) => (
          <div key={i} data-quad-grid className="w-[75px] h-[105px]" />
        ))}
      </div>
      <div className="absolute top-0 left-0 z-10">
        <button data-ui="grid">hello world</button>
      </div>
      <canvas id="c" />
      {/* <Overlay /> */}
    </main>
  );
};

export default _;
