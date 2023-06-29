import axios from "axios";

interface infoType {
  founderName: string;
  founderAvaterID: string;
  title: string;
  text: string;
  fileIDs: Array<string>;
}

const instance = axios.create({
  baseURL: "http://localhost:5000/api/topic/info/create",
  method: "POST",
  timeout: 3000,
});

const createNewTopic = async (data: infoType) => {
  return await instance.request({
    data,
  });
};

export default createNewTopic;