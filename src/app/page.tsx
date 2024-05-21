"use client";

import WebGl from "@/webgl";
import { useEffect } from "react";

import Home from "@/components/home";

const _ = () => {
  useEffect(() => {
    new WebGl();
  }, []);

  return <Home />;
};

export default _;
