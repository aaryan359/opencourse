import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, Loader2 } from "lucide-react";
import FilterSelect from "./components/FilterSelect";
import QuestionCard from "./components/QuestionCard";
import { interviewApi } from "../../api/interview.api";

export type Question = {
id: string;
question: string;
answer: string;
companyName: string;
role: string;
skill: string;
Domain: string;
ExperienceLevel: string;
difficulty: "easy" | "medium" | "hard";
questiontype: "theory" | "practical";
};

export default function StartPrep() {
const [showFilters, setShowFilters] = useState(true);
const [search, setSearch] = useState("");
const [questions, setQuestions] = useState<Question[]>([]);
const [loading, setLoading] = useState(true);

const [filters, setFilters] = useState({
companyName: "",
difficulty: "",
role: "",
});

useEffect(() => {
interviewApi.list({ limit: 100 })
.then((res) => {
const docs: any[] = res.data?.data ?? [];
// Flatten each doc's qaPairs into individual Question entries
const flat: Question[] = [];
docs.forEach((doc) => {
(doc.qaPairs ?? []).forEach((pair: any, i: number) => {
flat.push({
id: `${doc._id}-${i}`,
question: pair.question,
answer: pair.answer,
companyName: doc.company ?? "",
role: doc.role ?? "",
skill: doc.role ?? "",
Domain: "-",
ExperienceLevel: "-",
difficulty: (pair.difficulty as "easy" | "medium" | "hard") ?? "medium",
questiontype: "theory",
});
});
});
setQuestions(flat);
})
.catch(() => {})
.finally(() => setLoading(false));
}, []);

const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
setFilters((p) => ({ ...p, [e.target.name]: e.target.value }));
};

// Derive unique filter options from loaded data
const companies = useMemo(() => [...new Set(questions.map((q) => q.companyName).filter(Boolean))].sort(), [questions]);
const roles = useMemo(() => [...new Set(questions.map((q) => q.role).filter(Boolean))].sort(), [questions]);

const filteredQuestions = useMemo(() => {
return questions.filter((q) => {
const matchesSearch =
q.question.toLowerCase().includes(search.toLowerCase()) ||
q.role.toLowerCase().includes(search.toLowerCase()) ||
q.companyName.toLowerCase().includes(search.toLowerCase());

return (
matchesSearch &&
(!filters.companyName || q.companyName === filters.companyName) &&
(!filters.difficulty || q.difficulty === filters.difficulty) &&
(!filters.role || q.role === filters.role)
);
});
}, [filters, search, questions]);

return (
<section className="min-h-screen bg-neutral-950 px-6 py-6">
<div className="max-w-7xl mx-auto">
{/* Header */}
<div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
<div>
<h1 className="text-3xl font-semibold text-white">Interview Practice</h1>
<p className="text-neutral-400 text-sm mt-1">
Practice curated interview questions with smart filters
</p>
</div>

<div className="relative w-full md:w-96">
<Search
size={16}
className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
/>
<input
value={search}
onChange={(e) => setSearch(e.target.value)}
placeholder="Search questions, company, role..."
className="w-full rounded-lg border border-white/10 bg-neutral-900 pl-9 pr-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-indigo-400/40 outline-none"
/>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
{/* Filter Panel */}
<AnimatePresence>
{showFilters && (
<motion.aside
initial={{ opacity: 0, x: -16 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -16 }}
className="sticky top-6 h-fit rounded-xl border border-white/10 bg-neutral-900/80 p-5">
<div className="flex items-center gap-2 mb-5 text-white">
<Filter size={16} />
<span className="font-medium">Filters</span>
</div>

<div className="space-y-4">
<FilterSelect
label="Company"
name="companyName"
values={companies}
onChange={handleChange}
/>
<FilterSelect
label="Difficulty"
name="difficulty"
values={["easy", "medium", "hard"]}
onChange={handleChange}
/>
<FilterSelect
label="Role"
name="role"
values={roles}
onChange={handleChange}
/>
</div>
</motion.aside>
)}
</AnimatePresence>

{/* Questions Area */}
<div className="rounded-xl border border-white/10 bg-neutral-900/40 p-6 h-[calc(100vh-240px)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
{loading ? (
<div className="flex items-center justify-center h-full">
<Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
</div>
) : (
<div className="space-y-4">
{filteredQuestions.length ? (
filteredQuestions.map((q) => (
<QuestionCard key={q.id} question={q} />
))
) : (
<div className="text-center text-neutral-400 py-10">
{questions.length === 0
? "No approved questions available yet."
: "No questions match your search or filters."}
</div>
)}
</div>
)}
</div>
</div>
</div>
</section>
);
}
