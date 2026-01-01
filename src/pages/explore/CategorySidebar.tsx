export default function CategorySidebar({
  domains,
  activeMiniTopic,
  onSelectMiniTopic,
}: any) {
  return (
    <div className="space-y-6">
      {domains.map((domain: any) => (
        <div key={domain.id}>
          <h3 className="text-xs font-semibold uppercase text-neutral-500 mb-3">
            {domain.title}
          </h3>

          {domain.subtopics.map((sub: any) => (
            <div key={sub.id} className="mb-4">
              <p className="text-sm font-medium text-white mb-2">
                {sub.title}
              </p>

              <div className="space-y-1">
                {sub.miniTopics.map((mini: any) => {
                  const active = activeMiniTopic?.id === mini.id;

                  return (
                    <button
                      key={mini.id}
                      onClick={() => onSelectMiniTopic(mini)}
                      className={`
                        w-full text-left px-3 py-2 rounded-lg text-sm
                        transition
                        ${
                          active
                            ? "bg-white/10 text-white"
                            : "text-neutral-400 hover:bg-white/5 hover:text-white"
                        }
                      `}
                    >
                      {mini.title}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
