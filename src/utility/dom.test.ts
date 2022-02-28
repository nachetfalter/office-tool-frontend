import { downloadFile } from './dom';

describe('downloadFile', () => {
  it('creates a link on the document and click it', async () => {
    document.body.innerHTML = '<div></div>';

    global.URL.createObjectURL = jest.fn(() => 'test');
    downloadFile(Buffer.from('test'), 'file.txt');
    expect(document.getElementById('temp-download-link')).toBeTruthy();
  });
});
