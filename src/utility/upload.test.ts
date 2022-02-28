import { getUploadUrl, uploadFile } from './upload';
import * as uploadModule from './upload';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('upload', () => {
  describe('getUploadUrl', () => {
    it('returns the upload url if the call to the backend is successful', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          uploadUrl: 'https://test.com',
        },
      });
      expect(await getUploadUrl('testFile')).toBe('https://test.com');
    });

    it('returns false if the call to the backend fails', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {},
      });
      expect(await getUploadUrl('testFile')).toBe(false);
    });

    it('returns false if the call to the return structure is unexpected', async () => {
      mockedAxios.get.mockRejectedValue('Error');
      expect(await getUploadUrl('testFile')).toBe(false);
    });
  });

  describe('uploadFile', () => {
    let fileContent: File;
    beforeEach(() => {
      const blob = new Blob(['{ "name": "test file" }']);
      fileContent = new File([blob], 'test.png', {
        type: 'image/png',
      });
    });

    it('returns true on successful file upload', async () => {
      jest.spyOn(uploadModule, 'getUploadUrl').mockResolvedValue('https://test.com');
      mockedAxios.put.mockResolvedValue({
        message: 'success',
      });
      expect(await uploadFile('abc.png', fileContent)).toBe(true);
    });

    it('returns false on unsuccessful file upload', async () => {
      jest.spyOn(uploadModule, 'getUploadUrl').mockResolvedValue('https://test.com');
      mockedAxios.put.mockRejectedValue({
        message: 'success',
      });
      expect(await uploadFile('abc.png', fileContent)).toBe(false);
    });

    it('returns false on failing to get upload url', async () => {
      jest.spyOn(uploadModule, 'getUploadUrl').mockResolvedValue(false);
      mockedAxios.put.mockResolvedValue({
        message: 'success',
      });
      expect(await uploadFile('abc.png', fileContent)).toBe(false);
    });
  });
});
