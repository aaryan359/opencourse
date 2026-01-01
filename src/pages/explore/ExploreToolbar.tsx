export default function ExploreToolbar({
  query,
  onQueryChange,
  sort,
  onSortChange,
  title,
}: any) {
  return (
    <div className="
      sticky top-0 z-10
      bg-neutral-950/90 backdrop-blur
      pb-4
    ">
      {title && (
        <h2 className="text-lg font-semibold text-white mb-3">
          {title}
        </h2>
      )}

      <div className="flex items-center justify-between gap-4">
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search videos…"
          className="
            w-full max-w-sm
            rounded-xl bg-neutral-900
            px-4 py-2 text-sm text-white
            placeholder-neutral-500
            focus:ring-2 focus:ring-indigo-500/40
          "
        />

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="
            rounded-xl bg-neutral-900
            px-4 py-2 text-sm text-white
          "
        >
          <option value="rating">Top Rated</option>
          <option value="views">Most Viewed</option>
          <option value="upvotes">Most Upvoted</option>
        </select>
      </div>
    </div>
  );
}