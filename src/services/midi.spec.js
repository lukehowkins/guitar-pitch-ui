import { describe, it, expect } from 'vitest';
import { getNote } from './midi';

describe('getNote', () => {
  it('should return correct C oct', () => {
    expect(getNote(60)).toEqual('C/4');
    expect(getNote(72)).toEqual('C/5');
    expect(getNote(84)).toEqual('C/6');
    expect(getNote(48)).toEqual('C/3');
  });

  it('should return correct note', () => {
    expect(getNote(59)).toEqual('B/3');
    expect(getNote(61)).toEqual('C#/4');
    expect(getNote(67)).toEqual('G/4');
    expect(getNote(79)).toEqual('G/5');
  });

  it('should return correct notes for standard guitar tuning', () => {
    expect(getNote(64)).toEqual('E/4');
    expect(getNote(59)).toEqual('B/3');
    expect(getNote(55)).toEqual('G/3');
    expect(getNote(50)).toEqual('D/3');
    expect(getNote(45)).toEqual('A/2');
    expect(getNote(40)).toEqual('E/2');
  });
});
