import api from "../config";

export default function LoginUser(data: { login: string; senha: string }) {
  return api.post("/users/login", data);
}
