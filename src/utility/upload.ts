import axios from 'axios';

export const getUploadUrl = async (fileName: string): Promise<string | false> => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/uploadUrl?fileName=${fileName}`)
    .then((response) => {
      return response.data.uploadUrl ?? false;
    })
    .catch(() => {
      return false;
    });
};

export const uploadFile = async (fileName: string, fileContent: File): Promise<boolean> => {
  const uploadUrl = await getUploadUrl(fileName);
  if (!uploadUrl) {
    return false;
  }

  const config = {
    headers: { 'Content-Type': fileContent.type },
  };

  return axios
    .put(uploadUrl, fileContent, config)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
