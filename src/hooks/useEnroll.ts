import { useState } from "react";

export function useEnroll(courseId: string) {
  const [enrolled, setEnrolled] = useState(
    localStorage.getItem(`enrolled-${courseId}`) === "true"
  );

  function enroll() {
    localStorage.setItem(`enrolled-${courseId}`, "true");
    setEnrolled(true);
  }

  return { enrolled, enroll };
}
