import Container from "../../components/ui/Container";

const sections = [
	{
		id: "overview",
		title: "1. What Is OpenCourse?",
		content:
			"OpenCourse is a full-stack learning platform for students, contributors, and admins. Students learn from approved course videos and interview content. Contributors add new content. Admins review and control quality before public publish.",
	},
	{
		id: "tech-stack",
		title: "2. Tech Stack",
		content:
			"Frontend uses React + Vite + TypeScript + Tailwind CSS + Redux Toolkit. Backend uses Node.js + Express + TypeScript + MongoDB (Mongoose). Authentication uses JWT. Deployment uses GitHub Actions and GitHub Pages for frontend.",
	},
	{
		id: "architecture",
		title: "3. Architecture (High Level)",
		content:
			"Architecture is split into frontend app, API server, and database. Frontend calls REST APIs. Server validates auth and roles, executes business logic, and stores data in MongoDB. Admin moderation controls what content becomes publicly visible.",
	},
	{
		id: "course-flow",
		title: "4. Course Learning Flow",
		content:
			"Data model follows Field -> Course -> Topic -> Video. Learner opens a course, browses topics, and watches approved videos only. Pending or rejected videos are never shown on public course pages.",
	},
	{
		id: "interview-flow",
		title: "5. Interview Prep Flow",
		content:
			"Contributor submits interview Q&A set. Status starts as pending. Admin reviews and either approves or rejects. Public interview prep page fetches only approved content.",
	},
	{
		id: "contribute",
		title: "6. How To Contribute",
		content:
			"Step 1: Register and log in. Step 2: Apply for contributor role. Step 3: Admin approves application. Step 4: Use Contribute page to upload course video or submit interview questions. Step 5: Wait for moderation decision.",
	},
	{
		id: "admin-review",
		title: "7. Admin Review Rules",
		content:
			"Admin dashboard includes moderation queues for contributor applications, videos, and interview questions. Approval changes status to approved and exposes content to users. Rejection keeps content hidden and records review feedback.",
	},
	{
		id: "roles",
		title: "8. User Roles and Access",
		content:
			"Student can browse and learn. Contributor can submit content. Admin can manage users, applications, and moderation. API routes are protected by auth middleware and role middleware.",
	},
	{
		id: "security",
		title: "9. Security and Auth",
		content:
			"JWT is used for user sessions. Backend validates token and checks current role from database for protected routes. This avoids stale-role issues after admin approval. Unauthorized access returns proper 401/403 responses.",
	},
	{
		id: "api-modules",
		title: "10. API Modules",
		content:
			"Main API modules: auth, user, course, topic, video, interview, admin. Public endpoints return only approved content. Admin endpoints are strictly protected and include review operations.",
	},
	{
		id: "frontend-architecture",
		title: "11. Frontend Architecture",
		content:
			"Frontend uses route-based pages, reusable UI components, and API service files for data calls. Redux manages auth state and app session behavior. Layout components provide shared header/footer shell.",
	},
	{
		id: "ci-cd",
		title: "12. CI/CD and Deployment",
		content:
			"GitHub Actions builds the frontend on push, then deploys dist to gh-pages branch. Vite base path is configured for project pages hosting. This ensures CSS/JS assets load correctly from /opencourse/.",
	},
	{
		id: "deployment",
		title: "13. Production Checklist",
		content:
			"Checklist: 1) Build passes. 2) Deploy workflow succeeds. 3) gh-pages branch updated. 4) Pages source points to gh-pages /(root). 5) Base path matches repository path. 6) Public routes tested after deployment.",
	},
];

const quickActions = [
	{
		label: "Start Learning",
		href: "/courses",
	},
	{
		label: "Contribute Content",
		href: "/contribute",
	},
	{
		label: "Practice Interview",
		href: "/prep",
	},
];

export default function Docs() {
	return (
		<div className="min-h-screen bg-neutral-950 text-white">
			<section className="border-b border-white/10 bg-neutral-950 py-16">
				<Container>
					<p className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-200">
						OpenCourse Documentation
					</p>
					<h1 className="mt-5 text-4xl font-extrabold md:text-5xl">
						Simple Guide: How This Website Works
					</h1>
					<p className="mt-4 max-w-3xl text-neutral-300">
						This page explains the complete OpenCourse flow in very simple language. Use this when
						you want to understand the product, contribute content, or present the project.
					</p>
				</Container>
			</section>

			<section className="py-12">
				<Container>
					<div className="grid gap-8 lg:grid-cols-[280px_1fr]">
						<aside className="h-fit rounded-2xl border border-white/10 bg-white/3 p-5 lg:sticky lg:top-24">
							<p className="mb-3 text-sm font-bold text-white">On This Page</p>
							<nav className="space-y-2">
								{sections.map((section) => (
									<a
										key={section.id}
										href={`#${section.id}`}
										className="block rounded-lg border border-white/8 bg-white/2 px-3 py-2 text-sm font-medium text-neutral-200 transition hover:bg-white/5"
									>
										{section.title}
									</a>
								))}
							</nav>
						</aside>

						<main className="space-y-5">
							{sections.map((section) => (
								<article
									id={section.id}
									key={section.id}
									className="rounded-2xl border border-white/10 bg-white/3 p-6"
								>
									<h2 className="text-xl font-bold text-white">{section.title}</h2>
									<p className="mt-3 leading-7 text-neutral-300">{section.content}</p>
								</article>
							))}

							<section className="rounded-2xl border border-white/10 bg-white/3 p-6">
								<h2 className="text-xl font-bold">Quick Actions</h2>
								<p className="mt-2 text-neutral-300">
									Use these shortcuts to directly open key parts of the platform.
								</p>
								<div className="mt-4 grid gap-3 sm:grid-cols-3">
									{quickActions.map((action) => (
										<a
											key={action.href}
											href={action.href}
											className="rounded-xl border border-white/15 bg-white px-4 py-3 text-center text-sm font-bold text-black transition hover:bg-neutral-200"
										>
											{action.label}
										</a>
									))}
								</div>
							</section>
						</main>
					</div>
				</Container>
			</section>
		</div>
	);
}
