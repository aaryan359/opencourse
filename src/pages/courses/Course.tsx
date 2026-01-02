import DomainGrid from "../../components/domain/DomainGrid";
export default function DomainsPage() {
  return (
    <main className="min-h-screen bg-black px-8 py-20">
      {/* Header */}
      <div className="mb-12 max-w-3xl">
        <h1 className="text-4xl font-semibold text-white">
          Explore Learning Paths
        </h1>
        <p className="mt-3 text-neutral-400">
          Structured, community-driven courses designed for real-world skills.
        </p>
      </div>

      {/* Domains */}
      <DomainGrid />
    </main>
  );
}
