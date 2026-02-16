import { restClient, DefaultApi } from "@massive.com/client-js";
import { getApiKey } from "./utils";

export const api: DefaultApi = restClient(
  getApiKey(),
  "https://api.massive.com",
);
