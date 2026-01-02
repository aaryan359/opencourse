import { useParams } from "react-router-dom";

import CourseDetail from "../../components/course/CourseDetail";
import { mockContent } from "../../utils/mockContent";

export default function CourseDetailPage() {
  const { type, id } = useParams();

  if (!type || !id) return null;

  const domains =
    type === "tech" ? mockContent.tech : mockContent.nonTech;

  const course = domains.find((d) => d.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Course not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black px-8 py-20">
      <CourseDetail course={course} type={type} />
    </main>
  );
}
