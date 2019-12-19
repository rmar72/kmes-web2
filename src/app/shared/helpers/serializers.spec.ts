import { NopSerializer } from './serializers';

describe('NopSerializerr', () => {
  it('should create an instance', () => {
    expect(new NopSerializer()).toBeTruthy();
  });
});
