import { useEffect, useMemo, useState } from "react";
import { adminApi } from "../../api/admin.api";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import type { AdminContributionStatus, AdminVideoItem, AdminInterviewItem } from "../../types";

const statusClasses: Record<AdminContributionStatus, string> = {
  pending: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  approved: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  rejected: "bg-rose-500/15 text-rose-300 border-rose-500/30",
};

export default function AdminContributionsPage() {
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [videoStatusFilter, setVideoStatusFilter] = useState<"all" | AdminContributionStatus>("all");
  const [iqStatusFilter, setIqStatusFilter] = useState<"all" | AdminContributionStatus>("all");

  const [videos, setVideos] = useState<AdminVideoItem[]>([]);
  const [interviews, setInterviews] = useState<AdminInterviewItem[]>([]);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [videosRes, interviewsRes] = await Promise.all([
        adminApi.listVideos(),
        adminApi.listInterviewQuestions(),
      ]);
      setVideos(videosRes.data?.data ?? []);
      setInterviews(interviewsRes.data?.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const filteredVideos = useMemo(
    () => videos.filter((v) => (videoStatusFilter === "all" ? true : v.status === videoStatusFilter)),
    [videos, videoStatusFilter],
  );

  const filteredInterviews = useMemo(
    () => interviews.filter((i) => (iqStatusFilter === "all" ? true : i.status === iqStatusFilter)),
    [interviews, iqStatusFilter],
  );

  const handleApproveVideo = async (id: string) => {
    setBusyId(id);
    try {
      await adminApi.approveVideo(id);
      await loadAll();
    } finally {
      setBusyId(null);
    }
  };

  const handleRejectVideo = async (id: string) => {
    setBusyId(id);
    try {
      await adminApi.rejectVideo(id, "Rejected by admin");
      await loadAll();
    } finally {
      setBusyId(null);
    }
  };

  const handleApproveInterview = async (id: string) => {
    setBusyId(id);
    try {
      await adminApi.approveInterviewQuestion(id);
      await loadAll();
    } finally {
      setBusyId(null);
    }
  };

  const handleRejectInterview = async (id: string) => {
    setBusyId(id);
    try {
      await adminApi.rejectInterviewQuestion(id, "Rejected by admin");
      await loadAll();
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="min-h-screen bg-[#050506] text-[#EDEDEF] px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-semibold">Admin Contributions</h1>
          <p className="text-[#8A8F98] mt-2">
            Review all contributor videos and interview question submissions.
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="w-7 h-7 animate-spin text-indigo-400" />
          </div>
        ) : (
          <>
            <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-xl font-medium">Contributor Videos</h2>
                <div className="flex gap-2">
                  {(["all", "pending", "approved", "rejected"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setVideoStatusFilter(s)}
                      className={`px-3 py-1.5 rounded-lg border text-sm capitalize ${
                        videoStatusFilter === s
                          ? "border-indigo-400/60 bg-indigo-500/20 text-indigo-200"
                          : "border-white/10 bg-white/5 text-[#8A8F98]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {filteredVideos.map((video) => {
                  const uploader =
                    typeof video.uploadedBy === "object"
                      ? video.uploadedBy?.username || video.uploadedBy?.email
                      : "Unknown";
                  return (
                    <div key={video._id} className="rounded-xl border border-white/10 bg-[#0e0e11] p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium">{video.title}</p>
                          <p className="text-sm text-[#8A8F98] mt-1">
                            By {uploader} • {video.course?.title || "No course"} • {video.topic?.title || "No topic"}
                          </p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs border ${statusClasses[video.status]}`}>
                          {video.status}
                        </span>
                      </div>

                      {video.status === "pending" && (
                        <div className="flex gap-2 mt-3">
                          <button
                            disabled={busyId === video._id}
                            onClick={() => handleApproveVideo(video._id)}
                            className="px-3 py-2 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-sm inline-flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Approve
                          </button>
                          <button
                            disabled={busyId === video._id}
                            onClick={() => handleRejectVideo(video._id)}
                            className="px-3 py-2 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-sm inline-flex items-center gap-2"
                          >
                            <XCircle className="w-4 h-4" /> Reject
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
                {filteredVideos.length === 0 && <p className="text-sm text-[#8A8F98]">No videos found.</p>}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-xl font-medium">Interview Contributions</h2>
                <div className="flex gap-2">
                  {(["all", "pending", "approved", "rejected"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setIqStatusFilter(s)}
                      className={`px-3 py-1.5 rounded-lg border text-sm capitalize ${
                        iqStatusFilter === s
                          ? "border-indigo-400/60 bg-indigo-500/20 text-indigo-200"
                          : "border-white/10 bg-white/5 text-[#8A8F98]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {filteredInterviews.map((item) => {
                  const contributor =
                    item.isAnonymous
                      ? "Anonymous"
                      : typeof item.submittedBy === "object"
                      ? item.submittedBy?.username || item.submittedBy?.email
                      : "Unknown";

                  return (
                    <div key={item._id} className="rounded-xl border border-white/10 bg-[#0e0e11] p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium">
                            {item.company} • {item.role}
                          </p>
                          <p className="text-sm text-[#8A8F98] mt-1">
                            By {contributor} • {item.qaPairs?.length || 0} Q&A pairs
                          </p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs border ${statusClasses[item.status]}`}>
                          {item.status}
                        </span>
                      </div>

                      {item.qaPairs?.[0] && (
                        <p className="text-sm text-[#b9bcc3] mt-3">
                          <span className="text-[#8A8F98]">Sample:</span> {item.qaPairs[0].question}
                        </p>
                      )}

                      {item.status === "pending" && (
                        <div className="flex gap-2 mt-3">
                          <button
                            disabled={busyId === item._id}
                            onClick={() => handleApproveInterview(item._id)}
                            className="px-3 py-2 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-sm inline-flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Approve
                          </button>
                          <button
                            disabled={busyId === item._id}
                            onClick={() => handleRejectInterview(item._id)}
                            className="px-3 py-2 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-sm inline-flex items-center gap-2"
                          >
                            <XCircle className="w-4 h-4" /> Reject
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
                {filteredInterviews.length === 0 && <p className="text-sm text-[#8A8F98]">No interview submissions found.</p>}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
