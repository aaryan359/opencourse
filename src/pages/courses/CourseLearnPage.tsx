import { useParams, Navigate } from "react-router-dom";

import CourseLearn from "../../components/course/CourseLearn";
import { mockContent } from "../../utils/mockContent";

export default function CourseLearnPage() {
  const { type, id } = useParams();

  if (!type || !id) return null;

  const domains =
    type === "tech" ? mockContent.tech : mockContent.nonTech;

  const course = domains.find((d) => d.id === id);

  // Optional guard: prevent direct access without enroll
  const enrolled =
    localStorage.getItem(`enrolled-${id}`) === "true";

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Course not found
      </div>
    );
  }

  if (!enrolled) {
    return <Navigate to={`/course/${type}/${id}`} replace />;
  }

  return <CourseLearn course={course} />;
}
