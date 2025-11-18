import api from "../config";

export default async function getStock() {
  const response = await api.get("/getStock");
  return response.data;
}
