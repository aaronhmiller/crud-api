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
    const body = ctx.request.body();
    const user = await body.value;
    await upsertUser(user);
  })
  .post("/users/:id/address", async (ctx: Context) => {
    const { id } = ctx.params;
    const body = ctx.request.body();
    const address = await body.value;
    const user = await getUserById(id);
    await updateUserAndAddress(user, address);
  })
  .delete("/users/:id", async (ctx: Context) => {
    const { id } = ctx.params;
    await deleteUserById(id);
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
