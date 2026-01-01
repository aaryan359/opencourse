"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search } from "lucide-react";
import FilterSelect from "./components/FilterSelect";
import QuestionCard from "./components/QuestionCard";

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

const QUESTIONS: Question[] = [
	{
		id: "1",
		question: "What is hoisting in JavaScript?",
		answer: "Hoisting is JavaScript’s default behavior of moving declarations to the top of their scope.",
		companyName: "google",
		role: "frontend developer",
		skill: "javascript",
		Domain: "web development",
		ExperienceLevel: "fresher",
		difficulty: "easy",
		questiontype: "theory",
	},
	{
		id: "2",
		question: "Explain closures in JavaScript.",
		answer: "A closure allows a function to access variables from an outer scope even after execution.",
		companyName: "amazon",
		role: "frontend developer",
		skill: "javascript",
		Domain: "web development",
		ExperienceLevel: "mid",
		difficulty: "medium",
		questiontype: "theory",
	},
	{
		id: "2",
		question: "Explain closures in JavaScript.",
		answer: "A closure allows a function to access variables from an outer scope even after execution.",
		companyName: "amazon",
		role: "frontend developer",
		skill: "javascript",
		Domain: "web development",
		ExperienceLevel: "mid",
		difficulty: "medium",
		questiontype: "theory",
	},
	{
		id: "2",
		question: "Explain closures in JavaScript.",
		answer: "A closure allows a function to access variables from an outer scope even after execution.",
		companyName: "amazon",
		role: "frontend developer",
		skill: "javascript",
		Domain: "web development",
		ExperienceLevel: "mid",
		difficulty: "medium",
		questiontype: "theory",
	},

	{
		id: "2",
		question: "Explain closures in JavaScript.",
		answer: "A closure allows a function to access variables from an outer scope even after execution.",
		companyName: "amazon",
		role: "frontend developer",
		skill: "javascript",
		Domain: "web development",
		ExperienceLevel: "mid",
		difficulty: "medium",
		questiontype: "theory",
	},
	{
		id: "2",
		question: "Explain closures in JavaScript.",
		answer: "A closure allows a function to access variables from an outer scope even after execution.",
		companyName: "amazon",
		role: "frontend developer",
		skill: "javascript",
		Domain: "web development",
		ExperienceLevel: "mid",
		difficulty: "medium",
		questiontype: "theory",
	},

	{
		id: "2",
		question: "Explain closures in JavaScript.",
		answer: "A closure allows a function to access variables from an outer scope even after execution.",
		companyName: "amazon",
		role: "frontend developer",
		skill: "javascript",
		Domain: "web development",
		ExperienceLevel: "mid",
		difficulty: "medium",
		questiontype: "theory",
	},

	{
		id: "2",
		question: "Explain closures in JavaScript.",
		answer: "A closure allows a function to access variables from an outer scope even after execution.",
		companyName: "amazon",
		role: "frontend developer",
		skill: "javascript",
		Domain: "web development",
		ExperienceLevel: "mid",
		difficulty: "medium",
		questiontype: "theory",
	},

	{
		id: "2",
		question: "Explain closures in JavaScript.",
		answer: "A closure allows a function to access variables from an outer scope even after execution.",
		companyName: "amazon",
		role: "frontend developer",
		skill: "javascript",
		Domain: "web development",
		ExperienceLevel: "mid",
		difficulty: "medium",
		questiontype: "theory",
	},

	{
		id: "2",
		question: "Explain closures in JavaScript.",
		answer: "A closure allows a function to access variables from an outer scope even after execution.",
		companyName: "amazon",
		role: "frontend developer",
		skill: "javascript",
		Domain: "web development",
		ExperienceLevel: "mid",
		difficulty: "medium",
		questiontype: "theory",
	},

	{
		id: "2",
		question: "Explain closures in JavaScript.",
		answer: "A closure allows a function to access variables from an outer scope even after execution.",
		companyName: "amazon",
		role: "frontend developer",
		skill: "javascript",
		Domain: "web development",
		ExperienceLevel: "mid",
		difficulty: "medium",
		questiontype: "theory",
	},
];

