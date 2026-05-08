import { describe, expect, test } from 'bun:test'
import { keyFromPathname } from '../src/keys'

describe('keyFromPathname', () => {
  test('removes leading slashes', () => {
    expect(keyFromPathname('/foo/bar')).toBe('foo/bar')
  })

  test('returns as-is without leading slashes', () => {
    expect(keyFromPathname('foo/bar')).toBe('foo/bar')
  })

  test('returns empty string for root', () => {
    expect(keyFromPathname('/')).toBe('')
  })

  test('decodes percent-escaped UTF-8 bytes', () => {
    expect(keyFromPathname('/sal%C3%A3o.jpg')).toBe('salão.jpg')
    expect(keyFromPathname('/C%C3%B3pia/foo.jpg')).toBe('Cópia/foo.jpg')
  })

  test('falls back to the raw path on malformed percent escapes', () => {
    expect(keyFromPathname('/100%-off.jpg')).toBe('100%-off.jpg')
  })
})
