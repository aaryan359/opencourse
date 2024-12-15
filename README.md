# OpenCourse

OpenCourse is a collaborative platform where users can contribute and learn together. Users can describe what they want from a course and, if they have knowledge, they can contribute by adding their own topics. The platform supports video uploads and Q&A related to specific topics and subfields, allowing users to explore learning paths and contribute their expertise.

## Features

- **Contribute Knowledge**: Users can upload videos and Q&A for specific fields and subtopics.

- **Learn Together**: Users can explore various learning paths and content submitted by others.

- **Roadmaps**: Fields and subtopics are structured in a roadmap, guiding users through relevant topics in a systematic way.

- **Interview Prep**: 
---

## Tech Stack

- **Frontend**: React.js vite 

- **Backend**: Node.js (Express)

- **Database**: MongoDB 



---

## Models

### Tech Models

1. **Field Model**  

   Represents different domains of knowledge, such as Web Development, Data Science, etc.

   
   **Attributes**:

   - `name`: The name of the field (e.g., "Web Development")
   - `description`: A brief description of the field.
   - `roadmap`: A list of subfields and their associated topics.

2. **Subtopic Model** 

   Represents the topics under a specific field or branch.
   
   **Attributes**:
   - `name`: The name of the subtopic (e.g., "HTML Basics").
   - `fieldId`: A reference to the associated field.
   - `content`: Description and overview of the subtopic.


3. **Video Model**  

   Represents videos uploaded by users for a specific subtopic.
   
   **Attributes**:
   - `videoUrl`: The URL of the video uploaded by a user.
   - `subtopicId`: A reference to the associated subtopic.
   - `uploadedBy`: A reference to the user who uploaded the video.
   - `description`: A description of the video content.

4. **User Model**  

   Represents the users of the platform.
   
   **Attributes**:
   - `name`: The user's name.
   - `email`: The user's email.
   - `password`: The user's password (encrypted).
   - `contributions`: A list of topics or videos contributed by the user.

---

## Non-Tech Models




### Non-Tech Fields

1. **Branch of Fields**  
   Represents different branches within non-technical fields such as "Arts," "Psychology," etc.
   
   **Attributes**:
   - `name`: The name of the branch (e.g., "Fine Arts").
   - `description`: A brief description of the branch.

2. **Subtopics of Branches**  
   Similar to the subtopics of tech fields, each branch will have subtopics associated with them.

---

## API Endpoints

Here is a general overview of the API structure for OpenCourse:

- **User Management**:
  - `POST /signup`: Register a new user.
  - `POST /login`: User login and authentication.

- **Field Management**:
  - `GET /fields`: Get all available fields (tech and non-tech).
  - `POST /fields`: Create a new field (admin only).

- **Subtopic Management**:
  - `GET /fields/:fieldId/subtopics`: Get subtopics for a specific field.
  - `POST /fields/:fieldId/subtopics`: Create a new subtopic (admin only).

- **Video Management**:
  - `GET /subtopics/:subtopicId/videos`: Get all videos for a subtopic.
  - `POST /subtopics/:subtopicId/videos`: Upload a new video for a subtopic.

---


## Getting Started

### Prerequisites

To run this project locally, you will need the following:

- Node.js (if using a Node.js backend) or Python (for a Python-based backend)
- MongoDB/MySQL (depending on the database choice)
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aaryan359/opencourse.git
   cd opencourse

   cd frontend
   npm install
   npm run dev


   cd backend
   npm install
   DB_URL=your-database-url
   JWT_SECRET=your-jwt-secret
   npm run dev

   

# nontechmodels
## nontechfields
### branch of fields
#### subtopics of that branch

  
      // const handleAddQA = () => setQAPairs([...qaPairs, { question: '', answer: '' }]);
    
      // const handleQAChange = (index, field, value) => {
      //   const newQAPairs = [...qaPairs];
      //   newQAPairs[index][field] = value;
      //   setQAPairs(newQAPairs);
      // };
    
      // const handleUpload = () => {
      //   if (!videoURL || !qaPairs[0].question || !qaPairs[0].answer) {
      //     setError('Please provide a valid video URL and at least one question-answer pair.');
      //     return;
      //   }
    
      //   if (videos.length >= 5) {
      //     setError('You have reached the maximum upload limit of 5 videos for this topic.');
      //     return;
      //   }
    
      //   setVideos([...videos, videoURL]);
      //   setSuccessMessage('Video and Q&A uploaded successfully!');
      //   setVideoURL('');
      //   setQAPairs([{ question: '', answer: '' }]);
      // };
     {/* {error && <div className="bg-red-500 text-white p-4 rounded-md">{error}</div>}
          {successMessage && <div className="bg-green-500 text-white p-4 rounded-md">{successMessage}</div>} */}

