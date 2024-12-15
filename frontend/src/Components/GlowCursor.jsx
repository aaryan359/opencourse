import React, { useEffect } from "react";

const GlowCursor = ({ children }) => {
  useEffect(() => {
    // Create the glowing element dynamically
    const glowElement = document.createElement("div");
    glowElement.classList.add(
      "absolute",
      "pointer-events-none",
      "rounded-full",
      "bg-[radial-gradient(circle,rgba(26,61,119,0.736),transparent_60%)]",
      "transform",
      "-translate-x-1/2",
      "-translate-y-1/2",
      "z-[1]"
    );
    glowElement.style.width = "300px";
    glowElement.style.height = "300px";

    const parentElement = document.querySelector(".glow-container");
    parentElement.appendChild(glowElement);

    // Update position based on cursor movement
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const rect = parentElement.getBoundingClientRect();
      const x = clientX - rect.left; // Relative to parent
      const y = clientY - rect.top;  // Relative to parent

      glowElement.style.left = `${x}px`;
      glowElement.style.top = `${y}px`;
    };

    parentElement.addEventListener("mousemove", handleMouseMove);

    // Cleanup on component unmount
    return () => {
      parentElement.removeEventListener("mousemove", handleMouseMove);
      parentElement.removeChild(glowElement);
    };
  }, []);

  return <div className="relative glow-container w-full h-full">{children}</div>;
};

export default GlowCursor;
