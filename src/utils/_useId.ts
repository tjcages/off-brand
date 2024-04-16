"use client";

import { useEffect, useState } from "react";

import { randomId } from "./_string";

export const useId = () => {
  const [id, set] = useState<string>("id");

  useEffect(() => {
    set("id-" + randomId());
  }, []);

  return id;
};
