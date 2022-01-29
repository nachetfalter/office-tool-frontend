export const fileIsValid = (file: Blob, allowedSizeInMb: number, allowedTypes: string[]): boolean => {
  const fileType = file.type;
  const fileSize = file.size;

  return allowedTypes.includes(fileType.toLowerCase()) && fileSize <= allowedSizeInMb * 1024 * 1024;
};
