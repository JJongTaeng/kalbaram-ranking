import { api, API_PATH } from "./index";

export const setApiKeyRequest = (apiKey: string) => {
  return api.post(API_PATH.SET_API_KEY, {
    apiKey,
  })
}