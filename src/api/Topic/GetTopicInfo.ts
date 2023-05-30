import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/topic/info/get",
  method: "GET",
  timeout: 3000,
});

const getTopicInfo = async () => {
  return await instance.request({});
};

export default getTopicInfo;
