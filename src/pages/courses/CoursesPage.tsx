import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import course 

// ─── Constants & Types ────────────────────────────────────────────────────────
const C = {
  bg: "#02020a",
  card: "rgba(255,255,255,0.025)",
  border: "rgba(255,255,255,0.07)",
  accent: "#5E6AD2",
  text: "#ededef",
  sub: "#6b7280",
  faint: "#4b5563",
  green: "#10b981",
  purple: "#8B5CF6",
};

export default function CoursesPage() {
  const [fields, setFields] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  useEffect(() => {
    // 1. Fetch fields
    publicApi.listFields().then(res => setFields(res.data?.data || [])).catch(() => { });
  }, []);

  useEffect(() => {
    // 2. Fetch courses — with field & level filters
    setLoading(true);
    publicApi.listCourses({
      field: selectedField || undefined,
      level: selectedLevel || undefined,
      limit: 100
    })
      .then(res => setCourses(res.data?.data || []))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, [selectedField, selectedLevel]);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter',system-ui,sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Filter Bar */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 16 }}>
          <button
            onClick={() => setSelectedField(null)}
            style={{
              padding: "10px 20px", borderRadius: 30, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
              border: `1px solid ${selectedField === null ? C.accent : C.border}`,
              background: selectedField === null ? C.accent : "rgba(255,255,255,0.03)",
              color: selectedField === null ? "#fff" : C.text,
            }}
          >
            All Fields
          </button>
          {fields.map(f => (
            <button
              key={f._id}
              onClick={() => setSelectedField(f._id)}
              style={{
                padding: "10px 20px", borderRadius: 30, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                border: `1px solid ${selectedField === f._id ? C.accent : C.border}`,
                background: selectedField === f._id ? C.accent : "rgba(255,255,255,0.03)",
                color: selectedField === f._id ? "#fff" : C.text,
              }}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 30 }}>
          <button
            onClick={() => setSelectedLevel(null)}
            style={{
              padding: "8px 16px", borderRadius: 30, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
              border: `1px solid ${selectedLevel === null ? C.purple : C.border}`,
              background: selectedLevel === null ? C.purple : "rgba(255,255,255,0.02)",
              color: selectedLevel === null ? "#fff" : C.sub,
            }}
          >
            All Levels
          </button>
          {["beginner", "intermediate", "advanced"].map(lvl => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              style={{
                padding: "8px 16px", borderRadius: 30, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", textTransform: "capitalize",
                border: `1px solid ${selectedLevel === lvl ? C.purple : C.border}`,
                background: selectedLevel === lvl ? C.purple : "rgba(255,255,255,0.02)",
                color: selectedLevel === lvl ? "#fff" : C.sub,
              }}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: C.sub, fontSize: 16 }}>Loading courses...</div>
        ) : courses.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: C.sub, fontSize: 16 }}>
            No courses found for this category.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {courses.map(course => (
              <Link
                key={course._id}
                to={`/courses/${course.slug}`}
                style={{
                  display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit",
                  background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden",
                  transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = C.accent + "80";
                  e.currentTarget.style.boxShadow = `0 12px 32px ${C.accent}20`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ height: 160, background: "rgba(255,255,255,0.02)", position: "relative" }}>
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${C.accent}40, ${C.purple}20)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 40, opacity: 0.5 }}>📚</span>
                    </div>
                  )}
                  {/* Level Badge Overlay */}
                  <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: course.level === "beginner" ? C.green : course.level === "advanced" ? C.purple : "#3B82F6", border: "1px solid rgba(255,255,255,0.1)" }}>
                    {course.level}
                  </div>
                </div>

                <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                    {course.field?.name || "General"}
                  </div>
                  <h3 style={{ margin: "0 0 12px", fontSize: 18, fontWeight: 700, lineHeight: 1.4, color: "#fff" }}>
                    {course.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 13, color: C.sub, lineHeight: 1.5, flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {course.description}
                  </p>

                  <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: C.faint, fontWeight: 500 }}>
                      By {course.createdBy?.username || "Community"}
                    </span>
                    <span style={{ fontSize: 12, color: C.accent, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                      Start Learning <span style={{ fontSize: 16 }}>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
