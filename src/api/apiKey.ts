import axios from "axios";
import { API_PATH } from "./index";

export const setApiKeyRequest = (apiKey: string) => {
  return axios.post(API_PATH.SET_API_KEY, {
    apiKey,
  })
}