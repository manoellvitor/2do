import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";
import { Gasoek_One } from "next/font/google";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const GasoekOne = Gasoek_One({ subsets: ["latin"], weight: "400" });

function getTodos() {
  return prisma.todo.findMany();
}

async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();

  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }

  await prisma.todo.create({
    data: {
      title,
      complete: false,
    },
  });

  revalidatePath("/");
  redirect("/");
}

async function handleCompleteTodo(id: string, complete: boolean) {
  "use server";

  await prisma.todo.update({
    where: { id },
    data: { complete },
  });
}

async function handleDeleteTodo(id: string) {
  "use server";

  await prisma.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
}

export default async function Home() {
  const todos = await getTodos();
  return (
    <div className="mx-auto flex h-screen flex-col gap-2">
      <div className="flex w-full justify-center">
        <div className="flex h-24 w-full items-center justify-center overflow-hidden border-b-2 border-zinc-700">
          <Link
            href={"/"}
            className={`${GasoekOne.className} text-8xl text-zinc-100`}
          >
            <span className="text-violet-800">2</span>do
          </Link>
        </div>
      </div>

      {/* New todo form */}
      <div className=" mt-2 flex items-center justify-center">
        <form
          action={createTodo}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <input
            type="search"
            name="title"
            id="title"
            required
            placeholder="start typing your todo"
            autoComplete="off"
            className="w-80  overflow-hidden rounded bg-zinc-300 p-2 uppercase text-zinc-900 placeholder:text-zinc-700 focus:outline-none sm:w-96"
          />

          <button
            type="submit"
            className="flex cursor-pointer items-center justify-center gap-1 overflow-hidden rounded bg-violet-700 p-2 font-semibold text-zinc-100 transition-colors duration-300 hover:bg-violet-900"
          >
            Create
          </button>
        </form>
      </div>

      {/* Header */}
      <div className="container mx-auto p-4">
        {todos.length > 0 ? (
          <div className="mb-2 flex justify-between p-2 text-zinc-400">
            <p>Tasks</p>
            <p>Actions</p>
          </div>
        ) : (
          <div className="flex items-center justify-center ">
            <p className="text-center uppercase text-zinc-500">
              no todos yet, create your first todo!
            </p>
          </div>
        )}

        {/* Todos List */}
        <ul className="flex flex-col gap-6">
          {todos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                {...todo}
                handleCompleteTodo={handleCompleteTodo}
                handleDeleteTodo={handleDeleteTodo}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
