/* eslint-disable @next/next/no-img-element */
import { projects } from "@/store";

const _ = () => {
  return (
    <div className="grid grid-cols-9 items-end gap-16 px-[10vw] pt-[10vh] pb-[5vh] w-full h-[100dvh]">
      {projects.map((p, i) => (
        <figure key={i} data-quad={i}>
          <img src={p.preview} alt={p.name} />
        </figure>
      ))}
      <h2 className="col-span-3 overflow-visible">Off brand</h2>
      <div className="col-span-1 whitespace-nowrap overflow-visible">(zero → one)</div>
      <div className="col-span-3 overflow-visible">Creative product studio</div>
      <div className="col-span-3 overflow-visible">New York</div>
      <div className="col-start-7 col-span-3 overflow-visible">
        An experimental practice of creating unique outputs across virtual & physical mediums
      </div>
    </div>
  );
};

export default _;
