import api from "../config";

export async function multipleSendItens(quantidade: number, itemName: string) {
  return await api.post("/multipleSendItens", {
    quantidade,
    itemName,
  });
}
