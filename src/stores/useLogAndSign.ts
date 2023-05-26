import { defineStore } from "pinia";
import { States, MiddleAnimationStates } from "@/types/LogAndSign"

export const userLogAndSign = defineStore({
  id: "LogAndSign",
  state: () => ({
    state: States.LogIn,
    middleAnimationState: MiddleAnimationStates.Pending
  }),
});

export default userLogAndSign;
