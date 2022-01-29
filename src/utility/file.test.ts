import { fileIsValid } from './file';

describe('fileIsValid', () => {
  it('should return false if the file is too large', () => {
    const mockFile = new Blob(['test'], { type: 'application/pdf' });
    expect(fileIsValid(mockFile, 0.0000001, ['application/pdf'])).toBe(false);
  });

  it('should return false if the file is not the right type', () => {
    const mockFile = new Blob(['test'], { type: 'application/pdf' });
    expect(fileIsValid(mockFile, 10, ['image/png'])).toBe(false);
  });

  it('should return true if the file is of the right size and type', () => {
    const mockFile = new Blob(['test'], { type: 'image/png' });
    expect(fileIsValid(mockFile, 10, ['image/png'])).toBe(true);
  });
});
