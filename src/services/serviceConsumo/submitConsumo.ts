import api from "../config";
import getMe from "../servicesUser/getMe";

export async function SubmitConsumo(consumoData: {
  nome_item: string;
  quantidade: number;
  item_id: string;
}) {
  const user = await getMe();

  await api.post("/SubmitConsumo", {
    user_id: user.data.data.id,
    nome_user: user.data.data.nome,
    item_id: Number(consumoData.item_id),
    nome_item: consumoData.nome_item,
    tipo_movimentacao: "saida",
    quantidade: consumoData.quantidade,
  });
}
