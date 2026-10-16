import type { LoopSpec } from '../loop/types'

/**
 * A late-bound view of every station's loop, for lessons that need the others (Reply prints every
 * station's receipt). The station index registers itself here, so no lesson has to import the index
 * and create an import cycle.
 */
let read: () => Record<string, LoopSpec> = () => ({})

export const registerLoops = (fn: () => Record<string, LoopSpec>) => {
  read = fn
}

export const allLoops = () => read()
