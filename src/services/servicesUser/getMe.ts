import api from "../config";

export default async function getMe() {
  return await api.get("/me");
}
