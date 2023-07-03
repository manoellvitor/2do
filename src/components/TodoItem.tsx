"use client";
import { Edit, Trash2 } from "lucide-react";

interface TodoItemProps {
  id: string;
  title: string;
  complete: boolean;
  handleCompleteTodo: (id: string, complete: boolean) => void;
  handleDeleteTodo: (id: string) => void;
}

export async function TodoItem({
  id,
  title,
  complete,
  handleCompleteTodo,
  handleDeleteTodo,
}: TodoItemProps) {
  return (
    <li className="flex items-center justify-between border-b-2 border-b-zinc-700 pb-2">
      <div className="flex items-center gap-2 text-zinc-100">
        <input
          type="checkbox"
          name="complete"
          id={id}
          className="peer checkbox-sm tooltip"
          data-tip="Complete"
          defaultChecked={complete}
          onChange={(e) => handleCompleteTodo(id, e.target.checked)}
        />
        <label
          htmlFor={id}
          className="uppercase peer-checked:text-zinc-400 peer-checked:line-through"
        >
          {title}
        </label>
      </div>
      <div className="flex gap-4 text-zinc-100">
        <div className="tooltip" data-tip="Delete">
          <Trash2
            size={20}
            className="cursor-pointer transition-colors duration-300 hover:text-red-800"
            onClick={(e) => handleDeleteTodo(id)}
          />
        </div>
      </div>
    </li>
  );
}
