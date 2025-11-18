import api from "../config";

export async function removeOneItem(id: number) {
  return await api.post("/RemoveOneItem", { id });
}
