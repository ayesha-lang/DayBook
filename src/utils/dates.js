const pad = (n) => String(n).padStart(2, '0');
const fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const todayStr = () => fmt(new Date());

export function addDays(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return fmt(d);
}

function dayDiff(str) {
  const [y, m, d] = str.split('-').map(Number);
  const [ty, tm, td] = todayStr().split('-').map(Number);
  return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(ty, tm - 1, td)) / 86400000);
}

function longDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  const opts = { weekday: 'short', day: 'numeric', month: 'short' };
  if (y !== new Date().getFullYear()) opts.year = 'numeric';
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', opts);
}

export function dueInfo(task) {
  const diff = dayDiff(task.due);
  let label = longDate(task.due);
  let cls = '';
  if (diff === 0) {
    label = 'Today';
    cls = task.done ? '' : 'today';
  } else if (diff === 1) {
    label = 'Tomorrow';
  } else if (diff === -1) {
    if (task.done) label = 'Yesterday';
    else { label = 'Overdue 1d'; cls = 'overdue'; }
  } else if (diff < -1 && !task.done) {
    label = `Overdue ${-diff}d`;
    cls = 'overdue';
  }
  return { label, cls, full: longDate(task.due) };
}

export function headerDate() {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
}