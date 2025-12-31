export default function InterviewQuestions() {
  return (
    <section className="min-h-screen bg-neutral-950 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl text-white mb-6">
          Interview Questions (Anonymous)
        </h1>

        <input
          placeholder="Company"
          className="mb-4 w-full rounded-xl bg-neutral-900 p-4 text-white"
        />

        <input
          placeholder="Role"
          className="mb-4 w-full rounded-xl bg-neutral-900 p-4 text-white"
        />

        <textarea
          placeholder="Questions and answers"
          className="min-h-[180px] w-full rounded-xl bg-neutral-900 p-4 text-white"
        />

        <button className="mt-6 rounded-xl bg-indigo-500 px-6 py-3 text-white">
          Submit
        </button>
      </div>
    </section>
  )
}
