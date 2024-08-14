export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const { todo, completed } = await readBody(event);

  if (!todo && !completed)
    return {
      statusCode: 400,
      message: "Either Todo or Completed should have a value set",
    };

  if (completed !== "true" && completed !== "false")
    return {
      statusCode: 400,
      message: "The value of completed must either be true or false",
    };

  const todos: Todo[] = (await useStorage("data").getItem("todos")) || [];

  const index = todos.findIndex((item) => item.id === Number(id));

  if (index === -1) {
    return {
      statusCode: 404,
      message: "Todo not found",
    };
  }

  // Update the todo property
  if (todo !== undefined) {
    todos[index].todo = todo;
  }

  // Update the completed property
  if (completed !== undefined) {
    todos[index].completed = completed;
  }
  await useStorage("data").setItem("todos", todos);

  return {
    statusCode: 200,
    message: "Todo updated successfully",
    data: {
      ...todos[index],
    },
  };
});
