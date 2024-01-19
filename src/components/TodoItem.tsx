"use client";

import { Trash2 } from "lucide-react";

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
    <li className="flex justify-between w-full flex-1 bg-gray-900 p-4 rounded-xl">
      <div className="flex w-full flex-1 gap-4 items-center">
        <input
          type="checkbox"
          name="complete"
          id={id}
          className="peer tooltip appearance-none w-6 h-6 border-1 rounded-full bg-white checked:bg-gray-800 checked:border-4 checked:border-white"
          data-tip="Complete"
          defaultChecked={complete}
          onChange={(e) => handleCompleteTodo(id, e.target.checked)}
        />
        <label
          htmlFor={id}
          className=" peer-checked:text-zinc-400 peer-checked:line-through"
        >
          {title}
        </label>
      </div>
      <div className="flex gap-4 text-gray-100">
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
