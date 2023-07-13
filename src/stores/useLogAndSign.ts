import { defineStore } from "pinia";
import { States, RequestStates, RequestingSentences } from "@/types/LogAndSign"

export const userLogAndSign = defineStore({
  id: "LogAndSign",
  state: () => ({
    state: States.LogIn,
    RequestState: RequestStates.Pending,
    RequestingSentence: RequestingSentences["Please wait...."]
  }),
});

export default userLogAndSign;