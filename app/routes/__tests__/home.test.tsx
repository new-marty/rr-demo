import { describe, it, expect } from 'vitest';

describe('Basic tests', () => {
  it('should pass a simple equality test', () => {
    expect(1 + 1).toBe(2);
  });

  // it('should pass a simple equality test', () => {
  //   expect(1 + 1).toBe(3);
  // });

  it('should fail a simple inequality test', () => {
    expect(1 + 1 === 1).toBe(false);
  });

  it('should check string equality', () => {
    expect('hello').toBe('hello');
  });

  it('should verify array contents', () => {
    const arr = [1, 2, 3];
    expect(arr).toContain(2);
    expect(arr).toHaveLength(3);
  });

  it('should check object properties', () => {
    const obj = { name: 'test', value: 42 };
    expect(obj).toHaveProperty('name');
    expect(obj.value).toBe(42);
  });
});
