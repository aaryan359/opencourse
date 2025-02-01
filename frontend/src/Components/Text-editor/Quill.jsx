import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
  [{ size: ["small", false, "large", "huge"] }], // Text Size
  [{ list: "ordered" }, { list: "bullet" }], // Ordered & Bullet Lists
];

const Editor = ({ setContent }) => {
  const [content, setLocalContent] = useState("");

  const handleChange = (value) => {
    setLocalContent(value);

    // Pass the raw HTML content to the parent
    setContent(value);
    
  };

  return (
    <div className="w-[500px] p-4 mt-12 shadow-lg rounded-lg">
      {/* ReactQuill Editor */}
      <div className="p-1 rounded-lg bg-gray-200 overflow-hidden">
        <ReactQuill
          value={content}
          onChange={handleChange}
          modules={{ toolbar: toolbarOptions, }}
          placeholder="Write your content here..."
          theme="snow"
          className="h-52"
        />
      </div>
    </div>
  );
};

export default Editor;




