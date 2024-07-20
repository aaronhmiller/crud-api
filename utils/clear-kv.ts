import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

const env = await load();
const DENO_KV_ACCESS_TOKEN = env["DENO_KV_ACCESS_TOKEN"];
const kv = await Deno.openKv("https://api.deno.com/databases/96305a97-7061-4a29-8833-9eb0e2c50e12/connect");

const promises = [];
for await (const entry of kv.list({ prefix: [] })) {
  promises.push(kv.delete(entry.key));
}
await Promise.all(promises);
