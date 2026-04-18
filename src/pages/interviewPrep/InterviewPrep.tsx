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
    const showFilters = true;
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
                const docs: any[] = Array.isArray(res.data?.data) ? res.data.data : [];
                // Flatten each doc's qaPairs into individual Question entries
                const flat: Question[] = [];
                docs.forEach((doc) => {
                    const qaPairs = Array.isArray(doc?.qaPairs) ? doc.qaPairs : [];
                    qaPairs.forEach((pair: any, i: number) => {
                        flat.push({
                            id: `${doc._id ?? doc.id ?? 'q'}-${i}`,
                            question: pair?.question ?? "",
                            answer: pair?.answer ?? "",
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
            .catch(() => {
                setQuestions([]);
            })
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
        <section className="min-h-screen bg-[#050506] px-6 py-8 relative overflow-hidden">
            {/* Background gradient blobs */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#5E6AD2]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs text-[#8A8F98] font-mono tracking-wider uppercase mb-4"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2] animate-pulse" />
                            Interview Prep
                        </motion.span>
                        <h1 className="text-3xl font-semibold bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">Interview Practice</h1>
                        <p className="text-[#8A8F98] text-sm mt-1">
                            Practice curated interview questions with smart filters
                        </p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8F98]"
                        />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search questions, company, role..."
                            className="w-full rounded-xl border border-white/[0.08] bg-[#0f0f12] pl-9 pr-3 py-2.5 text-sm text-[#EDEDEF] placeholder-[#8A8F98]/60 focus:border-[#5E6AD2]/50 focus:ring-1 focus:ring-[#5E6AD2]/30 outline-none transition-all duration-200"
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
                                className="sticky top-6 h-fit rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-5">
                                <div className="flex items-center gap-2 mb-5 text-[#EDEDEF]">
                                    <Filter size={16} className="text-[#5E6AD2]" />
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
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 h-[calc(100vh-240px)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <Loader2 className="w-8 h-8 animate-spin text-[#5E6AD2]" />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredQuestions.length ? (
                                    filteredQuestions.map((q) => (
                                        <QuestionCard key={q.id} question={q} />
                                    ))
                                ) : (
                                    <div className="text-center text-[#8A8F98] py-10">
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
