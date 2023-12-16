import "typed-html";
import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { ip } from "elysia-ip";
import { home, poll, result } from "@/controllers";
import { runMigrations } from "@/lib/db";

runMigrations();
new Elysia().use(ip()).use(html()).use(home).use(poll).use(result).listen(3000);
