import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { coursesApi } from '@/api/courses.api';
import type { Course, CourseLevel, CourseSortOption } from '@/types';


const levelRank: Record<CourseLevel, number> = {
	beginner: 1,
	intermediate: 2,
	advanced: 3,
};


const levelBadge: Record<CourseLevel, string> = {
	beginner: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
	intermediate: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
	advanced: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
};


const sortOptions: Array<{ value: CourseSortOption; label: string }> = [
	{ value: 'newest', label: 'Newest first' },
	{ value: 'oldest', label: 'Oldest first' },
	{ value: 'title-asc', label: 'Title A-Z' },
	{ value: 'title-desc', label: 'Title Z-A' },
	{ value: 'level-asc', label: 'Level: Beginner -> Advanced' },
	{ value: 'level-desc', label: 'Level: Advanced -> Beginner' },
];



export default function CoursesPage() {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [searchText, setSearchText] = useState('');
	const [selectedLevel, setSelectedLevel] = useState<'all' | CourseLevel>('all');
	const [selectedField, setSelectedField] = useState<'all' | string>('all');
	const [sortBy, setSortBy] = useState<CourseSortOption>('newest');

	useEffect(() => {
		const loadCourses = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await coursesApi.getAllCourses();
				const payload = response?.data?.data;

				if (!Array.isArray(payload)) {
					throw new Error('Invalid courses response');
				}

				setCourses(payload as Course[]);
			} catch (err: unknown) {
				const message =
					err instanceof Error ? err.message : 'Failed to load courses. Please try again.';
				setError(message);
			} finally {
				setLoading(false);
			}
		};

		void loadCourses();
	}, []);

	const fieldOptions = useMemo(() => {
		const unique = new Map<string, string>();
		for (const course of courses) {
			if (course.field?.name) {
				unique.set(course.field.slug, course.field.name);
			}
		}
		return Array.from(unique.entries()).map(([slug, name]) => ({ slug, name }));
	}, [courses]);

	const filteredCourses = useMemo(() => {
		const query = searchText.trim().toLowerCase();

		const visible = courses.filter((course) => {
			if (!course.isPublished) {
				return false;
			}

			if (selectedLevel !== 'all' && course.level !== selectedLevel) {
				return false;
			}

			if (selectedField !== 'all' && course.field?.slug !== selectedField) {
				return false;
			}

			if (!query) {
				return true;
			}

			const searchable = [course.title, course.description, course.field?.name]
				.filter(Boolean)
				.join(' ')
				.toLowerCase();

			return searchable.includes(query);
		});

		const sorted = [...visible];
		sorted.sort((a, b) => {
			if (sortBy === 'newest') {
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
			}
			if (sortBy === 'oldest') {
				return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
			}
			if (sortBy === 'title-asc') {
				return a.title.localeCompare(b.title);
			}
			if (sortBy === 'title-desc') {
				return b.title.localeCompare(a.title);
			}
			if (sortBy === 'level-asc') {
				return levelRank[a.level] - levelRank[b.level];
			}
			return levelRank[b.level] - levelRank[a.level];
		});

		return sorted;
	}, [courses, searchText, selectedLevel, selectedField, sortBy]);

	return (
		<section className='min-h-screen bg-[#050506] px-4 py-12 font-sans text-zinc-100 md:px-8 md:py-16'>
			<div className='mx-auto w-full max-w-7xl'>
				<div className='mb-8 rounded-2xl border border-white/10 bg-[#0b0b10] p-6 md:mb-10 md:p-8'>
					<p className='mb-3 text-sm tracking-wide text-zinc-400'>OpenCourse Catalog</p>
					<h1 className='text-3xl font-semibold leading-tight md:text-4xl'>
						Explore Courses
					</h1>
					<p className='mt-3 max-w-2xl text-sm text-zinc-400 md:text-base'>
						Search and filter by level or field to find the right path for your learning.
					</p>

					<div className='mt-6 grid gap-3 md:mt-7 md:grid-cols-4'>
						<input
							value={searchText}
							onChange={(event) => setSearchText(event.target.value)}
							placeholder='Search by title, description, or field...'
							className='md:col-span-2 h-11 rounded-lg border border-white/10 bg-[#121218] px-3 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30'
						/>

						<select
							value={selectedLevel}
							onChange={(event) =>
								setSelectedLevel(event.target.value as 'all' | CourseLevel)
							}
							className='h-11 rounded-lg border border-white/10 bg-[#121218] px-3 text-sm text-zinc-100 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30'
						>
							<option value='all'>All levels</option>
							<option value='beginner'>Beginner</option>
							<option value='intermediate'>Intermediate</option>
							<option value='advanced'>Advanced</option>
						</select>

						<select
							value={selectedField}
							onChange={(event) => setSelectedField(event.target.value)}
							className='h-11 rounded-lg border border-white/10 bg-[#121218] px-3 text-sm text-zinc-100 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30'
						>
							<option value='all'>All fields</option>
							{fieldOptions.map((field) => (
								<option key={field.slug} value={field.slug}>
									{field.name}
								</option>
							))}
						</select>
					</div>

					<div className='mt-3 flex flex-wrap items-center justify-between gap-3'>
						<p className='text-sm text-zinc-400'>
							Showing <span className='font-medium text-zinc-200'>{filteredCourses.length}</span>{' '}
							courses
						</p>

						<div className='flex items-center gap-2'>
							<span className='text-sm text-zinc-400'>Sort:</span>
							<select
								value={sortBy}
								onChange={(event) => setSortBy(event.target.value as CourseSortOption)}
								className='h-9 rounded-lg border border-white/10 bg-[#121218] px-3 text-sm text-zinc-100 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30'
							>
								{sortOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{loading && (
					<div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
						{Array.from({ length: 6 }).map((_, index) => (
							<div
								key={index}
								className='h-72 animate-pulse rounded-2xl border border-white/10 bg-[#0b0b10]'
							/>
						))}
					</div>
				)}

				{!loading && error && (
					<div className='rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-rose-200'>
						{error}
					</div>
				)}

				{!loading && !error && filteredCourses.length === 0 && (
					<div className='rounded-2xl border border-white/10 bg-[#0b0b10] p-8 text-center'>
						<h2 className='text-xl font-semibold'>No courses found</h2>
						<p className='mt-2 text-sm text-zinc-400'>
							Try changing filters or search text.
						</p>
					</div>
				)}

				{!loading && !error && filteredCourses.length > 0 && (
					<div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
						{filteredCourses.map((course) => (
							<article
								key={course._id}
								className='group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b10] transition hover:-translate-y-0.5 hover:border-indigo-500/40'
							>
								<div className='relative h-44 w-full overflow-hidden bg-[#121218]'>
									{course.thumbnail ? (
										<img
											src={course.thumbnail}
											alt={course.title}
											className='h-full w-full object-cover transition duration-300 group-hover:scale-105'
										/>
									) : (
										<div className='flex h-full items-center justify-center bg-linear-to-br from-indigo-500/20 to-cyan-500/10 px-4 text-center text-sm text-zinc-300'>
											{course.field?.name || 'OpenCourse'}
										</div>
									)}

									<span
										className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${levelBadge[course.level]}`}
									>
										{course.level}
									</span>
								</div>

								<div className='flex flex-1 flex-col p-5'>
									<p className='text-xs uppercase tracking-wide text-zinc-500'>
										{course.field?.name || 'General'}
									</p>

									<h2 className='mt-2 line-clamp-2 text-lg font-semibold leading-snug'>
										{course.title}
									</h2>

									<p className='mt-2 line-clamp-3 text-sm text-zinc-400'>
										{course.description}
									</p>

									<div className='mt-auto pt-5'>
										<Link
											to={`/courses/${course._id}`}
											className='inline-flex items-center rounded-lg bg-indigo-500/20 px-3 py-2 text-sm font-medium text-indigo-300 transition hover:bg-indigo-500/30'
										>
											View Course
										</Link>
									</div>
								</div>
							</article>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
