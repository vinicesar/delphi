import api from "../config";
import getItens from "../serviceListProdut/getItem";

export async function SubmitConsumo(consumoData: Array<{ nameItem: string; quantidade: number , id: string }>) {
  const allProducts = await getItens();
  const user = await api.get("/me");

  if (consumoData.length !== 0) {
    consumoData.map((i: any) => {
      allProducts.data.map((p: any) => {
        if (i.nomeitem === p.nome) {

          api.post("/SubmitConsumo", {
            user_id: user.data.data.id,
            nome_user: user.data.data.nome,
            item_id: p.id,
            nome_item: p.nome,
            tipo_movimentacao: "saida",
            quantidade: i.quantidade
          });
        }
      });
    });
  }

  return await api.post("/SubmitConsumo");
}