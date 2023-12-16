import Elysia from "elysia";
import { ROUTE } from "@/constants/routes";
import { ip } from "elysia-ip";

export const homeController = new Elysia().get(
  "/",
  ({ set }) => (set.redirect = ROUTE.POLL_HOME)
);
