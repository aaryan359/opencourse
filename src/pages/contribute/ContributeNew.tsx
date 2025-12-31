import { useSearchParams, Navigate } from "react-router-dom";
import UploadVideo from "./modes/UploadVideo";
import InterviewQuestions from "./modes/InterviewQuestions";

export default function ContributeNew() {
	const [params] = useSearchParams();
	const type = params.get("type");

	if (!type)
		return (
			<Navigate
				to='/contribute'
				replace
			/>
		);

	if (type === "video") return <UploadVideo />;
	if (type === "interview") return <InterviewQuestions />;

	return (
		<Navigate
			to='/contribute'
			replace
		/>
	);
}
