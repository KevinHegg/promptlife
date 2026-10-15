import type { LoopSpec } from '../loop/types'
import { P01_SPEC } from './P01Send'
import { P02_SPEC } from './P02Tokenizer'
import { P03_SPEC } from './P03Embedding'
import { P04_SPEC } from './P04Attention'
import { P05_SPEC } from './P05Stack'
import { P06_SPEC } from './P06Vote'

/** Stations with a full five-minute loop. */
export const LOOPS: Record<string, LoopSpec> = { P01: P01_SPEC, P02: P02_SPEC, P03: P03_SPEC, P04: P04_SPEC, P05: P05_SPEC, P06: P06_SPEC }
