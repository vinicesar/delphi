import api from "../config";

export default async function getHistory() {
  const response = await api.get("/getHistory");
  return response.data;
}
