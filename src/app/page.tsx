import TodoItem from "@/components/TodoItem";
import { prisma } from "@/db";
import { Gasoek_One } from "next/font/google";
import Link from "next/link";

const GasoekOne = Gasoek_One({ subsets: ["latin"], weight: "400" });

function getTodos() {
  return prisma.todo.findMany();
}

export default async function Home() {
  const todos = await getTodos();
  return (
    <div className="flex max-w-6xl h-screen  mx-auto flex-col gap-2 ">
      <div className="w-full flex justify-center">
        <div className="w-full h-24 flex items-center justify-center overflow-hidden border-b-2 border-zinc-700">
          <Link
            href={"/"}
            className={`${GasoekOne.className} text-8xl text-zinc-100`}
          >
            <span className="text-violet-800">2</span>do
          </Link>
        </div>
      </div>

      {/* New todo Input */}
      <div className=" flex justify-center items-center mt-2">
        <form action="" className="flex gap-4">
          <input
            type="text"
            name="todo"
            id="todo"
            placeholder="Enter your new todo here."
            autoComplete="off"
            className="w-96 focus:outline-none rounded p-2 overflow-hidden bg-zinc-300 placeholder:text-zinc-700 uppercase text-zinc-900"
          />
          <div className="flex gap-1 text-zinc-100 bg-violet-700 hover:bg-violet-900 transition-colors duration-300 rounded overflow-hidden p-2 font-semibold cursor-pointer">
            <span>Create</span>
          </div>
        </form>
      </div>

      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between text-zinc-400 mb-2">
          <p>Tasks</p>
          <p>Actions</p>
        </div>

        {/* Todo List */}
        <ul className="flex flex-col gap-6">
          {todos.map((todo) => {
            return <TodoItem key={todo.id} {...todo} />;
          })}
        </ul>
      </div>
    </div>
  );
}
