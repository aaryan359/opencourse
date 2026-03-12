import GlowCard from "../../../components/ui/GlowCard"
import { motion } from "framer-motion"
import { Upload, FileVideo, AlertCircle, HardDrive, Play } from "lucide-react"
import { useState, useRef, useCallback } from "react"

export default function UploadStage({ context, onNext }: any) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
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
    }
  }, [])

  const handleUpload = useCallback(async () => {
    if (!file) return

    setIsUploading(true)
    
    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 25
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setUploadProgress(100)
        
        setTimeout(() => {
          setIsUploading(false)
          onNext()
        }, 500)
      } else {
        setUploadProgress(progress)
      }
    }, 300)
  }, [file, onNext])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i]
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
                <p className="text-neutral-300">Support MP4, WebM, MOV</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-1 w-1 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <p className="text-neutral-300">Max size: 2GB</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-1 w-1 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <p className="text-neutral-300">High quality recommended</p>
              </div>
            </div>
          </div>
        </div>
      </GlowCard>

      {/* Upload Area - Right Side */}
      <div className="lg:col-span-2 space-y-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {!file ? (
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
              <motion.div
                animate={{ y: isDragging ? -5 : 0 }}
                className="flex justify-center"
              >
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-400/10 border border-indigo-500/30 flex items-center justify-center">
                  <Upload className="h-10 w-10 text-indigo-400" />
                </div>
              </motion.div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  {isDragging ? "Drop your video here" : "Upload your video"}
                </h4>
                <p className="text-sm text-neutral-400 mb-4">
                  Drag and drop your file or click to browse
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-sm font-medium">
                <FileVideo className="h-4 w-4" />
                Browse Files
              </div>
            </div>
          </motion.div>
        ) : (
          // File selected - show preview and upload
          <div className="space-y-6">
            {/* File Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-400/10 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                  <FileVideo className="h-8 w-8 text-indigo-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1 truncate">
                    {file.name}
                  </h4>
                  <p className="text-sm text-neutral-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setFile(null)
                    setUploadProgress(0)
                  }}
                  className="px-4 py-2 rounded-lg hover:bg-rose-500/20 text-rose-400 text-sm font-medium transition-colors"
                >
                  Remove
                </button>
              </div>
            </motion.div>

            {/* Upload Progress */}
            {isUploading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white">Uploading...</p>
                  <p className="text-sm text-neutral-400">
                    {Math.round(uploadProgress)}%
                  </p>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400"
                  />
                </div>
              </motion.div>
            )}

            {/* Upload Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full py-4 rounded-xl bg-gradient-to-b from-emerald-500 to-green-600 text-white font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              <Play className="h-4 w-4" />
              {isUploading ? "Uploading..." : "Upload & Continue"}
            </motion.button>
          </div>
        )}

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
