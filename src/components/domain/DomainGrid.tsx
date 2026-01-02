import { mockContent } from "../../utils/mockContent";
import DomainCard from "./DomainCard";


export default function DomainGrid() {
  return (
    <div className="space-y-16">
      {(["tech", "nonTech"] as const).map((type) => (
        <section key={type}>
          <h2 className="mb-6 text-2xl font-semibold text-white">
            {type === "tech" ? "Tech Domains" : "Non-Tech Domains"}
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {mockContent[type].map((d) => (
              <DomainCard
                key={d.id}
                domain={{
                  name: d.title,
                  contributors: d.subtopics.length * 5,
                  href: `/courses/${type}/${d.id}`,
                }}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
