"use client";

import Home from "@/components";
import WebGl from "@/webgl";
import { useEffect } from "react";

const _ = () => {
  useEffect(() => {
    new WebGl();
  }, []);

  return <Home />;
};

export default _;
