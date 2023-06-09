import axios, { AxiosInstance } from "axios";

type dataType = {
  email: string;
  password: string;
};

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/user/logIn",
  method: "POST",
  timeout: 3000,
});

async function userLogIn(data: dataType): Promise<any> {
  return await instance.request({
    data,
  });
};

export default userLogIn;