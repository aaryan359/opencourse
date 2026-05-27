import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { coursesApi } from "../../api/courses.api";


const C = {
  bg: "#02020a",
  card: "rgba(255,255,255,0.025)",
  border: "rgba(255,255,255,0.07)",
  accent: "#5E6AD2",
  purple: "#8B5CF6",
  text: "#ededef",
  sub: "#6b7280",
  faint: "#4b5563",
  green: "#10b981",
  videoBg: "rgba(255,255,255,0.015)"
};



export default function CourseOverviewPage() {
  const { courseSlug } = useParams<{ courseSlug: string }>();

  const [course, setCourse] = useState<any>(null);
  const [topics, setTopics] = useState<any[]>([]);


  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const [topicVideos, setTopicVideos] = useState<Record<string, any[]>>({});
  const [loadingVideos, setLoadingVideos] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1. Fetch Course by Slug
  useEffect(() => {
    if (!courseSlug) return;
    setLoading(true);

    coursesApi.getCourseBySlug(courseSlug)
      .then(res => {
        const c = res.data?.data;
        if (!c) throw new Error("Course not found");
        setCourse(c);
        // 2. Fetch Topics for Course
        return coursesApi.listTopics(c._id);
      })
      .then(res => setTopics(res.data?.data || []))
      .catch(err => setError(err?.response?.data?.message || err.message || "Failed to load course"))
      .finally(() => setLoading(false));
  }, [courseSlug]);

  // Expand topic & load videos
  const toggleTopic = async (topicId: string) => {
    if (expandedTopic === topicId) {
      setExpandedTopic(null);
      return;
    }

    setExpandedTopic(topicId);

    // Load videos if not cached
    if (!topicVideos[topicId]) {
      setLoadingVideos(topicId);
      try {
        const res = await publicApi.listVideos(topicId);
        // Only keep approved videos for public view
        const approvedVideos = (res.data?.data || []).filter((v: any) => v.status === "approved");
        setTopicVideos(prev => ({ ...prev, [topicId]: approvedVideos }));
      } catch (err) {
        console.error("Failed to load videos for topic", err);
      } finally {
        setLoadingVideos(null);
      }
    }
  };

  if (loading) {
    return <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", color: C.sub }}>Loading course...</div>;
  }

  if (error || !course) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: C.text }}>
        <h2 style={{ fontSize: 24, marginBottom: 16 }}>{error || "Course Not Found"}</h2>
        <Link to="/courses" style={{ color: C.accent, textDecoration: "none", fontWeight: 600 }}>← Back to Catalog</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter',system-ui,sans-serif", paddingBottom: 100 }}>

      {/* ─── Hero Section ────────────────────────────────────────────────────── */}
      <div style={{ position: "relative", padding: "80px 24px", borderBottom: `1px solid ${C.border}`, overflow: "hidden" }}>
        {/* Background Blur */}
        <div style={{ position: "absolute", top: -100, left: "20%", width: 600, height: 600, background: `linear-gradient(135deg, ${C.accent}20, ${C.purple}20)`, filter: "blur(100px)", borderRadius: "50%", zIndex: 0, opacity: 0.6 }} />

        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1, display: "flex", gap: 40, flexWrap: "wrap", alignItems: "center" }}>

          <div style={{ flex: "1 1 500px" }}>
            <Link to="/courses" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.sub, textDecoration: "none", fontSize: 14, fontWeight: 500, marginBottom: 24, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = C.text} onMouseLeave={e => e.currentTarget.style.color = C.sub}>
              <span style={{ fontSize: 18 }}>←</span> Course Catalog
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ padding: "4px 12px", background: "rgba(255,255,255,0.05)", borderRadius: 30, fontSize: 12, fontWeight: 600, color: C.accent, border: `1px solid ${C.accent}40`, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {course.field?.name || "General"}
              </span>
              <span style={{ padding: "4px 12px", background: course.level === "beginner" ? C.green + "18" : course.level === "advanced" ? C.purple + "18" : "#3B82F618", color: course.level === "beginner" ? C.green : course.level === "advanced" ? C.purple : "#3B82F6", borderRadius: 30, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {course.level}
              </span>
            </div>

            <h1 style={{ fontSize: 48, fontWeight: 800, margin: "0 0 20px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              {course.title}
            </h1>

            <p style={{ fontSize: 16, color: C.sub, lineHeight: 1.6, margin: "0 0 30px", maxWidth: 600 }}>
              {course.description}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 16, color: C.faint, fontSize: 14 }}>
              <span>Created by <strong style={{ color: C.text }}>{course.createdBy?.username || "Community"}</strong></span>
              <span>•</span>
              <span>{topics.length} Topics</span>
              <span>•</span>
              <span>{new Date(course.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {course.thumbnail && (
            <div style={{ flexShrink: 0, width: "100%", maxWidth: 400, borderRadius: 24, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: `0 30px 60px rgba(0,0,0,0.5)`, background: C.card }}>
              <img src={course.thumbnail} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", aspectRatio: "16/10" }} />
            </div>
          )}
        </div>
      </div>

      {/* ─── Syllabus / Topics ───────────────────────────────────────────────── */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 30px", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: C.accent }}>●</span> Course Curriculum
        </h2>

        {topics.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", background: C.card, borderRadius: 20, border: `1px solid ${C.border}`, color: C.sub }}>
            No topics have been added to this course yet.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {topics.map((topic, index) => (
              <div key={topic._id} style={{ background: C.card, borderRadius: 20, border: `1px solid ${expandedTopic === topic._id ? C.accent + "60" : C.border}`, overflow: "hidden", transition: "all 0.3s" }}>

                {/* Topic Header (Clickable) */}
                <div
                  onClick={() => toggleTopic(topic._id)}
                  style={{ padding: "20px 24px", display: "flex", alignItems: "center", cursor: "pointer", background: expandedTopic === topic._id ? "rgba(94,106,210,0.05)" : "transparent", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = expandedTopic === topic._id ? "rgba(94,106,210,0.05)" : "rgba(255,255,255,0.02)"}
                  onMouseLeave={e => e.currentTarget.style.background = expandedTopic === topic._id ? "rgba(94,106,210,0.05)" : "transparent"}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: expandedTopic === topic._id ? C.accent : "rgba(255,255,255,0.05)", color: expandedTopic === topic._id ? "#fff" : C.faint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0, marginRight: 16, transition: "all 0.3s" }}>
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: expandedTopic === topic._id ? C.text : "#d1d5db", transition: "color 0.2s" }}>
                      {topic.title}
                    </h3>
                    {topic.description && (
                      <p style={{ margin: "4px 0 0", fontSize: 13, color: C.sub }}>{topic.description}</p>
                    )}
                  </div>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: C.sub, transform: expandedTopic === topic._id ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
                    ↓
                  </div>
                </div>

                {/* Expanded Video List */}
                {expandedTopic === topic._id && (
                  <div style={{ borderTop: `1px solid ${C.border}`, background: C.videoBg, padding: 12 }}>
                    {loadingVideos === topic._id ? (
                      <div style={{ padding: 30, textAlign: "center", color: C.sub, fontSize: 13 }}>Loading videos...</div>
                    ) : (topicVideos[topic._id] || []).length === 0 ? (
                      <div style={{ padding: 30, textAlign: "center", color: C.faint, fontSize: 13 }}>
                        No videos available for this topic yet.
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {(topicVideos[topic._id] || []).map((video: any) => (
                          <div key={video._id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", borderRadius: 12, background: "rgba(255,255,255,0.02)", transition: "background 0.2s" }}>
                            <div style={{ width: 40, height: 30, borderRadius: 6, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: C.faint }}>
                              ▶
                            </div>
                            <div style={{ flex: 1 }}>
                              <h4 style={{ margin: 0, fontSize: 14, fontWeight: 500, color: C.text }}>{video.title}</h4>
                              {video.description && <p style={{ margin: "2px 0 0", fontSize: 12, color: C.sub }}>{String(video.description).slice(0, 80)}</p>}
                            </div>
                            <div style={{ fontSize: 12, color: C.faint, background: "rgba(255,255,255,0.03)", padding: "4px 10px", borderRadius: 20 }}>
                              By {video.uploadedBy?.username || "User"}
                            </div>
                            {/* NOTE: Right now, clicking watch does nothing because we don't have a video player page, 
                                but later we can link it. For now, they just see the list. */}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
