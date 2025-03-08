import { describe, expect, it } from 'vitest';
import { UUID } from './uuid';

describe('[Value Object] UUID', () => {
  describe('constructor', () => {
    it('有効なUUIDで初期化できる', () => {
      const validUUID = '123e4567-e89b-12d3-a456-426614174000';
      const uuid = new UUID(validUUID);
      expect(uuid.toString()).toBe(validUUID);
    });

    it('無効なUUIDで初期化するとエラーを投げる', () => {
      const invalidUUID = 'invalid-uuid';
      expect(() => new UUID(invalidUUID)).toThrow('Invalid UUID');
    });
  });

  describe('toString', () => {
    it('UUIDの文字列表現を返す', () => {
      const validUUID = '123e4567-e89b-12d3-a456-426614174000';
      const uuid = new UUID(validUUID);
      expect(uuid.toString()).toBe(validUUID);
    });
  });

  describe('generate', () => {
    it('有効なUUIDを生成する', () => {
      const uuid = UUID.generate();
      expect(UUID.isValidUUID(uuid.toString())).toBe(true);
    });

    it('生成されたUUIDが一意である', () => {
      const uuid1 = UUID.generate();
      const uuid2 = UUID.generate();
      expect(uuid1.toString()).not.toBe(uuid2.toString());
    });
  });

  describe('isValidUUID', () => {
    it('有効なUUIDの場合はtrueを返す', () => {
      const validUUID = '123e4567-e89b-12d3-a456-426614174000';
      expect(UUID.isValidUUID(validUUID)).toBe(true);
    });

    it('無効なUUIDの場合はfalseを返す', () => {
      const invalidUUIDs = [
        'invalid-uuid',
        '123e4567-e89b-12d3-a456-42661417400', // 短すぎる
        '123e4567-e89b-12d3-a456-4266141740000', // 長すぎる
        '123e4567-e89b-12d3-a456_426614174000', // 無効な区切り文字
        'ggge4567-e89b-12d3-a456-426614174000', // 無効な文字
      ];
      
      invalidUUIDs.forEach(invalidUUID => {
        expect(UUID.isValidUUID(invalidUUID)).toBe(false);
      });
    });
  });
});
