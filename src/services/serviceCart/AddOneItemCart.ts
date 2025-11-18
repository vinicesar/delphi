import api from "../config";

export async function MoveOneItemCart(id: number) {
  return await api.post("/AddOneItem", { id });
}
