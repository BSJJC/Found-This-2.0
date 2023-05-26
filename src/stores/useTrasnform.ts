import { defineStore } from "pinia";
import { TransformStates } from "@/types/Transform"

export const useTrasnform = defineStore({
  id: "Transform",
  state: () => ({
    transformSwitch: TransformStates.off
  }),
});

export default useTrasnform;