export default function StartPrep() {
	const [showFilters, setShowFilters] = useState(true);
	const [search, setSearch] = useState("");

	const [filters, setFilters] = useState({
		skill: "",
		companyName: "",
		difficulty: "",
		role: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilters((p) => ({ ...p, [e.target.name]: e.target.value }));
	};

	const filteredQuestions = useMemo(() => {
		return QUESTIONS.filter((q) => {
			const matchesSearch =
				q.question.toLowerCase().includes(search.toLowerCase()) || q.skill.toLowerCase().includes(search.toLowerCase());

			return (
				matchesSearch &&
				(!filters.skill || q.skill === filters.skill) &&
				(!filters.companyName || q.companyName === filters.companyName) &&
				(!filters.difficulty || q.difficulty === filters.difficulty)
			);
		});
	}, [filters, search]);

	return (
		<section className='min-h-screen bg-neutral-950 px-6 py-6'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
					<div>
						<h1 className='text-3xl font-semibold text-white'>Interview Practice</h1>
						<p className='text-neutral-400 text-sm mt-1'>
							Practice curated interview questions with smart filters
						</p>
					</div>

					{/* Search */}
					<div className='relative w-full md:w-96'>
						<Search
							size={16}
							className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400'
						/>
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder='Search questions, skills...'
							className='
                w-full rounded-lg
                border border-white/10
                bg-neutral-900
                pl-9 pr-3 py-2
                text-sm text-white
                placeholder-neutral-500
                focus:border-indigo-400/40
                outline-none
              '
						/>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8'>
					{/* ===== FILTER PANEL ===== */}
					<AnimatePresence>
						{showFilters && (
							<motion.aside
								initial={{ opacity: 0, x: -16 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -16 }}
								className='
								sticky top-6 h-fit
									rounded-xl
									border border-white/10
									bg-neutral-900/80
									p-5
									'>
								<div className='flex items-center gap-2 mb-5 text-white'>
									<Filter size={16} />
									<span className='font-medium'>Filters</span>
								</div>

								<div className='space-y-4'>
									<FilterSelect
										label='Skill'
										name='skill'
										values={["javascript"]}
										onChange={handleChange}
									/>
									<FilterSelect
										label='Company'
										name='companyName'
										values={["google", "amazon"]}
										onChange={handleChange}
									/>
									<FilterSelect
										label='Difficulty'
										name='difficulty'
										values={["easy", "medium", "hard"]}
										onChange={handleChange}
									/>
									<FilterSelect
										label='Role'
										name='role'
										values={["frontend", "backend", "node"]}
										onChange={handleChange}
									/>
									<FilterSelect
										label='Role'
										name='role'
										values={["frontend", "backend", "node"]}
										onChange={handleChange}
									/>
									<FilterSelect
										label='Role'
										name='role'
										values={["frontend", "backend", "node"]}
										onChange={handleChange}
									/>
									<FilterSelect
										label='Role'
										name='role'
										values={["frontend", "backend", "node"]}
										onChange={handleChange}
									/>

									<FilterSelect
										label='Role'
										name='role'
										values={["frontend", "backend", "node"]}
										onChange={handleChange}
									/>
								</div>
							</motion.aside>
						)}
					</AnimatePresence>

					{/* ===== QUESTIONS AREA ===== */}
					<div
						className='
							rounded-xl
							border border-white/10
							bg-neutral-900/40
							p-6
							no-scrollbar
							h-[calc(100vh-240px)]
							overflow-y-auto
							scrollbar-thin
							scrollbar-thumb-white/10
							scrollbar-track-transparent
						'>
						
						<div className='space-y-4'>
							{filteredQuestions.length ? (
								filteredQuestions.map((q) => (
									<QuestionCard
										key={q.id}
										question={q}
									/>
								))
							) : (
								<div className='text-center text-neutral-400 py-10'>
									No questions match your search or filters.
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
