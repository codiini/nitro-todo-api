export default defineEventHandler(async () => {
    const todos = await useStorage("data").getItem("todos");
    if (!todos) return [];
    return {
      statusCode: 200,
      todos,
    };
  });
  