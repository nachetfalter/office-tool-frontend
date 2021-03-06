import { cleanString, inicap } from './string';

describe('String', () => {
  describe('cleanString', () => {
    it('accepts Latin, accented Latin, Chinese, Cyrillic, Greek, Japanese, Hindi characters and numbers', () => {
      expect(cleanString('aAáÁ华華яЯΩωチら観वायरस')).toBe('aAáÁ华華яЯΩωチら観वायरस');
    });

    it('replaces consecutive special characters with space', () => {
      expect(cleanString('a+b-c*')).toBe('a b-c ');
    });

    it('replaces consecutive special characters with a single space', () => {
      expect(cleanString('b-**)c')).toBe('b- c');
    });
  });

  describe('inicap', () => {
    it('inicaps a string', () => {
      expect(inicap('aBC')).toBe('Abc');
    });

    it('still works on a single character', () => {
      expect(inicap('a')).toBe('A');
    });
  });
});
