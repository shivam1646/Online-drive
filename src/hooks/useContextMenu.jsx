import { useState, useEffect } from "react";

function useContextMenu() {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleClick = () => setShowContextMenu(false);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return {
    showContextMenu,
    setShowContextMenu,
    points,
    setPoints,
  };
}

export default useContextMenu;
