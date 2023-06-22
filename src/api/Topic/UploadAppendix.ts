import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/topic/appendix/upload",
  method: "POST",
  timeout: 3000,
});

const uploadAppendix = async (data: FormData) => {
  return await instance.request({
    data,
  });
};

export default uploadAppendix;
