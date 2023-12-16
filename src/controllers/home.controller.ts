import Elysia from "elysia";
import { ROUTE } from "@/constants/routes";

export const homeController = new Elysia().get(
  "/",
  ({ set }) => (set.redirect = ROUTE.POLL_HOME)
);
