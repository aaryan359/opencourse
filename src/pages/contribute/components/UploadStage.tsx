import GlowCard from "../../../components/ui/GlowCard"
import { motion } from "framer-motion"
import { Upload, FileVideo, AlertCircle, Link, Play, X } from "lucide-react"
import { useState, useRef, useCallback } from "react"

interface VideoFormData {
  title: string
  description: string
  url: string
}

export default function UploadStage({ context, onNext }: { context: any; onNext: (data: VideoFormData) => void }) {
  const [form, setForm] = useState<VideoFormData>({ title: "", description: "", url: "" })
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMode, setUploadMode] = useState<"file" | "url">("url")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith("video/")) {
      setFile(droppedFile)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // Auto-fill title from file name
      if (!form.title) {
        setForm(f => ({ ...f, title: selectedFile.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ") }))
      }
    }
  }, [form.title])

  const handleFileUpload = useCallback(async () => {
    if (!file) return
    setIsUploading(true)
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 25
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setUploadProgress(100)
        // In a real app you'd upload to S3/Cloudinary and get back a URL
        const fakeUrl = `https://cdn.opencourse.dev/videos/${Date.now()}`
        setTimeout(() => {
          setIsUploading(false)
          setForm(f => ({ ...f, url: fakeUrl }))
        }, 400)
      } else {
        setUploadProgress(progress)
      }
    }, 300)
  }, [file])

  const isValid = form.title.trim() && form.url.trim()

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Context - Left Side */}
      <GlowCard className="lg:col-span-1 h-fit sticky top-20">
        <div className="space-y-4">
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
              Uploading to
            </p>
            <h3 className="text-white font-semibold text-lg mt-2">
              {context.domain.title}
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              {context.subtopic.title}
            </p>
          </div>

          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-neutral-400 mb-2">Focus Area</p>
            <div className="inline-block px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm font-medium">
              {context.miniTopic.title}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="text-xs space-y-2">
              <div className="flex items-start gap-2">
                <div className="h-1 w-1 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <p className="text-neutral-300">YouTube / hosted URL or file upload</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-1 w-1 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <p className="text-neutral-300">MP4, WebM, MOV — max 2GB</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-1 w-1 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <p className="text-neutral-300">High quality recommended</p>
              </div>
            </div>
          </div>
        </div>
      </GlowCard>

      {/* Form + Upload - Right Side */}
      <div className="lg:col-span-2 space-y-6">

        {/* Video Metadata */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
          <h3 className="text-white font-semibold">Video Details</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-neutral-400 mb-1 block">Title <span className="text-rose-400">*</span></label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Introduction to Binary Search Trees"
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-neutral-400 mb-1 block">Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="What will learners gain from this video?"
                rows={3}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Upload Mode Toggle */}
        <div className="flex gap-2">
          {(["url", "file"] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setUploadMode(mode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                uploadMode === mode ? "bg-indigo-600 text-white" : "bg-white/5 text-neutral-400 hover:text-white"
              }`}
            >
              {mode === "url" ? <Link className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
              {mode === "url" ? "Video URL" : "Upload File"}
            </button>
          ))}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploadMode === "url" ? (
          /* URL Input */
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
            <h4 className="text-white font-medium flex items-center gap-2"><Link className="h-4 w-4 text-indigo-400" />Video URL</h4>
            <p className="text-xs text-neutral-400">Paste a YouTube link or any public video URL</p>
            <input
              type="url"
              value={form.url}
              onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
              placeholder="https://youtube.com/watch?v=... or https://..."
              className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
        ) : !file ? (
          // Dropzone
          <motion.div
            whileHover={{ scale: 1.01 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative overflow-hidden rounded-2xl border-2 border-dashed
              p-12 text-center cursor-pointer transition-all
              ${isDragging
                ? "border-indigo-500/50 bg-indigo-500/10"
                : "border-white/20 bg-white/[0.03] hover:border-indigo-500/30 hover:bg-indigo-500/5"
              }
            `}
          >
            <div className="space-y-4">
              <motion.div animate={{ y: isDragging ? -5 : 0 }} className="flex justify-center">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-400/10 border border-indigo-500/30 flex items-center justify-center">
                  <Upload className="h-10 w-10 text-indigo-400" />
                </div>
              </motion.div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">{isDragging ? "Drop your video here" : "Upload your video"}</h4>
                <p className="text-sm text-neutral-400 mb-4">Drag and drop your file or click to browse</p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-sm font-medium">
                <FileVideo className="h-4 w-4" /> Browse Files
              </div>
            </div>
          </motion.div>
        ) : (
          // File selected
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-400/10 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                  <FileVideo className="h-8 w-8 text-indigo-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1 truncate">{file.name}</h4>
                  <p className="text-sm text-neutral-400">{formatFileSize(file.size)}</p>
                </div>
                <button onClick={() => { setFile(null); setUploadProgress(0); setForm(f => ({ ...f, url: "" })) }}
                  className="p-2 rounded-lg hover:bg-rose-500/20 text-rose-400 transition-colors"><X className="h-4 w-4" /></button>
              </div>
              {/* Auto-upload the file to get a URL */}
              {!form.url && (
                <div className="mt-4">
                  {isUploading ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-400">Uploading...</span>
                        <span className="text-white">{Math.round(uploadProgress)}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} transition={{ duration: 0.3 }} className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400" />
                      </div>
                    </div>
                  ) : (
                    <button onClick={handleFileUpload} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                      <Upload className="h-4 w-4" /> Upload File
                    </button>
                  )}
                </div>
              )}
              {form.url && <p className="mt-3 text-xs text-emerald-400">✓ Upload complete</p>}
            </motion.div>
          </div>
        )}

        {/* Continue Button */}
        <motion.button
          whileHover={{ scale: isValid ? 1.02 : 1 }}
          whileTap={{ scale: isValid ? 0.98 : 1 }}
          onClick={() => isValid && onNext(form)}
          disabled={!isValid}
          className="w-full py-4 rounded-xl bg-gradient-to-b from-emerald-500 to-green-600 text-white font-semibold shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          <Play className="h-4 w-4" />
          {form.title && form.url ? "Review & Submit" : "Fill in title and video URL to continue"}
        </motion.button>

        {/* Tips Section */}
        <GlowCard className="border-amber-500/20 bg-amber-500/5">
          <div className="flex gap-4">
            <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-semibold text-amber-400">Tips for success</h4>
              <ul className="text-sm text-neutral-400 space-y-1">
                <li>• Ensure video quality is at least 720p</li>
                <li>• Use clear audio and avoid background noise</li>
                <li>• Keep videos between 5-30 minutes for best engagement</li>
              </ul>
            </div>
          </div>
        </GlowCard>
      </div>
    </div>
  )
}
