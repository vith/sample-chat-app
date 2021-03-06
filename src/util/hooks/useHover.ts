import { MutableRefObject, useEffect, useRef, useState } from "react";

// from https://usehooks.com/useHover/

// // Usage
// function App() {
//   const [hoverRef, isHovered] = useHover();

//   return <div ref={hoverRef}>{isHovered ? "😁" : "☹️"}</div>;
// }

// Hook
export function useHover<T>(): [MutableRefObject<T>, boolean] {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);

        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );

  return [ref, value];
}
