import api from "../config";

export default async function editItem(data: { id: number; nameItem: string }) {
  const response = await api.post("/editItem", data);
  return response;
}
