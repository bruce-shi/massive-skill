import { restClient, DefaultApi } from "@massive.com/client-js";
import { getApiKey } from "./utils";

let apiInstance: DefaultApi | null = null;

export function getApi(): DefaultApi {
  if (!apiInstance) {
    apiInstance = restClient(getApiKey(), "https://api.massive.com");
  }
  return apiInstance;
}

// For backwards compatibility
export const api: DefaultApi = new Proxy({} as DefaultApi, {
  get(_target, prop) {
    return (...args: any[]) => {
      const instance = getApi();
      return (instance as any)[prop](...args);
    };
  },
});
