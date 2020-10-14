import { Range, Point } from 'slate'

export const getPreviousClosestRange = (
  ranges: Range[],
  current: Range | null
) => {
  if (current == null) return null
  let closestRange = null
  for (const range in ranges) {
    const rangeEnd = Range.end(ranges[range])

    const currentRangeStart = Range.start(current)

    if (Point.compare(rangeEnd, currentRangeStart) == -1) {
      closestRange = ranges[range]
    } else {
      return closestRange
    }
  }
  return closestRange
}

export const getNextClosestRange = (ranges: Range[], current: Range | null) => {
  if (current == null) return null

  for (const range in ranges) {
    const rangeStart = Range.start(ranges[range])
    const currentRangeEnd = Range.end(current)

    if (Point.compare(rangeStart, currentRangeEnd) == 1) {
      return ranges[range]
    }
  }
  return null
}
