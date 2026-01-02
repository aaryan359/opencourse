import { useState } from "react";
import VideoCard from "../video/VideoCard";

export default function CourseLearn({ course }: any) {
  const [active, setActive] = useState(
    course.subtopics[0].miniTopics[0]
  );

  return (
    <div className="flex min-h-screen bg-black">
      <aside className="w-72 border-r border-white/10 p-6">
        {course.subtopics.map((s: any) => (
          <div key={s.id}>
            <h4 className="text-white">{s.title}</h4>
            {s.miniTopics.map((m: any) => (
              <button
                key={m.id}
                onClick={() => setActive(m)}
                className="block text-sm text-neutral-400 hover:text-white"
              >
                {m.title}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <main className="flex-1 p-8 grid gap-6 md:grid-cols-3">
        {active.videos.map((v: any) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </main>
    </div>
  );
}
