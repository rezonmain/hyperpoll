import "typed-html";
import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { ip } from "elysia-ip";
import { runMigrations } from "./src/lib/db";
import { home, poll, result } from "@/controllers";

runMigrations();
new Elysia().use(ip()).use(html()).use(home).use(poll).use(result).listen(3000);
