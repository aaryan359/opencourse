import { useEffect, useState } from "react";
import GlowCard from "../../../components/ui/GlowCard";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles, ServerOff } from "lucide-react";
import apiClient from "../../../api/client";

/* ──────────────────────────────────────────────
   Types matching the backend models
────────────────────────────────────────────── */
interface Field {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  field: string;
}

interface Topic {
  _id: string;
  title: string;
  course: string;
  order: number;
}

/* ──────────────────────────────────────────────
   Section wrapper
────────────────────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3 }}
			className="space-y-4"
		>
			<h3 className="text-lg font-semibold text-[#EDEDEF] flex items-center gap-2">
				<Sparkles className="h-5 w-5 text-[#5E6AD2]" />
				{title}
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{children}
			</div>
		</motion.div>
	);
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 col-span-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-16 rounded-2xl bg-white/5 animate-pulse" />
      ))}
    </div>
  );
}

export default function TopicFlow({ onConfirm }: { onConfirm: (data: { field: Field; course: Course; topic: Topic }) => void }) {
	const [fields, setFields] = useState<Field[]>([]);
	const [courses, setCourses] = useState<Course[]>([]);
	const [topics, setTopics] = useState<Topic[]>([]);

	const [selectedField, setSelectedField] = useState<Field | null>(null);
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
	const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

	const [loadingFields, setLoadingFields] = useState(true);
	const [loadingCourses, setLoadingCourses] = useState(false);
	const [loadingTopics, setLoadingTopics] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		apiClient
			.get("/fields")
			.then((res) => setFields(res.data.data || []))
			.catch(() => setError("Could not load fields. Is the backend running?"))
			.finally(() => setLoadingFields(false));
	}, []);

	useEffect(() => {
		if (!selectedField) return;
		setLoadingCourses(true);
		setCourses([]);
		setSelectedCourse(null);
		setSelectedTopic(null);
		setTopics([]);
		apiClient
			.get(`/fields/${selectedField.slug}/courses`)
			.then((res) => setCourses(res.data.data || []))
			.catch(() => setError("Could not load courses."))
			.finally(() => setLoadingCourses(false));
	}, [selectedField]);

	useEffect(() => {
		if (!selectedCourse) return;
		setLoadingTopics(true);
		setTopics([]);
		setSelectedTopic(null);
		apiClient
			.get(`/courses/${selectedCourse._id}/topics`)
			.then((res) => setTopics(res.data.data || []))
			.catch(() => setError("Could not load topics."))
			.finally(() => setLoadingTopics(false));
	}, [selectedCourse]);

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center py-24 gap-4 text-[#8A8F98]">
				<ServerOff className="h-10 w-10 text-rose-500" />
				<p className="text-sm">{error}</p>
				<button
					onClick={() => {
						setError(null);
						setLoadingFields(true);
						apiClient.get("/fields").then((r) => setFields(r.data.data || [])).finally(() => setLoadingFields(false));
					}}
					className="px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[#EDEDEF] text-sm hover:bg-white/[0.08] transition-colors"
				>
					Retry
				</button>
			</div>
		);
	}

	return (
		<div className='space-y-10'>
			{/* FIELDS */}
			<Section title='Select a Domain'>
				{loadingFields ? <LoadingGrid /> : fields.length === 0 ? (
					<p className="text-[#8A8F98] text-sm col-span-3">No fields available yet.</p>
				) : fields.map((f) => (
					<GlowCard
						key={f._id}
						selected={selectedField?._id === f._id}
						disabled={!!selectedField && selectedField._id !== f._id}
						onClick={() => setSelectedField(f)}>
						<h3 className='text-[#EDEDEF] font-medium'>{f.name}</h3>
						{f.description && <p className="text-xs text-[#8A8F98] mt-1 truncate">{f.description}</p>}
					</GlowCard>
				))}
			</Section>

			<AnimatePresence>
				{selectedField && (
					<Section title={`Courses in ${selectedField.name}`}>
						{loadingCourses ? <LoadingGrid /> : courses.length === 0 ? (
							<p className="text-[#8A8F98] text-sm col-span-3">No courses in this field yet.</p>
						) : courses.map((c) => (
							<GlowCard
								key={c._id}
								accent='emerald'
								selected={selectedCourse?._id === c._id}
								disabled={!!selectedCourse && selectedCourse._id !== c._id}
								onClick={() => setSelectedCourse(c)}>
								<h3 className="text-[#EDEDEF] font-medium">{c.title}</h3>
								<p className="text-xs text-[#8A8F98] mt-1 capitalize">{c.level}</p>
							</GlowCard>
						))}
					</Section>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{selectedCourse && (
					<Section title='Choose a Topic'>
						{loadingTopics ? <LoadingGrid /> : topics.length === 0 ? (
							<p className="text-[#8A8F98] text-sm col-span-3">No topics in this course yet.</p>
						) : topics.map((t) => (
							<GlowCard
								key={t._id}
								accent='indigo'
								selected={selectedTopic?._id === t._id}
								disabled={!!selectedTopic && selectedTopic._id !== t._id}
								onClick={() => setSelectedTopic(t)}>
								{t.title}
							</GlowCard>
						))}
					</Section>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{selectedTopic && selectedField && selectedCourse && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className='sticky bottom-6 z-20'
					>
						<GlowCard className='flex items-center justify-between'>
							<div>
								<p className='text-xs text-[#8A8F98]'>Selected path</p>
								<p className='text-sm text-[#EDEDEF]'>
									{selectedField.name} → {selectedCourse.title} →{" "}
									<span className='text-[#5E6AD2]'>{selectedTopic.title}</span>
								</p>
							</div>
							<button
								onClick={() => onConfirm({ field: selectedField!, course: selectedCourse!, topic: selectedTopic! })}
								className='rounded-xl bg-[#5E6AD2] px-4 py-2 text-sm text-white flex items-center gap-2 hover:bg-[#5E6AD2]/90 transition-colors'
							>
								Continue
								<ChevronRight className="h-4 w-4" />
							</button>
						</GlowCard>
					</motion.div>
				)}
			</AnimatePresence>

			{selectedTopic && selectedField && selectedCourse && (
				<motion.button
					whileTap={{ scale: 0.97 }}
					onClick={() => onConfirm({ field: selectedField!, course: selectedCourse!, topic: selectedTopic! })}
					className='mt-4 w-full rounded-xl bg-[#5E6AD2] px-6 py-3 text-sm font-medium text-white flex items-center justify-center gap-2 hover:bg-[#5E6AD2]/90 transition-colors'
				>
					Confirm & Continue
					<ChevronRight className="h-4 w-4" />
				</motion.button>
			)}
		</div>
	);
}
