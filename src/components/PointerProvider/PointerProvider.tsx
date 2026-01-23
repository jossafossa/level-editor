import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import { PointerContext } from "./PointerContext";
import styles from "./PointerProvider.module.scss";

export const PointerProvider = ({ children }: PropsWithChildren) => {
  const [isPointerDown, setIsPointerDown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const context = {
    isPointerDown,
  };

  useEffect(() => {
    const handlePointerDown = () => {
      console.log("pointer down");
      setIsPointerDown(true);
    };

    const handlePointerUp = () => {
      setIsPointerDown(false);
    };

    const current = ref.current;

    if (current) {
      current.addEventListener("pointerdown", handlePointerDown);
      current.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      if (!current) return;

      current.removeEventListener("pointerdown", handlePointerDown);
      current.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  return (
    <PointerContext.Provider value={context}>
      <div ref={ref} className={styles.pointerProvider}>
        {children}
      </div>
    </PointerContext.Provider>
  );
};
