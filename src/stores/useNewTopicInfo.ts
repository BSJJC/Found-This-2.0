import { defineStore } from "pinia";

export const useNewTopicInfo = defineStore({
  id: "NewTopicInfo",
  state: () => ({
    title: "" as string,
    text: "" as string
  }),
});

export default useNewTopicInfo;
