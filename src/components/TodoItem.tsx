import { Check, Trash2 } from "lucide-react";

interface TodoItemProps {
  id: String;
  title: String;
  complete: Boolean;
}

export default async function TodoItem({ id, title, complete }: TodoItemProps) {
  return (
    <li className="flex justify-between items-center border-b-2 border-b-zinc-700 pb-2">
      <div className="flex gap-2 text-zinc-100">
        <input type="checkbox" name="" id="" />
        <p className="uppercase">{title}</p>
      </div>
      <div className="text-zinc-100 flex gap-4">
        <div className="tooltip" data-tip="Delete">
          <Trash2
            size={20}
            className="hover:text-red-800 transition-colors duration-300 cursor-pointer"
          />
        </div>
        <div className="tooltip" data-tip="Complete">
          <Check
            size={20}
            className="hover:text-emerald-800 transition-colors duration-300 cursor-pointer"
          />
        </div>
      </div>
    </li>
  );
}
