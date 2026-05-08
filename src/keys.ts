export function keyFromPathname(pathname: string) {
  const trimmed = pathname.startsWith('/') ? pathname.slice(1) : pathname
  // `URL.pathname` keeps non-ASCII bytes percent-encoded, so a request for
  // `/Salão.jpg` arrives as `Sal%C3%A3o.jpg`. Passing that to the S3 SDK
  // as a literal key produces a presigned URL whose path re-encodes the
  // `%` to `%25`, and Tigris (and most S3-compatible backends) then 404s
  // because the actual stored key is the raw UTF-8 byte. Decode once so
  // the SDK signs the real key.
  try {
    return decodeURIComponent(trimmed)
  } catch {
    // Malformed percent-escapes (e.g. a lone `%`) — fall back to the raw
    // value rather than throwing on the request path.
    return trimmed
  }
}
