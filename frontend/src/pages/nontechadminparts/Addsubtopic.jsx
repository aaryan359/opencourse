import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiChevronDown, FiChevronUp, FiVideo, FiUpload } from "react-icons/fi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Subform from './Subform';
import { uploadVideoToSupabase, validateVideoFile } from '../../lib/videoUpload';

const Addsubtopicnontech = () => {
  const { token } = useSelector((state) => state.auth);
  const { state } = useLocation();
  const { field } = state || {};

  const [NonTechSubTopicnameid, setSelectedSubtopicid] = useState('');
  const [qaPairs, setQAPairs] = useState([{ question: '', answer: '' }]);
  const [videos, setVideos] = useState([{ title: '', url: '', file: null }]);
  const [seefullform, setseefullform] = useState(false);
  const [error, setError] = useState(null);
  const [fieldid, setfieldid] = useState('');
  const [NonTechSubTopicname, setSelectedSubtopic] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState({});

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
      setError('Please provide all the required details.');
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
        fieldid,
        NonTechSubTopicname,
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
        setSelectedSubtopic('');
        setSelectedSubtopicid('');
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

  useEffect(() => {
    if (field) {
      setfieldid(field._id);
    }
  }, [field]);

  useEffect(() => {
    setUploadMode({ 0: 'url' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3 flex items-center justify-center gap-3">
            <FiVideo className="text-blue-400" />
            {field?.branchname || 'Course Management'}
          </h1>
          <p className="text-slate-400">Add and manage course content</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
          <div
            className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-700/30 transition-colors"
            onClick={() => setseefullform(!seefullform)}
          >
            <h2 className="text-2xl font-semibold text-white">Add New Subtopic</h2>
            {seefullform ? (
              <FiChevronUp className="text-2xl text-blue-400" />
            ) : (
              <FiChevronDown className="text-2xl text-blue-400" />
            )}
          </div>

          {seefullform && (
            <div className="p-6 border-t border-slate-700 space-y-6">
              <div>
                <label className="block text-slate-300 font-semibold mb-2">Subtopic Name</label>
                <input
                  type="text"
                  value={NonTechSubTopicname}
                  onChange={(e) => setSelectedSubtopic(e.target.value)}
                  placeholder="Enter Subtopic Name"
                  className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

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
                          id={`video-file-${index}`}
                        />
                        <label
                          htmlFor={`video-file-${index}`}
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

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Contribute to Existing Subtopics</h2>
          <div className="space-y-4">
            {field?.subtopic?.map((sub) => (
              <Subform key={sub._id} sub={sub} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addsubtopicnontech;
