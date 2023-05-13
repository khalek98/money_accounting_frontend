import { useWindowSize } from "@/utils/useWindowSize";
import React, { useEffect, useRef, useState } from "react";

import styles from "./Orb.module.scss";

const Orb = () => {
  const orbRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();
  const [animation, setAnimation] = useState<string | null>(null);

  useEffect(() => {
    const moveOrb = `
    @keyframes moveOrb {
      0% {
        transform: translate(0, 0);
      }
      50% {
        transform: translate(${width}px, ${height / 2}px);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    `;

    setAnimation(moveOrb);
  }, [width, height]);

  const orbStyle = {
    animation: "moveOrb 8s alternate linear infinite",
  };

  return (
    <>
      <style>{animation}</style>
      <div ref={orbRef} className={styles.Orb} style={orbStyle}></div>
    </>
  );
};

export default Orb;
