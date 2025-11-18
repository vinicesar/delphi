import api from "../config";

export default async function ListUsers() {
  const response = await api.get("/users");
  return response.data;
}
