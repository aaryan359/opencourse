export default function ExploreToolbar({
  query,
  onQueryChange,
  sort,
  onSortChange,
}: any) {
  return (
    <div className="flex items-center justify-between gap-4 z-50">
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search videos…"
        className="
          w-full max-w-sm
          rounded-xl bg-neutral-900
          px-4 py-2 text-sm
          text-white placeholder-neutral-500
          outline-none focus:ring-2 focus:ring-indigo-500/40
        "
      />

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="
          rounded-xl bg-neutral-900
          px-4 py-2 text-sm text-white
          outline-none
        "
      >
        <option value="rating">Highest Rating</option>
        <option value="views">Most Viewed</option>
        <option value="upvotes">Most Upvoted</option>
      </select>
    </div>
  );
}
