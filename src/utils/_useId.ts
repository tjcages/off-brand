"use client";

import _uniqueId from "lodash/uniqueId";
import { useMemo } from "react";

export const useId = () => {
  const id = useMemo(() => _uniqueId("id-"), []);
  return id;
};
