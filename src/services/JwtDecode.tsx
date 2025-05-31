import { jwtDecode } from "jwt-decode";

const JwtDecode = (token: string) => {
  return jwtDecode(token);
};
export default JwtDecode;
