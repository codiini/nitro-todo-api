export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const todoList: Todo[] = (await useStorage("data").getItem("todos")) || [];

  const index = todoList.findIndex((item) => item.id === Number(id));

  if (index === -1) {
    return {
      statusCode: 404,
      message: "Todo item not found",
    };
  }

  // Remove the todo item from the list
  const deletedTodo = todoList.splice(index, 1)[0];

  // Save the updated list back to storage
  await useStorage("data").setItem("todos", todoList);

  return {
    statusCode: 200,
    data: {
      ...deletedTodo,
    },
    message: "Todo successfully deleted",
  };
});
