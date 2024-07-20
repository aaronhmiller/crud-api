import {
  Application,
  Context,
  Router,
} from "https://deno.land/x/oak@v16.1.0/mod.ts";
import {
  deleteUserById,
  getAddressByUserId,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUserAndAddress,
  upsertUser,
} from "./db.ts";

const router = new Router();

router
  .get("/users", async (ctx: Context) => {
    ctx.response.body = await getAllUsers();
  })
  .get("/users/:id", async (ctx: Context) => {
    const { id } = ctx.params;
    ctx.response.body = await getUserById(id);
  })
  .get("/users/email/:email", async (ctx: Context) => {
    const { email } = ctx.params;
    ctx.response.body = await getUserByEmail(email);
  })
  .get("/users/:id/address", async (ctx: Context) => {
    const { id } = ctx.params;
    ctx.response.body = await getAddressByUserId(id);
  })
  .post("/users", async (ctx: Context) => {
    const user = await ctx.request.body.json();
    await upsertUser(user);
    ctx.response.status = 201;
  })
  .post("/users/:id/address", async (ctx: Context) => {
    const { id } = ctx.params;
    const address = await ctx.request.body.json();
    const user = await getUserById(id);
    await updateUserAndAddress(user, address);
    ctx.response.status = 201;
  })
  .delete("/users/:id", async (ctx: Context) => {
    const { id } = ctx.params;
    await deleteUserById(id);
    ctx.response.status = 204;
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const handler = async (request: Request): Promise<Response> => {
  const response = await app.handle(request);
  return response ?? new Response("Not Found", { status: 404 });
};

Deno.serve(handler);
