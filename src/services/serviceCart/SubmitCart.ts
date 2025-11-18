import api from "../config";
import getItens from "../serviceListProdut/getItem";
import getCartList from "./getCartList";

export async function SubmitCart() {
  const allCart = await getCartList();
  const allProducts = await getItens();
  const user = await api.get("/me");

  console.table(allCart.data);
  console.table(allProducts.data);
  console.table(user.data);

  if (allCart.data.length !== 0) {
    allCart.data.map((i: any) => {
      console.log(i);
      allProducts.data.map((p: any) => {
        if (i.nomeitem === p.nome) {
          console.log(p.id);
          console.log(i.quantidade);
          console.log(user.data.id);

          api.post("/SubmitCart", {
            idProduto: p.id,
            quantidade: i.quantidade,
            idUser: user.data.id,
          });
        }
      });
    });
  }

  return await api.post("/SubmitCart");
}
