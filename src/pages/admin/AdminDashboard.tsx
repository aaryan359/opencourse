import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  forceAdminLogout,
  initializeAdminAuth,
  logoutAdmin,
} from "../../redux/slice/adminSlice";
import { adminApi } from "../../api/admin.api";
import apiClient from "../../api/client";

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "overview" | "users" | "contributors" | "applications" | "videos" | "courses" | "interview";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "⊞" },
  { id: "users", label: "Users", icon: "👥" },
  { id: "contributors", label: "Contributors", icon: "✍️" },
  { id: "applications", label: "Applications", icon: "📋" },
  { id: "videos", label: "Videos", icon: "🎬" },
  { id: "courses", label: "Courses & Topics", icon: "📚" },
  { id: "interview", label: "Interview Qs", icon: "💬" },
];



const C = {
  bg: "#02020a", sidebar: "rgba(255,255,255,0.015)", card: "rgba(255,255,255,0.025)",
  border: "rgba(255,255,255,0.07)", accent: "#5E6AD2", purple: "#8B5CF6",
  text: "#ededef", sub: "#6b7280", faint: "#4b5563",
  green: "#10b981", amber: "#f59e0b", red: "#ef4444",
};

const sc = (s: string) => s === "approved" ? C.green : s === "rejected" ? C.red : C.amber;


const Badge = ({ status }: { status: string }) => (
  <span style={{ padding: "2px 9px", borderRadius: 6, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: sc(status), background: `${sc(status)}18` }}>
    {status}
  </span>
);

const Chip = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button onClick={onClick} style={{ padding: "5px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer", border: `1px solid ${active ? C.accent + "80" : C.border}`, background: active ? C.accent + "18" : C.card, color: active ? C.accent : C.sub, fontWeight: active ? 600 : 400, textTransform: "capitalize" as const }}>
    {label}
  </button>
);

const Btn = ({ children, onClick, color = C.accent, small = false, disabled = false }: { children: React.ReactNode; onClick?: React.MouseEventHandler<HTMLButtonElement>; color?: string; small?: boolean; disabled?: boolean }) => (
  <button onClick={onClick} disabled={disabled} style={{ padding: small ? "4px 10px" : "9px 18px", borderRadius: small ? 7 : 10, border: `1px solid ${color}40`, background: `${color}18`, color, fontSize: small ? 11 : 13, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, transition: "all 0.15s" }}>
    {children}
  </button>
);

