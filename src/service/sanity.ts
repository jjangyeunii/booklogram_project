import { createClient } from "@sanity/client";

export const client = createClient({
  apiVersion: "2023-09-07",
  dataset: process.env.SANITY_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: false,
  token: process.env.SANITY_SECRET_TOKEN,
});
