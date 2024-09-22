import { useEffect, useRef, MutableRefObject } from "react";

// ==============================|| ELEMENT REFERENCE HOOKS - TYPESCRIPT ||============================== //

export default function useScriptRef(): MutableRefObject<boolean> {
  const scripted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      scripted.current = false;
    };
  }, []);

  return scripted;
}
