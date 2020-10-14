import { Range } from 'slate'

function indexOf(ranges: Range[], compareToRange: Range):number {
  for (const range in ranges) {
    if (Range.equals(ranges[range], compareToRange)) {
      return Number(range)
    }
  }

  return -1
}

export default indexOf
