export default defineEventHandler(async (event) => {
  const { todo, completed } = await readBody(event);

  if (!todo || !completed)
    return {
      statusCode: 400,
      message: "Both Todo and Completed fields should have a value set",
    };

  if (completed !== "true" && completed !== "false")
    return {
      statusCode: 400,
      message: "The value of completed must either be true or false",
    };

  const todoList: Todo[] = (await useStorage("data").getItem("todos")) || [];

  const newTodo: Todo = {
    id: Date.now(),
    todo,
    completed,
  };

  todoList.push(newTodo);

  await useStorage("data").setItem("todos", todoList);

  return {
    statusCode: 201,
    data: {
      ...newTodo,
    },
  };
});
