import { useEffect, useState, type JSX } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export function MouseSpotlight(): JSX.Element {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);
  
  return (
    <div 
      className="pointer-events-none fixed w-[ h-100 rounded-full bg-linear-to-r from-[#5E6AD2]/10 to-purple-500/8 blur-[80px] transition-opacity duration-300 z-0"
      style={{
        left: `${mousePosition.x - 200}px`,
        top: `${mousePosition.y - 200}px`,
        opacity: mousePosition.x ? 0.1 : 0
      }}
    />
  );
}