import { useSearchParams, Navigate } from "react-router-dom";
import UploadVideo from "./modes/UploadVideo";
import InterviewQuestions from "./modes/InterviewQuestions";

export default function ContributeNew() {
	const [params] = useSearchParams();
	const type = params.get("type");

	// If no type is specified, navigate to main contribute page
	if (!type) {
		return (
			<Navigate
				to='/contribute'
				replace
			/>
		);
	}

	// Route to the appropriate contribution mode
	if (type === "video") return <UploadVideo />;
	if (type === "interview") return <InterviewQuestions />;

	// Default fallback
	return (
		<Navigate
			to='/contribute'
			replace
		/>
	);
}
