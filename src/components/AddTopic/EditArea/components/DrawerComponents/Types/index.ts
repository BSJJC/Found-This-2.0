export enum uploadStates {
  Pending = "pending",
  Success = "success",
  Fail = "fail"
}

export interface fileItemType extends File {
  uuid?: string,
}

export interface compressedImagesType {
  file?: File,
  url?: string,
}