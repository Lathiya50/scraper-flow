"use client";
import { ParamProps } from "@/types/appNode";
import React from "react";

function BrowserInstanceParam({ param }: ParamProps) {
  return <p className="text-xs">{param.name}</p>;
}

export default BrowserInstanceParam;
