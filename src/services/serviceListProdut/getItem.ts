import api from "../config";

export default async function getItens() {
  const response = await api.get("/getItens");
  return response.data;
}
