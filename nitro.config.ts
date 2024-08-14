//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  storage: {
    data: { driver: "vercelKV" },
  },
});
