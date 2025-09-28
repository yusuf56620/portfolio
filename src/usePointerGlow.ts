import { useEffect } from "react";

export const usePointerGlow = () => {
  useEffect(() => {
    const handlePointer = (e: PointerEvent) => {
      document.documentElement.style.setProperty("--mouse-x", e.clientX + "px");
      document.documentElement.style.setProperty("--mouse-y", e.clientY + "px");
    };

    window.addEventListener("pointermove", handlePointer);
    return () => window.removeEventListener("pointermove", handlePointer);
  }, []);
};
