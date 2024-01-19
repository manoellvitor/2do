import { Alert } from "../components/Alert";
import { Lilita_One } from "next/font/google";
import Link from "next/link";
import { NotebookPen } from "lucide-react";
import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const LilitaOne = Lilita_One({ subsets: ["latin"], weight: "400" });
let flag = false;

async function getTodos() {
  return await prisma.todo.findMany();
}

async function getCompletedTodos() {
  return await prisma.todo.findMany({
    where: {
      complete: true,
    },
  });
}

async function getTodoByTitle(title: string) {
  flag = true;
  return await prisma.todo.findFirst({
    where: {
      title,
    },
  });
}

async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();

  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }

  if (await getTodoByTitle(title)) {
    revalidatePath("/");
    redirect("/");
    return;
  }
  flag = false;
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
  const completedTodos = await getCompletedTodos();
  return (
    <div className="mx-auto flex h-screen flex-col gap-2">
      <div className="mt-20 flex w-full justify-center">
        <div className="flex h-24 w-full items-center justify-center overflow-hidden">
          <Link
            href={"/"}
            className={`${LilitaOne.className} text-9xl text-zinc-100`}
          >
            <span className="text-violet-800">2</span>do
          </Link>
        </div>
      </div>

      {/* New todo form */}
      <div className="mt-10 flex items-center justify-center">
        <form
          action={createTodo}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <input
            type="search"
            name="title"
            id="title"
            required
            placeholder="Add a new task"
            autoComplete="off"
            className="w-80  overflow-hidden rounded bg-gray-900 p-2 text-gray-400 placeholder:text-gray-500 focus:outline-none focus:outline-violet-900 sm:w-96"
          />

          <button
            type="submit"
            className="flex cursor-pointer items-center justify-center gap-1 overflow-hidden rounded bg-violet-700 p-2 font-semibold text-zinc-100 transition-colors duration-300 hover:bg-violet-900"
          >
            Create
          </button>
        </form>
      </div>

      <div className="container mx-auto p-4">
        <div className="flex items-center max-w-4xl justify-between mx-auto text-violet-900 font-bold mt-10">
          <div>
            Created Tasks{" "}
            <span className="text-gray-500 px-4 py-1 bg-gray-800 rounded-full">
              {todos.length}
            </span>
          </div>
          <div>
            Done Tasks{" "}
            <span className="text-gray-500 px-4 py-1 bg-gray-800 rounded-full">
              {completedTodos.length} of {todos.length}
            </span>
          </div>
        </div>
        {todos.length > 0 ? (
          <div className="mx-auto mb-2 flex max-w-4xl justify-between p-2 text-gray-500">
            <ul className="flex flex-1 flex-col gap-6">
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
        ) : (
          <div className="mt-20 flex flex-col items-center justify-center">
            <div className="p-4 text-gray-500">
              <NotebookPen size={70} strokeWidth="1" />
            </div>
            <p className="text-md text-center font-semibold text-gray-500">
              You don&apos;t have any tasks registered yet.
            </p>
            <p className="text-center text-gray-500">
              Create tasks and organize your to-do items
            </p>
          </div>
        )}
      </div>
      {flag ? <Alert message={"Task Already Exist"} /> : ""}
    </div>
  );
}
