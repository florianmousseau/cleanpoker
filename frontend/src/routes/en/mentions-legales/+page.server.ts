import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./";

export const load: PageServerLoad = () => {
  redirect(301, "/mentions-legales");
};
