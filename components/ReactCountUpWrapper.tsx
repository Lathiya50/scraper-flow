"use client";
import React, { useEffect } from "react";
import CountUp from "react-countup";

function ReactCountUpWrapper({ value }: { value: number }) {
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return "-";
  }
  return <CountUp duration={0.5} preserveValue end={value} decimals={0} />;
}

export default ReactCountUpWrapper;
