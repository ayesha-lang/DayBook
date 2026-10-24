import { addDays } from './dates.js';

export const CATEGORIES = ['Work', 'Personal', 'Study'];
export const FILTERS = ['all', 'active', 'completed'];

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

export function seedTasks() {
  return [
    { id: uid(), text: 'Send Q4 budget draft to finance', cat: 'Work', due: addDays(0), done: false },
    { id: uid(), text: 'Review pull request for the checkout flow', cat: 'Work', due: addDays(1), done: false },
    { id: uid(), text: 'Call the dentist to reschedule', cat: 'Personal', due: addDays(-2), done: false },
    { id: uid(), text: 'Renew passport application', cat: 'Personal', due: addDays(12), done: false },
    { id: uid(), text: 'Finish chapter 6 problem set', cat: 'Study', due: addDays(3), done: false },
    { id: uid(), text: 'Flashcards: organic chemistry reactions', cat: 'Study', due: addDays(-1), done: true }
  ];
}

/* Make sure data read from localStorage has the right shape. */
export function normalize(data) {
  if (!data || !Array.isArray(data.tasks)) return null;
  const tasks = data.tasks
    .filter((t) => t && typeof t.text === 'string' && t.text.trim())
    .map((t) => ({
      id: typeof t.id === 'string' && t.id ? t.id : uid(),
      text: t.text.slice(0, 200),
      cat: CATEGORIES.includes(t.cat) ? t.cat : 'Personal',
      due: /^\d{4}-\d{2}-\d{2}$/.test(t.due || '') ? t.due : '',
      done: !!t.done
    }));
  return { tasks, sample: !!data.sample };
}

export function matchesFilter(task, filter) {
  return filter === 'all' || (filter === 'active' ? !task.done : task.done);
}

/* Put the visible tasks into a new order while keeping hidden tasks where they are. */
export function applyVisibleOrder(tasks, orderedIds) {
  const slots = orderedIds
    .map((id) => tasks.findIndex((t) => t.id === id))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b);
  if (slots.length !== orderedIds.length) return tasks;
  const byId = new Map(tasks.map((t) => [t.id, t]));
  const next = tasks.slice();
  orderedIds.forEach((id, i) => { next[slots[i]] = byId.get(id); });
  return next;
}