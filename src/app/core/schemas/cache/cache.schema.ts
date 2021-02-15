
export interface CacheItem {
  // Date in ms when cached
  cachedAt: number,
  // Cached value itself
  value: string,
  // Link header (if it exists)
  link?: string
}