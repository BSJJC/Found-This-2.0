import axios from "axios";

type dataType = {
  email: string;
  password: string;
};

const instance = axios.create({
  baseURL: "http://localhost:5000/api/user/logIn",
  method: "POST",
  timeout: 3000,
});

const userLogIn = async (data: dataType) => {
  return await instance.request({
    data,
  });
};

export default userLogIn;
