import api from "../config";

export default async function getCartList() {
  const response = await api.get("/getCart");
  return response.data;
}
