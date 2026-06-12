import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import { Todo } from '@/types';
import clsx from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const priorityConfig = {
  low: { dot: 'bg-emerald-400', badge: 'bg-emerald-50 text-emerald-600', label: 'Low' },
  medium: { dot: 'bg-amber-400', badge: 'bg-amber-50 text-amber-600', label: 'Med' },
  high: { dot: 'bg-red-400', badge: 'bg-red-50 text-red-600', label: 'High' },
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);

  function handleEdit(): void {
    if (editText.trim() && editText.trim() !== todo.text) {
      onEdit(todo.id, editText);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') handleEdit();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  const pc = priorityConfig[todo.priority];

  return (
    <li
      className={clsx(
        'group bg-white rounded-2xl border shadow-sm px-4 py-3.5 flex items-center gap-3 transition-all duration-200',
        todo.completed ? 'border-gray-100 opacity-60' : 'border-gray-100 hover:border-indigo-200 hover:shadow-md'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-gray-300 hover:border-indigo-400'
        )}
      >
        {todo.completed && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </button>

      {/* Priority dot */}
      <span className={clsx('w-2 h-2 rounded-full flex-shrink-0', pc.dot)} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            type="text"
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleEdit}
            className="w-full text-sm text-gray-900 bg-transparent border-b-2 border-indigo-400 focus:outline-none pb-0.5"
          />
        ) : (
          <p
            className={clsx(
              'text-sm truncate',
              todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
            )}
          >
            {todo.text}
          </p>
        )}
      </div>

      {/* Priority badge */}
      <span className={clsx('text-xs font-medium px-2 py-0.5 rounded-lg flex-shrink-0', pc.badge)}>
        {pc.label}
      </span>

      {/* Actions */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
        {editing ? (
          <>
            <button
              onClick={handleEdit}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-emerald-500 hover:bg-emerald-50 transition"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setEditText(todo.text); setEditing(false); }}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 transition"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
