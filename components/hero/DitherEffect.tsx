"use client";

import { useMemo } from "react";
import { DitherEffectImpl } from "@/lib/effects/DitherEffect";
import { BlendFunction } from "postprocessing";

export function DitherEffect({
  gridSize = 4,
  colorNum = 4,
  pixelSize = 2,
  blendFunction = BlendFunction.NORMAL,
}: {
  gridSize?: number;
  colorNum?: number;
  pixelSize?: number;
  blendFunction?: BlendFunction;
}) {
  const effect = useMemo(
    () =>
      new DitherEffectImpl({
        gridSize,
        colorNum,
        pixelSize,
        blendFunction,
      }),
    [gridSize, colorNum, pixelSize, blendFunction]
  );

  return <primitive object={effect} />;
}
