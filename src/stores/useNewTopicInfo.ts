import { defineStore } from "pinia";

export const useNewTopicInfo = defineStore({
  id: "NewTopicInfo",
  state: () => ({
    title: "" as string,
    text: "" as string,
    fileIDs: [] as Array<string>
  }),
});

export default useNewTopicInfo;
