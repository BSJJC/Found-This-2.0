export enum uploadStates {
  "pendding",
  "success",
  "fail"
}

export interface fileItemType extends File {
  uuid?: string,
  uploadState?: uploadStates
}

export interface compressedImagesType {
  file?: File,
  url?: string,
}