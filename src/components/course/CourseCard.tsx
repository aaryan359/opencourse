import { useNavigate } from "react-router-dom";

export default function CourseCard({ course, href }: any) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(href)}
      className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-6 hover:border-white/20"
    >
      <h3 className="text-lg font-medium text-white">{course.title}</h3>

      <p className="mt-2 text-sm text-neutral-400">
        {course.subtopics.length} modules
      </p>
    </div>
  );
}
