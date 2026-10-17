import type { LoopSpec } from '../loop/types'
import { LINE_L_SPEC } from './LLibrary'
import { LINE_W_SPEC } from './WWorkshop'

/** Side lines with a full lesson, by line code. */
export const LINE_LOOPS: Record<string, LoopSpec> = { L: LINE_L_SPEC, W: LINE_W_SPEC }
