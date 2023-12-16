import "typed-html";
import { Elysia } from "elysia";
import { home, poll, result } from "@/controllers";
import { runMigrations } from "@/lib/db";

runMigrations();
new Elysia().use(home).use(poll).use(result).listen(3000);
