import React, { useState, useEffect } from "react";
import Timeline1 from "../Components/Timeline";
import axios from "axios";
import '../../src/index.css';
import '../App.css';





const UserPanel = () => {
	// Store fields and subtopics
	const [fieldData, setFieldData] = useState([]);
	// Track selected field
	const [selectedField, setSelectedField] = useState(null);
	// Track selected subtopic
	const [selectedSubtopic, setSelectedSubtopic] = useState(null);

	// Store videos for selected subtopic
	const [videos, setVideos] = useState([]);

	// Fetch fields and subtopics when the component mounts
	useEffect(() => {
		const getFieldData = async () => {
			try {
				const response = await axios.get(
					"https://opencoursebackend.onrender.com/user/getfields"
				);
				setFieldData(response.data);
			} catch (error) {
				console.error(
					"Error fetching field data:",
					error
				);
			}
		};
		getFieldData();
	}, []);

	const fetchVideosForSubtopic = async (fieldId, subtopicName) => {
    
	
		try {

			const response = await axios.get(
				`https://opencoursebackend.onrender.com/user/fields/${fieldId}/subtopic/${subtopicName}/videos`
			);


			setVideos(response.data);

		} catch (error) {
			console.error("Error fetching videos:", error);
		}
	};

	const handleFieldSelect = (field) => {
		setSelectedField(field);

		// Reset subtopic when a new field is selected
		setSelectedSubtopic(null);

		// Clear videos when changing field
		setVideos([]);
	};

	const handleSubtopicSelect = (subtopicName) => {
		// console.log("Selected subtopic:", subtopicName);

		setSelectedSubtopic(subtopicName);

		// Pass subtopicName directly since it's a string now
		fetchVideosForSubtopic(selectedField._id, subtopicName);
	};

	return (
		<div className="container mx-auto p-10 min-h-screen bg-bg-dark">
			{/* Field Selection */}
			<div className="mb-6 text-start">
				{fieldData.map((field) => (
					<button
						key={field._id}
						onClick={() =>
							handleFieldSelect(field)
						}
						className={`w-[220px] h-[50px] mr-4 px-6 py-3 rounded-lg transition-colors duration-300 ${
							selectedField?._id ===
							field._id
								? "bg-blue-600 text-white"
								: "bg-gray-300 text-gray-800 hover:bg-gray-400"
						} truncate`}>
						{field.name}
					</button>
				))}
			</div>

			{/* Content Section */}
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
				{/* Timeline Section */}
				<div className="col-span-1 p-4 rounded-md   h-[calc(100vh - 100px)] overflow-y-auto">
					{selectedField && (
						<div>
							<h2 className="text-2xl font-semibold mb-4 text-gray-100">
								Course Roadmap
								for{" "}
								{
									selectedField.name
								}
							</h2>
							<Timeline1
								data={selectedField.subtopic.map(
									(
										subtopic
									) =>
										subtopic.name
								)}
								onSubtopicClick={
									handleSubtopicSelect
								}
							/>
						</div>
					)}
				</div>

				{/* Videos Section */}
				<div className="col-span-1 lg:col-span-3 p-4 rounded-md  h-[calc(100vh - 100px)] overflow-y-auto">
					{selectedSubtopic &&  (
						<div>
							<h3 className="text-2xl font-semibold mb-4 text-gray-100">
								Videos for{" "}
								{
									selectedSubtopic
								}
							</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
								{videos.map(
									(
										video
									) => (
										<div
											key={
												video._id
											}
											className="border-2 border-purple-600 shadow-xl rounded-lg px-2 pt-3">
											<h3 className="text-xl font-semibold mb-1 ml-1 text-gray-50">
												{
													video.title
												}
											</h3>
											<iframe
												width="100%"
												height="215"
												loading="lazy"
												src={`https://www.youtube.com/embed/${getYoutubeVideoId(
													video.url
												)}`}
												title={
													video.title
												}
												frameBorder="0"
												allowFullScreen
												className="rounded-lg"></iframe>
										</div>
									)
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

//  function to extract video url
const getYoutubeVideoId = (url) => {
	const regExp =
		/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	const match = url.match(regExp);
	return match && match[2].length === 11 ? match[2] : null;
};

export default UserPanel;
