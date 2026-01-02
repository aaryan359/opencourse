import { useParams } from "react-router-dom";

import CourseList from "../../components/course/CourseList";
import { mockContent } from "../../utils/mockContent";

export default function CoursesPage() {
  const { type, id } = useParams();

  if (!type || !id) return null;

  const domains =
    type === "tech" ? mockContent.tech : mockContent.nonTech;

  const selectedDomain = domains.find((d) => d.id === id);

  if (!selectedDomain) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Domain not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black px-8 py-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-semibold text-white">
          {selectedDomain.title}
        </h1>
        <p className="mt-2 text-neutral-400">
          Choose a course to start learning
        </p>
      </div>

      {/* Courses */}
      <CourseList domains={[selectedDomain]} type={type} />
    </main>
  );
}
