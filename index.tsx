import "typed-html";
import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";
import { home, poll, result } from "@/controllers";
import { runMigrations } from "@/lib/db";

runMigrations();
new Elysia().use(staticPlugin()).use(home).use(poll).use(result).listen(3000);
