import { useEffect, useState } from "react";

interface IUseWindowSize {
  width: number;
  height: number;
}

export const useWindowSize = (): IUseWindowSize => {
  const [size, setSize] = useState<number[]>([0, 0]);

  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    updateSize();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateSize);

      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

  return {
    width: size[0],
    height: size[1],
  };
};
