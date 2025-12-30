import Container from "../../../components/ui/Container"
import Button from "../../../components/ui/Button"

export default function CTA() {
  return (
    <section className="py-40 relative overflow-hidden">
      <div className="mesh-bg" />
      <Container>
        <div className="text-center relative z-10">
          <h2 className="text-5xl font-bold">
            Knowledge should never be static.
          </h2>
          <p className="mt-4 text-xl text-neutral-300">
            Join OpenCourse and help build the future of learning.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button className="shadow-[0_0_40px_rgba(99,102,241,0.35)]">
              Join Now
            </Button>
            <Button variant="secondary">
              Contribute
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
