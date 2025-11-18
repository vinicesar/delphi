import api from "../config";

export default async function createUser(data: {
  nome: string;
  login: string;
  senha: string;
}) {
  const newUser = {
    nome: data.nome.trim(),
    login: data.login.trim(),
    senha: data.senha.trim(),
  };

  const response = await api.post("/users", newUser);
  return response.data;
}
