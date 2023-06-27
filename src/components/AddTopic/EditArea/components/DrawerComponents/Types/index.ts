export enum uploadStates {
  "pending",
  "success",
  "fail"
}

export interface fileItemType extends File {
  uuid?: string,
}

export interface compressedImagesType {
  file?: File,
  url?: string,
}