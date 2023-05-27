import axios, { AxiosInstance } from "axios";

type dataType = {
  email: string;
  userName: string;
  password: string;
};

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/user/signUp",
  method: "POST",
  timeout: 3000,
});

async function userSignUp(data: dataType): Promise<any> {
  return await instance.request({
    data,
  });
};

export default userSignUp;
