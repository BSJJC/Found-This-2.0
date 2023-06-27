import { defineStore } from "pinia";

enum uploadStates {
  Pending = "pending",
  Success = "success",
  Fail = "fail"
}

export const useUploadStates = defineStore({
  id: "UploadStates",
  state: () => ({
    uploadStateArr: [] as Array<uploadStates>
  }),
});

export default useUploadStates;
