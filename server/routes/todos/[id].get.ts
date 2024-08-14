export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const todos: Todo[] = (await useStorage("data").getItem("todos")) || [];

  const singleTodo = todos.find((todo) => todo.id === Number(id));

  if (!singleTodo)
    return {
      statusCode: 404,
      data: {},
    };

  return {
    statusCode: 200,
    data: singleTodo,
  };
});
