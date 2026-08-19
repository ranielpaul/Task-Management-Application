import { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';

function EmptyFormField({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      <input
        type="text"
        aria-label={label}
        value={value}
        placeholder={label}
        className="h-9 w-full rounded border border-gray-300 bg-white px-3 text-sm text-gray-700 placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600"
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function EmptyFormTextarea({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      <textarea
        aria-label={label}
        value={value}
        placeholder={label}
        rows={3}
        className="w-full resize-y rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600"
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function CheckboxField({ label, value, onChange }) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        aria-label={label}
        checked={value}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
      />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
}

function ModalShell({ title, onCancel, children, footer }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
            title="Close"
            onClick={onCancel}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-3">{children}</div>

        <div className="mt-6 flex justify-end gap-2">{footer}</div>
      </div>
    </div>
  );
}

export function AddTaskForm({ onCreateTask, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    onCreateTask?.({ title, description, isComplete });
  }

  return (
    <ModalShell
      title="Add Task"
      onCancel={onCancel}
      footer={
        <>
          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded border border-gray-300 px-4 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="add-task-form"
            className="flex h-9 items-center gap-2 rounded bg-teal-600 px-4 text-sm font-medium text-white hover:bg-teal-700"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add Task
          </button>
        </>
      }
    >
      <form id="add-task-form" className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <EmptyFormField label="Task title" value={title} onChange={setTitle} />
        <EmptyFormTextarea
          label="Task description"
          value={description}
          onChange={setDescription}
        />
        <div className="flex flex-col gap-1">
          <CheckboxField
            label="Completed"
            value={isComplete}
            onChange={setIsComplete}
          />
        </div>
      </form>
    </ModalShell>
  );
}

export function EditTaskForm({ selectedTask, onEditTask, onCancel }) {
  const [title, setTitle] = useState(selectedTask?.title ?? '');
  const [description, setDescription] = useState(selectedTask?.description ?? '');
  const [isComplete, setIsComplete] = useState(selectedTask?.is_complete ?? false);

  function handleSubmit(event) {
    event.preventDefault();
    onEditTask?.({ title, description, isComplete });
  }

  return (
    <ModalShell
      title="Edit Task"
      onCancel={onCancel}
      footer={
        <>
          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded border border-gray-300 px-4 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-task-form"
            className="flex h-9 items-center gap-2 rounded bg-teal-600 px-4 text-sm font-medium text-white hover:bg-sky-700"
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            Save Task
          </button>
        </>
      }
    >
      <form
        id="edit-task-form"
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        <EmptyFormField label="Task title" value={title} onChange={setTitle} />
        <EmptyFormTextarea
          label="Task description"
          value={description}
          onChange={setDescription}
        />
        <div className="flex flex-col gap-1">
          <CheckboxField
            label="Completed"
            value={isComplete}
            onChange={setIsComplete}
          />
        </div>
      </form>
    </ModalShell>
  );
}

export function TaskForm({ isOpen = false, selectedTask, onCreateTask, onEditTask, onCancel }) {
  if (!isOpen) {
    return null;
  }

  if (selectedTask) {
    return (
      <EditTaskForm
        key={selectedTask.id}
        selectedTask={selectedTask}
        onEditTask={onEditTask}
        onCancel={onCancel}
      />
    );
  }

  return <AddTaskForm onCreateTask={onCreateTask} onCancel={onCancel} />;
}

export default TaskForm;
