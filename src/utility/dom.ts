export const downloadFile = (fileBuffer: Buffer, fileName: string): void => {
  const url = window.URL.createObjectURL(new Blob([fileBuffer]));

  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.id = 'temp-download-link';
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
};
