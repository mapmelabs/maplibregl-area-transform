import { describe, it, expect } from 'vitest';
import { MaplibreAreaTransform } from './index';

describe('MaplibreAreaTransform', () => {
    it('should create a new instance', () => {
        const instance = new MaplibreAreaTransform();
        expect(instance).toBeInstanceOf(MaplibreAreaTransform);
    });
});
