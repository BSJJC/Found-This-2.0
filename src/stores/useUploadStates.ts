import { defineStore } from "pinia";

enum uploadStates {
  "pendding",
  "success",
  "fail"
}

export const useUploadStates = defineStore({
  id: "UploadStates",
  state: () => ({
    uploadStateArr: [] as Array<uploadStates>
  }),
});

export default useUploadStates;
