import api from "../config";

export default function LogoutUser() {
  return api.post("/users/logout");
}
