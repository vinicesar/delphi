import api from "../config";

export async function removeProductCart(id: number) {
  return await api.post("/DeleteItem", { id });
}
