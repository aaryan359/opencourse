import { useState } from "react"
import FlowHeader from "../components/FlowHeader"
import TopicFlow from "../components/TopicFlow"
import UploadStage from "../components/UploadStage"
import ReviewStage from "../components/ReviewStage"
import { mockContent } from "../../../utils/mockContent"

export default function UploadVideo() {
  const [selection, setSelection] = useState<any>(null)
  const [stage, setStage] = useState<"select" | "upload" | "review">("select")

  return (
    <section className="min-h-screen bg-neutral-950 py-24">
      <div className="max-w-7xl mx-auto px-6 space-y-14">

        <FlowHeader stage={stage} />

        {stage === "select" && (
          <TopicFlow
            domains={mockContent.tech}
            onConfirm={(data: any) => {
              setSelection(data)
              setStage("upload")
            }}
          />
        )}

        {stage === "upload" && (
          <UploadStage
            context={selection}
            onNext={() => setStage("review")}
          />
        )}

        {stage === "review" && (
          <ReviewStage
            miniTopic={selection.miniTopic}
          />
        )}

      </div>
    </section>
  )
}
