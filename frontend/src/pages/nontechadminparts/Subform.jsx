import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiChevronDown, FiChevronUp, FiUpload } from "react-icons/fi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { uploadVideoToSupabase, validateVideoFile } from '../../lib/videoUpload';

const Subform = ({ sub }) => {
  const { token } = useSelector((state) => state.auth);
  const NonTechSubTopicnameid = sub._id;

  const [qaPairs, setQAPairs] = useState([{ question: '', answer: '' }]);
  const [videos, setVideos] = useState([{ title: '', url: '', file: null }]);
  const [seefullform2, setseefullform2] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState({ 0: 'url' });

  const handleQAChange = (index, field, value) => {
    const newQAPairs = [...qaPairs];
    newQAPairs[index][field] = value;
    setQAPairs(newQAPairs);
  };

  const handleVideoChange = (index, field, value) => {
    const newVideos = [...videos];
    newVideos[index][field] = value;
    setVideos(newVideos);
  };

  const handleVideoFileChange = (index, file) => {
    if (file) {
      const validation = validateVideoFile(file);
      if (!validation.valid) {
        toast.error(validation.error, {
          position: "top-right",
          autoClose: 5000,
        });
        return;
      }
      const newVideos = [...videos];
      newVideos[index].file = file;
      newVideos[index].url = '';
      setVideos(newVideos);
    }
  };

  const toggleUploadMode = (index, mode) => {
    setUploadMode(prev => ({ ...prev, [index]: mode }));
    const newVideos = [...videos];
    if (mode === 'file') {
      newVideos[index].url = '';
    } else {
      newVideos[index].file = null;
    }
    setVideos(newVideos);
  };

  const handleAddQA = () => setQAPairs([...qaPairs, { question: '', answer: '' }]);

  const handleAddVideo = () => {
    const newIndex = videos.length;
    setVideos([...videos, { title: '', url: '', file: null }]);
    setUploadMode(prev => ({ ...prev, [newIndex]: 'url' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videos.length || !qaPairs.length) {
      toast.error('Please provide all the required details.');
      return;
    }

    const loadingToast = toast.loading('Uploading videos & QA...');
    setIsUploading(true);

    try {
      const processedVideos = await Promise.all(
        videos.map(async (video) => {
          if (video.file) {
            const uploadResult = await uploadVideoToSupabase(video.file, 'nontech-videos');
            if (!uploadResult.success) {
              throw new Error(`Failed to upload ${video.title}: ${uploadResult.error}`);
            }
            return { title: video.title, url: uploadResult.url };
          }
          return { title: video.title, url: video.url };
        })
      );

      const payload = {
        NonTechSubTopicnameid,
        Videos: processedVideos,
        qaPair: qaPairs.map(qa => ({ question: qa.question, answer: qa.answer })),
      };

      const response = await axios.post(
        'https://opencoursebackend-j3sa.onrender.com/nontech/addNonTechSubtopic',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.update(loadingToast, {
          render: 'Uploaded successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
        setVideos([{ title: '', url: '', file: null }]);
        setQAPairs([{ question: '', answer: '' }]);
        setUploadMode({ 0: 'url' });
      }
    } catch (error) {
      console.error('Error in submitting form:', error);
      toast.update(loadingToast, {
        render: error.message || 'Failed to upload video & QA',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
    >
      <div
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-700/30 transition-colors"
        onClick={() => setseefullform2(!seefullform2)}
      >
        <h2 className="text-xl font-semibold text-white">
          Subtopic: {sub.subtopicname}
        </h2>
        {seefullform2 ? (
          <FiChevronUp className="text-2xl text-yellow-400" />
        ) : (
          <FiChevronDown className="text-2xl text-yellow-400" />
        )}
      </div>

      {seefullform2 && (
        <div className="p-6 border-t border-slate-700 space-y-6">
          <div className="space-y-4">
            <label className="block text-slate-300 font-semibold text-lg">Videos</label>
            {videos.map((video, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-600 rounded-xl p-5 space-y-4">
                <div className="flex gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => toggleUploadMode(index, 'url')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                      uploadMode[index] === 'url'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    URL
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleUploadMode(index, 'file')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                      uploadMode[index] === 'file'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    Upload File
                  </button>
                </div>

                <input
                  type="text"
                  value={video.title}
                  onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
                  placeholder={`Video Title ${index + 1}`}
                  className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                {uploadMode[index] === 'url' ? (
                  <input
                    type="url"
                    value={video.url}
                    onChange={(e) => handleVideoChange(index, 'url', e.target.value)}
                    placeholder={`Video URL ${index + 1}`}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={uploadMode[index] === 'url'}
                  />
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleVideoFileChange(index, e.target.files[0])}
                      className="hidden"
                      id={`video-file-subform-${sub._id}-${index}`}
                    />
                    <label
                      htmlFor={`video-file-subform-${sub._id}-${index}`}
                      className="flex items-center justify-center w-full bg-slate-900 border-2 border-dashed border-slate-600 text-slate-300 rounded-lg px-4 py-6 cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <div className="text-center">
                        <FiUpload className="mx-auto text-3xl mb-2" />
                        <p className="font-medium">
                          {video.file ? video.file.name : 'Click to upload video'}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">MP4, WebM, OGG (max 500MB)</p>
                      </div>
                    </label>
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-white py-3 rounded-lg shadow-lg hover:from-yellow-700 hover:to-yellow-800 transition-all"
              onClick={handleAddVideo}
            >
              Add More Videos
            </button>
          </div>

          <div className="space-y-4">
            <label className="block text-slate-300 font-semibold text-lg">Questions & Answers</label>
            {qaPairs.map((qa, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={qa.question}
                  onChange={(e) => handleQAChange(index, 'question', e.target.value)}
                  placeholder={`Question ${index + 1}`}
                  className="bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  value={qa.answer}
                  onChange={(e) => handleQAChange(index, 'answer', e.target.value)}
                  placeholder="Answer"
                  className="bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-white py-3 rounded-lg shadow-lg hover:from-yellow-700 hover:to-yellow-800 transition-all"
              onClick={handleAddQA}
            >
              Add More Questions
            </button>
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className={`w-full py-4 rounded-lg font-semibold text-white shadow-lg transition-all ${
              isUploading
                ? 'bg-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
            }`}
          >
            {isUploading ? 'Uploading...' : 'Upload Video & QA'}
          </button>
        </div>
      )}
    </form>
  );
};

export default Subform;
