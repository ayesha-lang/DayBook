export default function EmptyState({ total, filter, query }) {
  let msg;
  if (total === 0) msg = 'Nothing here yet. Type a task above and press Enter.';
  else if (query.trim()) msg = `No tasks match \u201C${query.trim()}\u201D.`;
  else if (filter === 'active') msg = 'No active tasks. Everything is done.';
  else msg = 'No completed tasks yet.';
  return (
    <p className="rounded-xl border border-dashed border-edge px-4 py-9 text-center text-muted">{msg}</p>
  );
}