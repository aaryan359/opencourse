import Container from "../../../components/ui/Container"
import Button from "../../../components/ui/Button"

export default function CTA() {
  return (
 <section className="relative py-40 overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_60%)]" />
  <Container>
    <div className="relative z-10 text-center">
      <h2 className="text-5xl font-semibold text-white">
        Knowledge should never be static.
      </h2>
      <p className="mt-4 text-lg text-neutral-400">
        Help shape the future of open, community-driven learning.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <Button className="shadow-[0_0_40px_rgba(99,102,241,0.35)]">
          Join OpenCourse
        </Button>
        <Button variant="secondary">Contribute</Button>
      </div>
    </div>
  </Container>
</section>

  )
}
