export const timeSince = (startedAt: string): string => {
  const startTimeMs = new Date(startedAt).getTime()

  const seconds = Math.floor((Date.now() - startTimeMs) / 1000)

  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`
  }
  if (minutes > 0) {
    return `${minutes}m`
  }
  return `${seconds}s`
}
