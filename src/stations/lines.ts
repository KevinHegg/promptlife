import type { LoopSpec } from '../loop/types'
import { LINE_A_SPEC } from './AAcademy'
import { LINE_G_SPEC } from './GGatehouse'
import { LINE_L_SPEC } from './LLibrary'
import { LINE_W_SPEC } from './WWorkshop'

/** Side lines with a full lesson, by line code. */
export const LINE_LOOPS: Record<string, LoopSpec> = { L: LINE_L_SPEC, G: LINE_G_SPEC, W: LINE_W_SPEC, A: LINE_A_SPEC }
