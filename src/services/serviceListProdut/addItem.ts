import api from "../config";

export default async function addItem(nome: string) {
  const response = await api.post("/addItem", { nome });
  return response.data;
}
