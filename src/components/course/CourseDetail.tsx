import { useEnroll } from "../../hooks/useEnroll";
import { useNavigate } from "react-router-dom";

export default function CourseDetail({ course, type }: any) {
  const { enrolled, enroll } = useEnroll(course.id);
  const navigate = useNavigate();

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <div>
        <h1 className="text-4xl font-semibold text-white">{course.title}</h1>

        <div className="mt-8 space-y-6">
          {course.subtopics.map((s: any) => (
            <div key={s.id}>
              <h3 className="text-white">{s.title}</h3>
              <ul className="text-sm text-neutral-400">
                {s.miniTopics.map((m: any) => (
                  <li key={m.id}>• {m.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <aside className="rounded-xl border border-white/10 bg-white/5 p-6">
        <p className="text-3xl text-white">₹0</p>

        {!enrolled ? (
          <button
            onClick={enroll}
            className="mt-6 w-full rounded-lg bg-indigo-600 py-2 text-white"
          >
            Enroll Now
          </button>
        ) : (
          <button
            onClick={() => navigate(`/learn/${type}/${course.id}`)}
            className="mt-6 w-full rounded-lg bg-emerald-600 py-2 text-white"
          >
            Start Learning
          </button>
        )}
      </aside>
    </div>
  );
}
