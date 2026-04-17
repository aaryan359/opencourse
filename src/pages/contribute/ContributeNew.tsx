import { useSearchParams, Navigate, Link } from "react-router-dom";
import UploadVideo from "./modes/UploadVideo";
import InterviewQuestions from "./modes/InterviewQuestions";

export default function ContributeNew() {
	const [params] = useSearchParams();
	const type = params.get("type");

	// Keep contribute entry simple: choose one mode first.
	if (!type) {
		return (
			<section className='min-h-screen bg-[#050506] text-[#EDEDEF] px-6 py-24'>
				<div className='max-w-3xl mx-auto'>
					<h1 className='text-3xl font-semibold mb-3'>Contribute</h1>
					<p className='text-[#8A8F98] mb-10'>
						Choose how you want to contribute.
					</p>

					<div className='grid sm:grid-cols-2 gap-4'>
						<Link
							to='/contribute/new?type=video'
							className='rounded-xl border border-white/8 bg-white/3 p-6 hover:bg-white/6 transition-colors'
						>
							<h2 className='text-lg font-medium mb-2'>Upload Video</h2>
							<p className='text-sm text-[#8A8F98]'>Share a helpful learning video for a topic.</p>
						</Link>

						<Link
							to='/contribute/new?type=interview'
							className='rounded-xl border border-white/8 bg-white/3 p-6 hover:bg-white/6 transition-colors'
						>
							<h2 className='text-lg font-medium mb-2'>Interview Questions</h2>
							<p className='text-sm text-[#8A8F98]'>Post interview Q&A to help others prepare.</p>
						</Link>
					</div>
				</div>
			</section>
		);
	}

	// Route to the selected contribution mode.
	if (type === "video") return <UploadVideo />;
	if (type === "interview") return <InterviewQuestions />;

	// Fallback for unknown query value.
	return <Navigate to='/contribute' replace />;
}
