import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus, Trash2, CheckCircle, Loader2, ChevronLeft, AlertCircle,
  MessageCircle, User, Building2, Briefcase, Lock, Eye, Edit3
} from "lucide-react"

type QuestionAnswer = {
  id: string
  question: string
  answer: string
  difficulty: 'easy' | 'medium' | 'hard'
}

type SubmissionStage = 'form' | 'review' | 'success'

const COMPANIES = [
  "Google", "Amazon", "Microsoft", "Apple", "Meta",
  "Tesla", "Netflix", "Stripe", "Figma", "Vercel",
  "GitHub", "Notion", "Databricks", "Airbnb", "Uber",
  "Twitter", "Spotify", "Adobe", "Oracle", "IBM"
]

const ROLES = [
  "Frontend Engineer", "Backend Engineer", "Full Stack Engineer",
  "DevOps Engineer", "Data Scientist", "Product Manager",
  "UX Designer", "QA Engineer", "Security Engineer",
  "Machine Learning Engineer", "Solutions Architect", "Technical Lead"
]

export default function InterviewQuestions() {
  const [stage, setStage] = useState<SubmissionStage>('form')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [questions, setQuestions] = useState<QuestionAnswer[]>([])
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [currentDifficulty, setCurrentDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const addQuestion = useCallback(() => {
    if (currentQuestion.trim() && currentAnswer.trim()) {
      const newQuestion: QuestionAnswer = {
        id: Date.now().toString(),
        question: currentQuestion,
        answer: currentAnswer,
        difficulty: currentDifficulty
      }
      setQuestions([...questions, newQuestion])
      setCurrentQuestion('')
      setCurrentAnswer('')
      setCurrentDifficulty('medium')
    }
  }, [currentQuestion, currentAnswer, currentDifficulty, questions])

  const removeQuestion = useCallback((id: string) => {
    setQuestions(questions.filter(q => q.id !== id))
  }, [questions])

  const handleSubmit = useCallback(async () => {
    setSubmitting(true)
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSubmitting(false)
    setStage('review')
  }, [])

  const handleConfirmSubmit = useCallback(async () => {
    setSubmitting(true)
    // Simulate final submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSubmitting(false)
    setStage('success')
  }, [])

  const isFormValid = company && role && questions.length > 0

  return (
    <section className="min-h-screen bg-[#050506] text-[#EDEDEF]">
      <HeaderNav onBack={() => window.history.back()} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {(['form', 'review', 'success'] as const).map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    (stage === 'form' && i === 0) || (stage === 'review' && i <= 1) || (stage === 'success' && i <= 2)
                      ? 'bg-gradient-to-b from-emerald-500 to-green-600 text-white shadow-lg'
                      : stage === 'success' || (stage === 'review' && i < 1) || (stage === 'form' && i < 0)
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-white/5 text-[#8A8F98]'
                  }`}
                >
                  {i < (stage === 'success' ? 3 : stage === 'review' ? 2 : 1) ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < 2 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-all ${
                      i < (stage === 'success' ? 3 : stage === 'review' ? 2 : 1)
                        ? 'bg-emerald-500'
                        : 'bg-white/5'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex mt-4 text-xs">
            <div className="flex-1 text-center">
              <p className={stage === 'form' ? 'text-[#EDEDEF]' : 'text-[#8A8F98]'}>
                Enter Details
              </p>
            </div>
            <div className="flex-1 text-center">
              <p className={stage === 'review' ? 'text-[#EDEDEF]' : 'text-[#8A8F98]'}>
                Review
              </p>
            </div>
            <div className="flex-1 text-center">
              <p className={stage === 'success' ? 'text-[#EDEDEF]' : 'text-[#8A8F98]'}>
                Submitted
              </p>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {stage === 'form' && (
            <FormStage
              company={company}
              setCompany={setCompany}
              role={role}
              setRole={setRole}
              questions={questions}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              currentAnswer={currentAnswer}
              setCurrentAnswer={setCurrentAnswer}
              currentDifficulty={currentDifficulty}
              setCurrentDifficulty={setCurrentDifficulty}
              isAnonymous={isAnonymous}
              setIsAnonymous={setIsAnonymous}
              onAddQuestion={addQuestion}
              onRemoveQuestion={removeQuestion}
              isFormValid={isFormValid}
              onSubmit={handleSubmit}
              submitting={submitting}
            />
          )}

          {stage === 'review' && (
            <ReviewStage
              company={company}
              role={role}
              questions={questions}
              isAnonymous={isAnonymous}
              onBack={() => setStage('form')}
              onConfirm={handleConfirmSubmit}
              submitting={submitting}
            />
          )}

          {stage === 'success' && <SuccessStage company={company} role={role} />}
        </AnimatePresence>
      </div>
    </section>
  )
}

function HeaderNav({ onBack }: { onBack: () => void }) {
  return (
    <div className="sticky top-0 z-40 border-b border-white/10 bg-[#050506]/95 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
        >
          <ChevronLeft className="h-4 w-4 text-[#8A8F98] group-hover:text-[#EDEDEF] transition-colors" />
          <span className="text-sm text-[#8A8F98] group-hover:text-[#EDEDEF] transition-colors">
            Back
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/10 border border-emerald-500/30 flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Interview Questions</h1>
            <p className="text-xs text-[#8A8F98]">Share anonymous insights</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function FormStage({
  company,
  setCompany,
  role,
  setRole,
  questions,
  currentQuestion,
  setCurrentQuestion,
  currentAnswer,
  setCurrentAnswer,
  currentDifficulty,
  setCurrentDifficulty,
  isAnonymous,
  setIsAnonymous,
  onAddQuestion,
  onRemoveQuestion,
  isFormValid,
  onSubmit,
  submitting
}: any) {
  const [companyInputFocus, setCompanyInputFocus] = useState(false)
  const [roleInputFocus, setRoleInputFocus] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Share Your Experience</h2>
        <p className="text-[#8A8F98]">
          Help others prepare by sharing interview questions and insights from your experience.
        </p>
      </div>

      {/* Company & Role Selection */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-[#EDEDEF] mb-2">
            <p className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Company
            </p>
          </label>
          <div className="relative">
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onFocus={() => setCompanyInputFocus(true)}
              onBlur={() => setCompanyInputFocus(false)}
              placeholder="Select or type company name..."
              className="w-full px-4 py-3 rounded-xl bg-[#0F0F12] border border-white/10 text-[#EDEDEF] placeholder:text-[#8A8F98] focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
            {companyInputFocus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 left-0 right-0 bg-[#0F0F12] border border-white/10 rounded-xl z-50 max-h-48 overflow-y-auto"
              >
                {COMPANIES.filter(c =>
                  c.toLowerCase().includes(company.toLowerCase())
                ).map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCompany(c)
                      setCompanyInputFocus(false)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors text-sm"
                  >
                    {c}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-[#EDEDEF] mb-2">
            <p className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Role
            </p>
          </label>
          <div className="relative">
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              onFocus={() => setRoleInputFocus(true)}
              onBlur={() => setRoleInputFocus(false)}
              placeholder="Select or type role..."
              className="w-full px-4 py-3 rounded-xl bg-[#0F0F12] border border-white/10 text-[#EDEDEF] placeholder:text-[#8A8F98] focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
            {roleInputFocus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 left-0 right-0 bg-[#0F0F12] border border-white/10 rounded-xl z-50 max-h-48 overflow-y-auto"
              >
                {ROLES.filter(r =>
                  r.toLowerCase().includes(role.toLowerCase())
                ).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r)
                      setRoleInputFocus(false)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors text-sm"
                  >
                    {r}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Edit3 className="h-5 w-5 text-emerald-400" />
          Question {questions.length + 1}
        </h3>

        {/* Question Input */}
        <div>
          <label className="block text-sm font-medium text-[#EDEDEF] mb-2">
            Question
          </label>
          <textarea
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            placeholder="What was the interview question asked to you?"
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-[#0F0F12] border border-white/10 text-[#EDEDEF] placeholder:text-[#8A8F98] focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
          />
        </div>

        {/* Answer Input */}
        <div>
          <label className="block text-sm font-medium text-[#EDEDEF] mb-2">
            Your Answer / Approach
          </label>
          <textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Describe your approach, solution, or answer..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-[#0F0F12] border border-white/10 text-[#EDEDEF] placeholder:text-[#8A8F98] focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-[#EDEDEF] mb-2">
            Difficulty Level
          </label>
          <div className="flex gap-3">
            {(['easy', 'medium', 'hard'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setCurrentDifficulty(level)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentDifficulty === level
                    ? level === 'easy'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : level === 'medium'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-white/5 border border-white/10 text-[#8A8F98]'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Add Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddQuestion}
          disabled={!currentQuestion.trim() || !currentAnswer.trim()}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Plus className="h-4 w-4" />
          Add Question
        </motion.button>
      </div>

      {/* Questions List */}
      {questions.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#8A8F98]">
            {questions.length} question{questions.length !== 1 ? 's' : ''} added
          </p>
          {questions.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative p-4 rounded-xl bg-white/[0.03] border border-white/10 group hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-white/5 text-[#8A8F98]">
                      Q{i + 1}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        q.difficulty === 'easy'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : q.difficulty === 'medium'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {q.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-[#EDEDEF] line-clamp-1">{q.question}</p>
                  <p className="text-xs text-[#8A8F98] line-clamp-2">{q.answer}</p>
                </div>
                <button
                  onClick={() => onRemoveQuestion(q.id)}
                  className="flex-shrink-0 p-2 rounded-lg hover:bg-rose-500/20 text-[#8A8F98] hover:text-rose-400 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Anonymous Toggle */}
      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isAnonymous ? (
              <Lock className="h-5 w-5 text-emerald-400" />
            ) : (
              <Eye className="h-5 w-5 text-amber-400" />
            )}
            <div>
              <p className="text-sm font-medium text-[#EDEDEF]">
                {isAnonymous ? 'Anonymous' : 'Identifiable'} Submission
              </p>
              <p className="text-xs text-[#8A8F98]">
                {isAnonymous
                  ? 'Your identity will be completely hidden'
                  : 'Your profile will be visible'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
              isAnonymous ? 'bg-emerald-500/30' : 'bg-white/10'
            }`}
          >
            <span
              className={`inline-flex h-5 w-5 transform rounded-full bg-white transition-transform ${
                isAnonymous ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[#EDEDEF] hover:bg-white/10 transition-all font-medium"
        >
          Cancel
        </button>
        <motion.button
          whileHover={isFormValid ? { scale: 1.02 } : {}}
          whileTap={isFormValid ? { scale: 0.98 } : {}}
          onClick={onSubmit}
          disabled={!isFormValid || submitting}
          className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
            isFormValid && !submitting
              ? 'bg-gradient-to-b from-emerald-500 to-green-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-white/5 text-[#8A8F98] cursor-not-allowed'
          }`}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4" />
              Next Step
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}

function ReviewStage({
  company,
  role,
  questions,
  isAnonymous,
  onBack,
  onConfirm,
  submitting
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Review Your Submission</h2>
        <p className="text-[#8A8F98]">
          Make sure everything looks good before submitting.
        </p>
      </div>

      {/* Submission Info Card */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-[#8A8F98] mb-1">Company</p>
            <p className="text-lg font-semibold text-white">{company}</p>
          </div>
          <div>
            <p className="text-xs text-[#8A8F98] mb-1">Role</p>
            <p className="text-lg font-semibold text-white">{role}</p>
          </div>
        </div>
        <div className="pt-4 border-t border-white/10 flex items-center gap-3">
          {isAnonymous ? (
            <>
              <Lock className="h-5 w-5 text-emerald-400" />
              <p className="text-sm text-[#EDEDEF]">
                This submission will be <span className="font-semibold">completely anonymous</span>
              </p>
            </>
          ) : (
            <>
              <AlertCircle className="h-5 w-5 text-amber-400" />
              <p className="text-sm text-[#EDEDEF]">
                Your profile will be <span className="font-semibold">publicly visible</span>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Questions Preview */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">
          Questions ({questions.length})
        </h3>
        <div className="space-y-3">
          {questions.map((q: any, i: number) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">Q{i + 1}.</span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded ${
                      q.difficulty === 'easy'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : q.difficulty === 'medium'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </div>
              </div>
              <p className="text-sm text-[#EDEDEF] mb-3">{q.question}</p>
              <div className="pl-4 border-l-2 border-emerald-500/30">
                <p className="text-xs text-[#8A8F98] mb-1">Answer/Approach:</p>
                <p className="text-sm text-[#EDEDEF] whitespace-pre-wrap">
                  {q.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={onBack}
          disabled={submitting}
          className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[#EDEDEF] hover:bg-white/10 transition-all font-medium disabled:opacity-50"
        >
          Back
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConfirm}
          disabled={submitting}
          className="flex-1 py-3 rounded-xl bg-gradient-to-b from-emerald-500 to-green-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4" />
              Submit
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}

function SuccessStage({ company, role }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="py-12"
    >
      <div className="text-center space-y-8">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
          className="flex justify-center"
        >
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/10 border-2 border-emerald-500/50 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-emerald-400" />
          </div>
        </motion.div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-white">
            Thank You!
          </h2>
          <p className="text-lg text-[#8A8F98]">
            Your interview experience has been submitted successfully
          </p>
        </div>

        {/* Submission Details */}
        <div className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#8A8F98]">Company:</span>
              <span className="font-semibold text-white">{company}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8A8F98]">Role:</span>
              <span className="font-semibold text-white">{role}</span>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-[#EDEDEF]">
                Submitted anonymously
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="max-w-md mx-auto space-y-3">
          <p className="text-sm text-[#8A8F98]">
            What happens next?
          </p>
          <div className="space-y-2 text-sm text-left">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/10">
              <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                1
              </div>
              <p className="text-[#EDEDEF]">Our team will review your submission</p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/10">
              <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                2
              </div>
              <p className="text-[#EDEDEF]">Once approved, it'll be visible to other users</p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/10">
              <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                3
              </div>
              <p className="text-[#EDEDEF]">You'll help countless interview aspirants</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/explore'}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[#EDEDEF] hover:bg-white/10 transition-all font-medium"
          >
            Explore More
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/contribute'}
            className="px-6 py-3 rounded-xl bg-gradient-to-b from-emerald-500 to-green-600 text-white font-medium shadow-lg hover:shadow-xl"
          >
            Submit More
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

