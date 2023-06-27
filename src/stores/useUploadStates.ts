import { defineStore } from "pinia";

enum uploadStates {
  "pending",
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
