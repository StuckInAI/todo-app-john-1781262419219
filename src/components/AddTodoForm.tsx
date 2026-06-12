import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Priority } from '@/types';
import clsx from 'clsx';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const priorityOptions: { label: string; value: Priority; color: string }[] = [
  { label: 'Low', value: 'low', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { label: 'Medium', value: 'medium', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { label: 'High', value: 'high', color: 'bg-red-100 text-red-700 border-red-200' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState<string>('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority);
    setText('');
    setPriority('medium');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="w-10 h-10 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition shadow-sm"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="flex gap-2">
        <span className="text-xs text-gray-500 self-center mr-1">Priority:</span>
        {priorityOptions.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setPriority(opt.value)}
            className={clsx(
              'px-3 py-1 rounded-lg text-xs font-medium border transition',
              opt.color,
              priority === opt.value
                ? 'ring-2 ring-offset-1 ring-indigo-400 scale-105'
                : 'opacity-60 hover:opacity-100'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </form>
  );
}