const Input = ({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    {label && <label style={{ fontSize: 12, color: C.sub }}>{label}</label>}
    <input {...props} style={{ padding: "9px 12px", borderRadius: 10, fontSize: 13, border: `1px solid ${C.border}`, background: "rgba(255,255,255,0.04)", color: C.text, outline: "none", width: "100%", boxSizing: "border-box", ...(props.style ?? {}) }}
      onFocus={e => (e.target.style.borderColor = C.accent)} onBlur={e => (e.target.style.borderColor = C.border)} />
  </div>
);

const Select = ({ label, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    {label && <label style={{ fontSize: 12, color: C.sub }}>{label}</label>}
    <select {...props} style={{ padding: "9px 12px", borderRadius: 10, fontSize: 13, border: `1px solid ${C.border}`, background: "#0f0f18", color: C.text, outline: "none", width: "100%", cursor: "pointer" }}>{children}</select>
  </div>
);

const Textarea = ({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    {label && <label style={{ fontSize: 12, color: C.sub }}>{label}</label>}
    <textarea {...props} rows={3} style={{ padding: "9px 12px", borderRadius: 10, fontSize: 13, border: `1px solid ${C.border}`, background: "rgba(255,255,255,0.04)", color: C.text, outline: "none", resize: "vertical", boxSizing: "border-box", width: "100%", fontFamily: "inherit", ...(props.style ?? {}) }}
      onFocus={e => (e.target.style.borderColor = C.accent)} onBlur={e => (e.target.style.borderColor = C.border)} />
  </div>
);

// ─── Modal ────────────────────────────────────────────────────────────────────
const Modal = ({ title, children, onClose, wide = false }: { title: string; children: React.ReactNode; onClose: () => void; wide?: boolean }) => (
  <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
    <div onClick={e => e.stopPropagation()} style={{ background: "#0d0d18", border: `1px solid ${C.border}`, borderRadius: 20, padding: 28, width: "100%", maxWidth: wide ? 680 : 480, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 30px 80px rgba(0,0,0,0.7)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: C.text }}>{title}</h3>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.sub, fontSize: 20 }}>×</button>
      </div>
      {children}
    </div>
  </div>
);

// ─── Level Badge ──────────────────────────────────────────────────────────────
function LevelBadge({ level }: { level: string }) {
  const map: Record<string, [string, string]> = { beginner: [C.green, C.green + "18"], intermediate: ["#3B82F6", "#3B82F618"], advanced: [C.purple, C.purple + "18"] };
  const [color, bg] = map[level] ?? [C.sub, C.sub + "18"];
  return <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 5, color, background: bg }}>{level}</span>;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, accent }: { label: string; value: number | string; icon: string; accent?: string }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
    <span style={{ fontSize: 22 }}>{icon}</span>
    <p style={{ margin: 0, fontSize: 30, fontWeight: 700, letterSpacing: "-0.03em", color: accent ?? C.text }}>{value}</p>
    <p style={{ margin: 0, fontSize: 12, color: C.sub }}>{label}</p>
  </div>
);

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
        <h3 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: C.text }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function OverviewRow({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px", borderBottom: `1px solid rgba(255,255,255,0.03)` }}>{children}</div>;
}

function FilterRow({ filters, active, onChange }: { filters: string[]; active: string; onChange: (v: string) => void }) {
  return <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{filters.map(f => <Chip key={f} label={f || "All"} active={active === f} onClick={() => onChange(f)} />)}</div>;
}

// ─── Info Row (label + value pair) ───────────────────────────────────────────
function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 8, padding: "7px 0", borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
      <span style={{ fontSize: 12, color: C.faint, minWidth: 110, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, color: C.text }}>{value}</span>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const admin = useAppSelector((state) => state.admin.admin);

  const [tab, setTab] = useState<Tab>("overview");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  // ─ Data ─
  const [dash, setDash] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [contribs, setContribs] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [iqs, setIqs] = useState<any[]>([]);
  const [fields, setFields] = useState<any[]>([]);

  // ─ Filters ─
  const [appFilter, setAppFilter] = useState("");
  const [vidFilter, setVidFilter] = useState("");
  const [iqFilter, setIqFilter] = useState("");
  const [userSearch, setUserSearch] = useState("");

  // ─ Courses expandable state ─
  // expandedCourse = course._id that is expanded to show its topics
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [courseTopics, setCourseTopics] = useState<Record<string, any[]>>({});   // courseId → topics array
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [topicVideos, setTopicVideos] = useState<Record<string, any[]>>({});    // topicId → videos array
  const [loadingExpand, setLoadingExpand] = useState<string | null>(null);

  // ─ Modals ─
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  // Create topic: which course
  const [showCreateTopicFor, setShowCreateTopicFor] = useState<string | null>(null);
  // Detail modals
  const [detailApp, setDetailApp] = useState<any | null>(null);
  const [detailIq, setDetailIq] = useState<any | null>(null);
  const [detailContrib, setDetailContrib] = useState<any | null>(null);

  // ─ Forms ─
  const [cf, setCf] = useState({ title: "", description: "", field: "", level: "beginner", thumbnail: "", isPublished: true });
  const [tf, setTf] = useState({ title: "", description: "", order: "" });

  const showMsg = (msg: string, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 3000); };

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    try { await fn(); } catch (e: any) { showMsg(e?.response?.data?.message || "Request failed", false); }
    finally { setBusy(false); }
  };

  // ─ Session guard ─
  useEffect(() => { void dispatch(initializeAdminAuth()); }, [dispatch]);
  useEffect(() => { if (!admin) navigate("/admin/login", { replace: true }); }, [admin, navigate]);
  useEffect(() => {
    const h = () => {
      void dispatch(logoutAdmin());
      dispatch(forceAdminLogout());
      navigate("/admin/login");
    };
    window.addEventListener("admin:unauthorized", h);
    return () => window.removeEventListener("admin:unauthorized", h);
  }, [dispatch, navigate]);

  // ─ Fields (for create course) ─
  useEffect(() => { adminApi.listFields().then(r => setFields(r.data.data)).catch(() => { }); }, []);

  // ─ Tab data ─
  const load = useCallback(async () => {
    await run(async () => {
      if (tab === "overview") { const r = await adminApi.getDashboard(); setDash(r.data.data); }
      else if (tab === "users") { const r = await adminApi.listUsers({ search: userSearch || undefined, limit: 100 }); setUsers(r.data.data); }
      else if (tab === "contributors") { const r = await adminApi.listContributors({ limit: 100 }); setContribs(r.data.data); }
      else if (tab === "applications") { const r = await adminApi.listApplications({ status: appFilter || undefined, limit: 100 }); setApps(r.data.data); }
      else if (tab === "videos") { const r = await adminApi.listVideos({ status: vidFilter || undefined, limit: 100 }); setVideos(r.data.data); }
      else if (tab === "courses") { const r = await adminApi.listCourses({ limit: 100 }); setCourses(r.data.data); }
      else if (tab === "interview") { const r = await adminApi.listInterviewQuestions({ status: iqFilter || undefined, limit: 100 }); setIqs(r.data.data); }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, appFilter, vidFilter, iqFilter, userSearch]);

  useEffect(() => { load(); }, [load]);

  // ─ Expand course → topics ─
  const toggleCourse = async (courseId: string) => {
    if (expandedCourse === courseId) { setExpandedCourse(null); setExpandedTopic(null); return; }
    setExpandedCourse(courseId);
    setExpandedTopic(null);
    if (!courseTopics[courseId]) {
      setLoadingExpand(courseId);
      try {
        const r = await apiClient.get(`/courses/${courseId}/topics`);
        setCourseTopics(prev => ({ ...prev, [courseId]: r.data.data ?? [] }));
      } catch { showMsg("Failed to load topics", false); }
      finally { setLoadingExpand(null); }
    }
  };

  // ─ Expand topic → videos ─
  const toggleTopic = async (topicId: string) => {
    if (expandedTopic === topicId) { setExpandedTopic(null); return; }
    setExpandedTopic(topicId);
    if (!topicVideos[topicId]) {
      setLoadingExpand(topicId);
      try {
        const r = await apiClient.get(`/topics/${topicId}/videos`);
        setTopicVideos(prev => ({ ...prev, [topicId]: r.data.data ?? [] }));
      } catch { showMsg("Failed to load videos", false); }
      finally { setLoadingExpand(null); }
    }
  };

  // ─ Actions ─
  const handleApproveApp = (id: string) => run(async () => { await adminApi.approveApplication(id); showMsg("Approved ✓"); setDetailApp(null); load(); });
  const handleRejectApp = (id: string) => run(async () => {
    const note = window.prompt("Rejection reason (optional):") ?? "";
    await adminApi.rejectApplication(id, note); showMsg("Rejected"); setDetailApp(null); load();
  });
  const handleApproveVideo = (id: string) => run(async () => { await adminApi.approveVideo(id); showMsg("Video approved ✓"); load(); });
  const handleRejectVideo = (id: string) => run(async () => {
    const note = window.prompt("Rejection reason (required):");
    if (!note) return; await adminApi.rejectVideo(id, note); showMsg("Video rejected"); load();
  });
  const handleDeleteVideo = (id: string) => run(async () => {
    if (!window.confirm("Permanently delete this video?")) return;
    await adminApi.deleteVideo(id); showMsg("Deleted"); load();
  });
  const handleRoleChange = (id: string, current: string) => run(async () => {
    const opts = ["student", "contributor"].filter(r => r !== current);
    const chosen = window.prompt(`Change role from "${current}" to:\n${opts.join(" | ")}`);
    if (!chosen || !opts.includes(chosen)) return;
    await adminApi.changeUserRole(id, chosen); showMsg(`Role → ${chosen} ✓`); load();
  });
  const handleApproveIq = (id: string) => run(async () => { await adminApi.approveInterviewQuestion(id); showMsg("Approved ✓"); setDetailIq(null); load(); });
  const handleRejectIq = (id: string) => run(async () => {
    const note = window.prompt("Rejection reason:");
    await adminApi.rejectInterviewQuestion(id, note ?? ""); showMsg("Rejected"); setDetailIq(null); load();
  });

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    await run(async () => {
      await adminApi.createCourse({ title: cf.title, description: cf.description, field: cf.field, level: cf.level, thumbnail: cf.thumbnail || undefined, isPublished: cf.isPublished });
      showMsg("Course created ✓"); setShowCreateCourse(false);
      setCf({ title: "", description: "", field: "", level: "beginner", thumbnail: "", isPublished: true });
      if (tab === "courses") load();
    });
  };

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showCreateTopicFor) return;
    await run(async () => {
      await adminApi.createTopic(showCreateTopicFor, { title: tf.title, description: tf.description || undefined, order: tf.order ? Number(tf.order) : undefined });
      showMsg("Topic added ✓"); setShowCreateTopicFor(null); setTf({ title: "", description: "", order: "" });
      // Invalidate cached topics so they reload on next expand
      setCourseTopics(prev => { const copy = { ...prev }; delete copy[showCreateTopicFor!]; return copy; });
    });
  };

  if (!admin) return null;
  const s = dash?.stats;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "'Inter',system-ui,sans-serif", color: C.text }}>

      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <aside style={{ width: 220, flexShrink: 0, display: "flex", flexDirection: "column", padding: "20px 12px", gap: 3, background: C.sidebar, borderRight: `1px solid ${C.border}`, position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 10px 20px" }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg,${C.accent},${C.purple})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" /></svg>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.text, lineHeight: 1 }}>OpenCourse</p>
            <p style={{ margin: 0, fontSize: 10, color: C.purple, fontWeight: 700, letterSpacing: "0.07em" }}>ADMIN</p>
          </div>
        </div>

        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, border: "none", cursor: "pointer", width: "100%", textAlign: "left", background: tab === t.id ? C.accent + "20" : "transparent", color: tab === t.id ? C.accent : C.sub, fontWeight: tab === t.id ? 600 : 400, fontSize: 13, borderLeft: tab === t.id ? `2px solid ${C.accent}` : "2px solid transparent", transition: "all 0.15s" }}>
            <span style={{ fontSize: 15 }}>{t.icon}</span>{t.label}
          </button>
        ))}

        <div style={{ marginTop: "auto", borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
          <div style={{ padding: "6px 12px 10px" }}>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: C.text }}>{admin.username}</p>
            <p style={{ margin: 0, fontSize: 11, color: C.faint }}>{admin.email}</p>
          </div>
          <button onClick={() => { void dispatch(logoutAdmin()); navigate("/admin/login"); }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 10, border: "none", cursor: "pointer", width: "100%", background: "rgba(239,68,68,0.08)", color: C.red, fontSize: 12, fontWeight: 500 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 26 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: C.text }}>{TABS.find(t => t.id === tab)?.label}</h1>
            <p style={{ margin: 0, fontSize: 12, color: C.faint }}>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {busy && <span style={{ fontSize: 12, color: C.accent, padding: "5px 12px", borderRadius: 8, background: C.accent + "18" }}>Loading…</span>}
            {tab === "courses" && (
              <GradBtn onClick={() => setShowCreateCourse(true)}>
                <PlusIcon /> Create Course
              </GradBtn>
            )}
          </div>
        </div>

        {/* ── OVERVIEW ─────────────────────────────────────────────────────── */}
        {tab === "overview" && dash && (
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: 12 }}>
              <StatCard label="Total Users" value={s?.users.total ?? 0} icon="👥" />
              <StatCard label="Students" value={s?.users.students ?? 0} icon="🎓" />
              <StatCard label="Contributors" value={s?.users.contributors ?? 0} icon="✍️" accent={C.accent} />
              <StatCard label="Courses" value={s?.content.courses ?? 0} icon="📚" />
              <StatCard label="Total Videos" value={s?.content.videos ?? 0} icon="🎬" />
              <StatCard label="Pending Videos" value={s?.videos.pending ?? 0} icon="⏳" accent={C.amber} />
              <StatCard label="Pending Apps" value={s?.pendingApplications ?? 0} icon="📋" accent={C.amber} />
              <StatCard label="Topics" value={s?.content.topics ?? 0} icon="📌" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Section title="Recent Users">
                {(dash.recentActivity?.recentUsers ?? []).map((u: any) => (
                  <OverviewRow key={u._id}>
                    <div><p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: C.text }}>{u.username}</p><p style={{ margin: 0, fontSize: 11, color: C.faint }}>{u.email}</p></div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: u.role === "contributor" ? C.accent : C.sub }}>{u.role}</span>
                  </OverviewRow>
                ))}
              </Section>
              <Section title="Oldest Pending Videos">
                {(dash.recentActivity?.recentPendingVideos ?? []).length === 0
                  ? <p style={{ padding: "14px 16px", color: C.faint, fontSize: 13 }}>All clear! 🎉</p>
                  : dash.recentActivity.recentPendingVideos.map((v: any) => (
                    <OverviewRow key={v._id}>
                      <div><p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: C.text }}>{v.title}</p><p style={{ margin: 0, fontSize: 11, color: C.faint }}>by {v.uploadedBy?.username} · {v.course?.title}</p></div>
                    </OverviewRow>
                  ))
                }
              </Section>
            </div>
          </div>
        )}

        {/* ── USERS ────────────────────────────────────────────────────────── */}
        {tab === "users" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <input value={userSearch} onChange={e => setUserSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && load()} placeholder="Search name / email / username… (Enter)" style={{ padding: "9px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: "rgba(255,255,255,0.03)", color: C.text, fontSize: 13, outline: "none", width: 320 }} />
              <Btn onClick={load}>Search</Btn>
            </div>
            <FlatTable cols={["User", "Email", "Role", "Contributor Status", "Joined", "Action"]} rows={users} render={u => [
              <span style={{ fontWeight: 500, color: C.text }}>{u.username}</span>,
              <span style={{ color: C.sub, fontSize: 12 }}>{u.email}</span>,
              <span style={{ fontWeight: 600, color: u.role === "contributor" ? C.accent : u.role === "admin" ? C.amber : C.sub }}>{u.role}</span>,
              <span style={{ fontSize: 12, color: C.sub }}>{u.contributorStatus ?? "—"}</span>,
              <span style={{ fontSize: 12, color: C.faint }}>{new Date(u.createdAt).toLocaleDateString()}</span>,
              u.role !== "admin"
                ? <Btn small color={C.accent} onClick={() => handleRoleChange(u._id, u.role)}>Change Role</Btn>
                : <span style={{ fontSize: 12, color: C.faint }}>Protected</span>,
            ]} />
          </div>
        )}

        {/* ── CONTRIBUTORS ─────────────────────────────────────────────────── */}
        {tab === "contributors" && (
          <FlatTable cols={["Username", "Email", "Title", "Skills", "Uploads", "Joined", "Detail"]} rows={contribs} render={u => [
            <span style={{ fontWeight: 500, color: C.text }}>{u.username}</span>,
            <span style={{ color: C.sub, fontSize: 12 }}>{u.email}</span>,
            <span style={{ color: "#a1a1aa", fontSize: 12 }}>{u.profile?.title || "—"}</span>,
            <span style={{ color: C.sub, fontSize: 11 }}>{(u.profile?.skills ?? []).slice(0, 3).join(", ") || "—"}</span>,
            <span style={{ fontWeight: 600, color: C.accent }}>{u.stats?.uploadedVideos ?? 0}</span>,
            <span style={{ fontSize: 12, color: C.faint }}>{new Date(u.createdAt).toLocaleDateString()}</span>,
            <Btn small color={C.accent} onClick={() => setDetailContrib(u)}>View Profile</Btn>,
          ]} />
        )}

        {/* ── APPLICATIONS ─────────────────────────────────────────────────── */}
        {tab === "applications" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <FilterRow filters={["", "pending", "approved", "rejected"]} active={appFilter} onChange={setAppFilter} />
            <FlatTable cols={["Applicant", "Motivation (preview)", "Portfolio", "Status", "Submitted", "Action"]} rows={apps} render={a => [
              <div><p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: C.text }}>{a.applicant?.username}</p><p style={{ margin: 0, fontSize: 11, color: C.faint }}>{a.applicant?.email}</p></div>,
              <span style={{ color: C.sub, fontSize: 12 }}>{String(a.motivation ?? "").slice(0, 60)}{(a.motivation?.length ?? 0) > 60 ? "…" : ""}</span>,
              a.portfolioLinks?.length ? <a href={a.portfolioLinks[0]} target="_blank" rel="noreferrer" style={{ color: C.accent, fontSize: 12 }}>Link ↗</a> : <span style={{ color: C.faint, fontSize: 12 }}>—</span>,
              <Badge status={a.status} />,
              <span style={{ fontSize: 12, color: C.faint }}>{new Date(a.createdAt).toLocaleDateString()}</span>,
              <Btn small color={C.accent} onClick={() => setDetailApp(a)}>Review</Btn>,
            ]} />
          </div>
        )}

        {/* ── VIDEOS ───────────────────────────────────────────────────────── */}
        {tab === "videos" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <FilterRow filters={["", "pending", "approved", "rejected"]} active={vidFilter} onChange={setVidFilter} />
            <FlatTable cols={["Title", "By", "Course", "Topic", "Status", "Actions"]} rows={videos} render={v => [
              <div>
                <p style={{ margin: 0, fontWeight: 500, color: C.text, fontSize: 13 }}>{v.title}</p>
                {v.description && <p style={{ margin: 0, fontSize: 11, color: C.faint }}>{String(v.description).slice(0, 50)}</p>}
              </div>,
              <span style={{ color: C.sub, fontSize: 12 }}>{v.uploadedBy?.username}</span>,
              <span style={{ color: "#a1a1aa", fontSize: 12 }}>{v.course?.title}</span>,
              <span style={{ color: C.sub, fontSize: 12 }}>{v.topic?.title}</span>,
              <Badge status={v.status} />,
              <div style={{ display: "flex", gap: 5 }}>
                {v.status !== "approved" && <Btn small color={C.green} onClick={() => handleApproveVideo(v._id)}>✓ Approve</Btn>}
                {v.status !== "rejected" && <Btn small color={C.amber} onClick={() => handleRejectVideo(v._id)}>✗ Reject</Btn>}
                <Btn small color={C.red} onClick={() => handleDeleteVideo(v._id)}>🗑</Btn>
              </div>,
            ]} />
          </div>
        )}

        {/* ── COURSES & TOPICS (expandable) ────────────────────────────────── */}
        {tab === "courses" && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 100px 90px 1fr 90px 100px", gap: 8, padding: "10px 16px", background: "rgba(255,255,255,0.03)", borderBottom: `1px solid ${C.border}` }}>
              {["Title", "Field", "Level", "Status", "Slug", "Created By", "Actions"].map(h => (
                <span key={h} style={{ fontSize: 11, fontWeight: 600, color: C.faint, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</span>
              ))}
            </div>

            {courses.length === 0 && <p style={{ padding: "28px 16px", textAlign: "center", color: C.faint, fontSize: 13 }}>No courses found</p>}

            {courses.map((c: any) => (
              <div key={c._id}>
                {/* Course row */}
                <div
                  style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 100px 90px 1fr 90px 100px", gap: 8, padding: "12px 16px", borderBottom: `1px solid rgba(255,255,255,0.03)`, cursor: "pointer", transition: "background 0.15s", background: expandedCourse === c._id ? "rgba(94,106,210,0.07)" : "transparent" }}
                  onMouseEnter={e => { if (expandedCourse !== c._id) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; }}
                  onMouseLeave={e => { if (expandedCourse !== c._id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }} onClick={() => toggleCourse(c._id)}>
                    <span style={{ fontSize: 13, color: expandedCourse === c._id ? C.accent : C.faint, transition: "transform 0.2s", display: "inline-block", transform: expandedCourse === c._id ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
                    <span style={{ fontWeight: 500, color: C.text, fontSize: 13 }}>{c.title}</span>
                  </div>
                  <span style={{ color: C.accent, fontSize: 12, alignSelf: "center" }}>{c.field?.name ?? "—"}</span>
                  <span style={{ alignSelf: "center" }}><LevelBadge level={c.level} /></span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: c.isPublished ? C.green : C.red, alignSelf: "center" }}>{c.isPublished ? "Published" : "Draft"}</span>
                  <span style={{ color: C.faint, fontSize: 11, alignSelf: "center" }}>{c.slug}</span>
                  <span style={{ color: C.sub, fontSize: 12, alignSelf: "center" }}>{c.createdBy?.username ?? "—"}</span>
                  <div style={{ display: "flex", gap: 6, alignSelf: "center" }}>
                    <Btn small color={C.accent} onClick={e => { e.stopPropagation(); setShowCreateTopicFor(c._id); toggleCourse(c._id); }}>+ Topic</Btn>
                  </div>
                </div>

                {/* Expanded: Topics */}
                {expandedCourse === c._id && (
                  <div style={{ background: "rgba(94,106,210,0.04)", borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
                    {loadingExpand === c._id && <p style={{ padding: "12px 40px", fontSize: 12, color: C.sub }}>Loading topics…</p>}
                    {!loadingExpand && (courseTopics[c._id] ?? []).length === 0 && (
                      <p style={{ padding: "12px 40px", fontSize: 12, color: C.faint }}>No topics yet. Click "+ Topic" to add one.</p>
                    )}
                    {(courseTopics[c._id] ?? []).map((t: any) => (
                      <div key={t._id}>
                        {/* Topic row */}
                        <div
                          style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px 10px 44px", borderBottom: `1px solid rgba(255,255,255,0.02)`, cursor: "pointer", transition: "background 0.15s", background: expandedTopic === t._id ? "rgba(139,92,246,0.06)" : "transparent" }}
                          onClick={() => toggleTopic(t._id)}
                          onMouseEnter={e => { if (expandedTopic !== t._id) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.015)"; }}
                          onMouseLeave={e => { if (expandedTopic !== t._id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                        >
                          <span style={{ fontSize: 11, color: expandedTopic === t._id ? C.purple : C.faint, transition: "transform 0.2s", display: "inline-block", transform: expandedTopic === t._id ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
                          <span style={{ fontSize: 13, color: expandedTopic === t._id ? C.purple : C.text, fontWeight: 500, flex: 1 }}>
                            <span style={{ color: C.purple, fontWeight: 700, marginRight: 8 }}>#{t.order}</span>{t.title}
                          </span>
                          {t.description && <span style={{ color: C.faint, fontSize: 11 }}>{String(t.description).slice(0, 50)}</span>}
                          {loadingExpand === t._id && <span style={{ fontSize: 11, color: C.accent }}>Loading…</span>}
                        </div>

                        {/* Expanded: Videos under topic */}
                        {expandedTopic === t._id && (
                          <div style={{ background: "rgba(139,92,246,0.03)" }}>
                            {(topicVideos[t._id] ?? []).length === 0 && loadingExpand !== t._id && (
                              <p style={{ padding: "10px 16px 10px 70px", fontSize: 11, color: C.faint }}>No videos in this topic yet.</p>
                            )}
                            {(topicVideos[t._id] ?? []).map((v: any) => (
                              <div key={v._id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "9px 16px 9px 70px", borderBottom: `1px solid rgba(255,255,255,0.02)` }}>
                                <span style={{ fontSize: 14 }}>🎬</span>
                                <div style={{ flex: 1 }}>
                                  <p style={{ margin: 0, fontSize: 12, fontWeight: 500, color: C.text }}>{v.title}</p>
                                  <p style={{ margin: 0, fontSize: 11, color: C.faint }}>by {v.uploadedBy?.username ?? "—"}</p>
                                </div>
                                <Badge status={v.status} />
                                <div style={{ display: "flex", gap: 5 }}>
                                  {v.status !== "approved" && <Btn small color={C.green} onClick={() => handleApproveVideo(v._id)}>✓</Btn>}
                                  {v.status !== "rejected" && <Btn small color={C.amber} onClick={() => handleRejectVideo(v._id)}>✗</Btn>}
                                  <Btn small color={C.red} onClick={() => handleDeleteVideo(v._id)}>🗑</Btn>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── INTERVIEW QUESTIONS ───────────────────────────────────────────── */}
        {tab === "interview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <FilterRow filters={["", "pending", "approved", "rejected"]} active={iqFilter} onChange={setIqFilter} />
            <FlatTable cols={["Company", "Role / Position", "Q&As", "Submitted By", "Date", "Status", "Action"]} rows={iqs} render={q => [
              <span style={{ fontWeight: 500, color: C.text }}>{q.company}</span>,
              <span style={{ color: C.sub, fontSize: 12 }}>{q.role}</span>,
              <span style={{ color: "#a1a1aa", fontSize: 12 }}>{q.qaPairs?.length ?? 0} Q&As</span>,
              <span style={{ color: C.sub, fontSize: 12 }}>{q.submittedBy?.username ?? "Anonymous"}</span>,
              <span style={{ color: C.faint, fontSize: 12 }}>{new Date(q.createdAt).toLocaleDateString()}</span>,
              <Badge status={q.status} />,
              <Btn small color={C.accent} onClick={() => setDetailIq(q)}>Review</Btn>,
            ]} />
          </div>
        )}
      </main>

      {/* ── Create Course Modal ──────────────────────────────────────────────── */}
      {showCreateCourse && (
        <Modal title="Create New Course" onClose={() => setShowCreateCourse(false)} wide>
          <form onSubmit={handleCreateCourse} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Input label="Course Title *" value={cf.title} onChange={e => setCf(p => ({ ...p, title: e.target.value }))} placeholder="e.g. React Fundamentals" required />
            <Textarea label="Description *" value={cf.description} onChange={e => setCf(p => ({ ...p, description: e.target.value }))} placeholder="What will students learn?" required />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Select label="Field *" value={cf.field} onChange={e => setCf(p => ({ ...p, field: e.target.value }))} required>
                <option value="">— Select field —</option>
                {fields.map((f: any) => <option key={f._id} value={f._id}>{f.name}</option>)}
              </Select>
              <Select label="Level" value={cf.level} onChange={e => setCf(p => ({ ...p, level: e.target.value }))}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Select>
            </div>
            <Input label="Thumbnail URL (optional)" value={cf.thumbnail} onChange={e => setCf(p => ({ ...p, thumbnail: e.target.value }))} placeholder="https://images.unsplash.com/…" />
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13, color: C.sub }}>
              <input type="checkbox" checked={cf.isPublished} onChange={e => setCf(p => ({ ...p, isPublished: e.target.checked }))} />
              Publish immediately (visible to students)
            </label>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
              <Btn onClick={() => setShowCreateCourse(false)} color={C.sub}>Cancel</Btn>
              <GradBtn type="submit" disabled={busy}>{busy ? "Creating…" : "Create Course"}</GradBtn>
            </div>
          </form>
        </Modal>
      )}

      {/* ── Create Topic Modal ───────────────────────────────────────────────── */}
      {showCreateTopicFor && (
        <Modal title="Add Topic" onClose={() => setShowCreateTopicFor(null)}>
          <form onSubmit={handleCreateTopic} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ margin: 0, fontSize: 12, color: C.sub }}>
              Adding to: <strong style={{ color: C.accent }}>{courses.find((c: any) => c._id === showCreateTopicFor)?.title}</strong>
            </p>
            <Input label="Topic Title *" value={tf.title} onChange={e => setTf(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Introduction to JSX" required />
            <Textarea label="Description (optional)" value={tf.description} onChange={e => setTf(p => ({ ...p, description: e.target.value }))} placeholder="What does this topic cover?" />
            <Input label="Order (blank = auto)" type="number" value={tf.order} onChange={e => setTf(p => ({ ...p, order: e.target.value }))} placeholder="e.g. 1" />
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
              <Btn onClick={() => setShowCreateTopicFor(null)} color={C.sub}>Cancel</Btn>
              <GradBtn type="submit" disabled={busy}>{busy ? "Adding…" : "Add Topic"}</GradBtn>
            </div>
          </form>
        </Modal>
      )}

      {/* ── Application Detail Modal ─────────────────────────────────────────── */}
      {detailApp && (
        <Modal title="Application Review" onClose={() => setDetailApp(null)} wide>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 20 }}>
            <InfoRow label="Applicant" value={<strong style={{ color: C.text }}>{detailApp.applicant?.username}</strong>} />
            <InfoRow label="Email" value={detailApp.applicant?.email} />
            <InfoRow label="Profile Title" value={detailApp.applicant?.profile?.title || "—"} />
            <InfoRow label="Status" value={<Badge status={detailApp.status} />} />
            <InfoRow label="Submitted" value={new Date(detailApp.createdAt).toLocaleString()} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <p style={{ margin: "0 0 8px", fontSize: 12, color: C.faint, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Motivation</p>
            <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 13, color: C.sub, lineHeight: 1.6 }}>
              {detailApp.motivation || "—"}
            </div>
          </div>

          {detailApp.portfolioLinks?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ margin: "0 0 8px", fontSize: 12, color: C.faint, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Portfolio Links</p>
              {detailApp.portfolioLinks.map((l: string, i: number) => (
                <a key={i} href={l} target="_blank" rel="noreferrer" style={{ display: "block", color: C.accent, fontSize: 13, marginBottom: 4 }}>{l}</a>
              ))}
            </div>
          )}

          {detailApp.status === "pending" ? (
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
              <Btn color={C.red} onClick={() => handleRejectApp(detailApp._id)} disabled={busy}>✗ Reject Application</Btn>
              <GradBtn onClick={() => handleApproveApp(detailApp._id)} disabled={busy}>{busy ? "…" : "✓ Approve — Make Contributor"}</GradBtn>
            </div>
          ) : (
            <div style={{ padding: "12px 14px", borderRadius: 10, background: `${sc(detailApp.status)}10`, border: `1px solid ${sc(detailApp.status)}30`, fontSize: 13, color: sc(detailApp.status) }}>
              This application has already been <strong>{detailApp.status}</strong>.
              {detailApp.reviewNote && <span> Reason: {detailApp.reviewNote}</span>}
            </div>
          )}
        </Modal>
      )}

      {/* ── Contributor Detail Modal ─────────────────────────────────────────── */}
      {detailContrib && (
        <Modal title="Contributor Profile" onClose={() => setDetailContrib(null)} wide>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            {detailContrib.profile?.avatar
              ? <img src={detailContrib.profile.avatar} alt="" style={{ width: 60, height: 60, borderRadius: 14, objectFit: "cover" }} />
              : <div style={{ width: 60, height: 60, borderRadius: 14, background: `linear-gradient(135deg,${C.accent},${C.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "white", fontWeight: 700 }}>{detailContrib.username[0].toUpperCase()}</div>
            }
            <div>
              <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.text }}>{detailContrib.username}</p>
              <p style={{ margin: 0, fontSize: 13, color: C.sub }}>{detailContrib.profile?.title || "Contributor"}</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 16 }}>
            <InfoRow label="Email" value={detailContrib.email} />
            <InfoRow label="Status" value={<Badge status={detailContrib.contributorStatus ?? "approved"} />} />
            <InfoRow label="Joined" value={new Date(detailContrib.createdAt).toLocaleDateString()} />
            <InfoRow label="Videos Uploaded" value={<strong style={{ color: C.accent }}>{detailContrib.stats?.uploadedVideos ?? 0}</strong>} />
          </div>

          {detailContrib.profile?.bio && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ margin: "0 0 8px", fontSize: 12, color: C.faint, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Bio</p>
              <p style={{ margin: 0, fontSize: 13, color: C.sub, lineHeight: 1.6 }}>{detailContrib.profile.bio}</p>
            </div>
          )}

          {(detailContrib.profile?.skills ?? []).length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ margin: "0 0 10px", fontSize: 12, color: C.faint, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Skills</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {detailContrib.profile.skills.map((skill: string) => (
                  <span key={skill} style={{ padding: "4px 10px", borderRadius: 7, background: C.accent + "18", color: C.accent, fontSize: 12, fontWeight: 500 }}>{skill}</span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
            <Btn color={C.red} onClick={() => { handleRoleChange(detailContrib._id, detailContrib.role); setDetailContrib(null); }}>Demote to Student</Btn>
          </div>
        </Modal>
      )}

      {/* ── Interview Question Detail Modal ─────────────────────────────────── */}
      {detailIq && (
        <Modal title="Interview Question Review" onClose={() => setDetailIq(null)} wide>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 20 }}>
            <InfoRow label="Company" value={<strong style={{ color: C.text, fontSize: 14 }}>{detailIq.company}</strong>} />
            <InfoRow label="Role" value={detailIq.role} />
            <InfoRow label="Submitted By" value={detailIq.submittedBy?.username ?? "Anonymous"} />
            <InfoRow label="Submitted" value={new Date(detailIq.createdAt).toLocaleString()} />
            <InfoRow label="Status" value={<Badge status={detailIq.status} />} />
            {detailIq.experience && <InfoRow label="Experience" value={detailIq.experience} />}
          </div>

          <div style={{ marginBottom: 20 }}>
            <p style={{ margin: "0 0 12px", fontSize: 12, color: C.faint, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Q&A Pairs ({detailIq.qaPairs?.length ?? 0})
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {(detailIq.qaPairs ?? []).map((qa: any, idx: number) => (
                <div key={idx} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 5, background: C.accent + "20", color: C.accent, flexShrink: 0 }}>Q{idx + 1}</span>
                    <p style={{ margin: 0, fontSize: 13, color: C.text, fontWeight: 500, lineHeight: 1.5 }}>{qa.question}</p>
                  </div>
                  {qa.answer && (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 5, background: C.green + "20", color: C.green, flexShrink: 0 }}>A</span>
                      <p style={{ margin: 0, fontSize: 12, color: C.sub, lineHeight: 1.6 }}>{qa.answer}</p>
                    </div>
                  )}
                  {qa.difficulty && (
                    <div style={{ marginTop: 8 }}>
                      <LevelBadge level={qa.difficulty} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {detailIq.status === "pending" ? (
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
              <Btn color={C.red} onClick={() => handleRejectIq(detailIq._id)} disabled={busy}>✗ Reject</Btn>
              <GradBtn onClick={() => handleApproveIq(detailIq._id)} disabled={busy}>{busy ? "…" : "✓ Approve & Publish"}</GradBtn>
            </div>
          ) : (
            <div style={{ padding: "12px 14px", borderRadius: 10, background: `${sc(detailIq.status)}10`, border: `1px solid ${sc(detailIq.status)}30`, fontSize: 13, color: sc(detailIq.status) }}>
              Already <strong>{detailIq.status}</strong>.{detailIq.reviewNote && ` Note: ${detailIq.reviewNote}`}
            </div>
          )}
        </Modal>
      )}

      {/* ── Toast ──────────────────────────────────────────────────────────────── */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, padding: "12px 20px", borderRadius: 12, background: toast.ok ? C.green + "18" : C.red + "18", border: `1px solid ${toast.ok ? C.green : C.red}40`, color: toast.ok ? C.green : "#f87171", fontSize: 13, fontWeight: 500, zIndex: 9999, boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────
function FlatTable({ cols, rows, render }: { cols: string[]; rows: any[]; render: (r: any) => React.ReactNode[] }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.03)" }}>
            {cols.map(c => <th key={c} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: C.faint, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: `1px solid ${C.border}` }}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0
            ? <tr><td colSpan={cols.length} style={{ padding: "32px 16px", textAlign: "center", color: C.faint, fontSize: 13 }}>No records found</td></tr>
            : rows.map((r, i) => (
              <tr key={r._id ?? i} style={{ borderBottom: `1px solid rgba(255,255,255,0.03)` }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                {render(r).map((cell, ci) => <td key={ci} style={{ padding: "10px 16px" }}>{cell}</td>)}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

function GradBtn({ children, onClick, type = "button", disabled = false }: { children: React.ReactNode; onClick?: () => void; type?: "button" | "submit"; disabled?: boolean }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 20px", borderRadius: 10, border: "none", cursor: disabled ? "not-allowed" : "pointer", background: `linear-gradient(135deg,${C.accent},${C.purple})`, color: "white", fontWeight: 600, fontSize: 13, boxShadow: `0 6px 24px ${C.accent}40`, opacity: disabled ? 0.6 : 1 }}>
      {children}
    </button>
  );
}

function PlusIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
}
