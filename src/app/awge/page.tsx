"use client";

import WebGl from "@/webgl";
import { useEffect } from "react";

import Home from "@/components/awge";

const _ = () => {
  useEffect(() => {
    new WebGl();
  }, []);

  return <Home />;
};

export default _;
