import api from "../config";
import getItens from "../serviceListProdut/getItem";
import getCartList from "./getCartList";

export async function SubmitCart() {
  const allCart = await getCartList();
  const allProducts = await getItens();
  const user = await api.get("/me");


  if (allCart.data.length !== 0) {
    allCart.data.map((i: any) => {
      allProducts.data.map((p: any) => {
        if (i.nomeitem === p.nome) {

          api.post("/SubmitCart", {
            user_id: user.data.data.id,
            nome_user: user.data.data.nome,
            item_id: p.id,
            nome_item: p.nome,
            tipo_movimentacao: "entrada",
            quantidade: i.quantidade
          });
        }
      });
    });
  }

  return await api.post("/SubmitCart");
}
