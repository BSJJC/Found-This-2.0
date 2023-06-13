/**
 * 压缩图片文件
 * @param file 需要被压缩的图片文件
 * @param maxWidth 压缩后的最大宽度
 * @param maxHeight 压缩后的最大高度
 * @returns 压缩后的文件
 */
function compressImage(file: File, maxWidth: number, maxHeight: number): Promise<File> {
  return new Promise<File>((resolve, reject) => {
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      const img: HTMLImageElement = new Image();
      img.src = reader.result as string;

      img.onload = () => {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

        if (ctx) {
          let width: number = img.width;
          let height: number = img.height;

          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }

          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob: Blob | null) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now()
                });
                resolve(compressedFile);
              } else {
                reject(new Error('Failed to compress image.'));
              }
            },
            file.type,
            0.7
          );
        } else {
          reject(new Error('Canvas context is not supported.'));
        }
      };

      img.onerror = (error: Event | string) => {
        if (typeof error === 'string') {
          reject(new Error(error));
        } else {
          reject(error);
        }
      };
    };

    reader.onerror = (error: ProgressEvent<FileReader>) => reject(error);

    reader.readAsDataURL(file);
  });
}

export default compressImage;