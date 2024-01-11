import { ValidFileTypePipe } from './valid-file-type.pipe';

describe('ValidFileTypePipe', () => {
  it('create an instance', () => {
    const pipe = new ValidFileTypePipe();
    expect(pipe).toBeTruthy();
  });
});
