import type { FormDefinition } from '../types/forms'
import { CRM_SEGMENTS } from '../constants/segments'

/**
 * Agrega pontos por segmento a partir das respostas (IDs de opção escolhidos).
 */
export function computeQualifiedSegment(
  form: FormDefinition,
  answers: Record<string, string>
): string {
  const scores: Record<string, number> = {}

  for (const q of form.questions) {
    const chosen = answers[q.id]
    if (!chosen) continue
    const opt = q.options.find((o) => o.id === chosen)
    if (!opt?.segmentPoints) continue
    for (const [seg, pts] of Object.entries(opt.segmentPoints)) {
      if (typeof pts !== 'number') continue
      scores[seg] = (scores[seg] ?? 0) + pts
    }
  }

  const entries = Object.entries(scores).filter(([, v]) => v > 0)
  if (entries.length === 0) return CRM_SEGMENTS[0]

  entries.sort((a, b) => b[1] - a[1])
  const top = entries[0][1]
  const tied = entries.filter(([, v]) => v === top).map(([s]) => s)
  if (tied.length === 1) return tied[0]

  const order = new Map<string, number>(CRM_SEGMENTS.map((s, i) => [s, i]))
  tied.sort((a, b) => (order.get(a) ?? 99) - (order.get(b) ?? 99))
  return tied[0]
}
