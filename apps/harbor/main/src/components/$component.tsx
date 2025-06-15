import { useEffect, useRef } from 'hono/jsx'
import rough from 'roughjs'
import { s } from 'tss'

export function Component() {
  const svg = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svg.current) return

    const rc = rough.svg(svg.current)
    while (svg.current.firstChild) svg.current.removeChild(svg.current.firstChild)

    const scale = 2
    const baseCell = 100
    const baseGap = 10

    const cellSize = baseCell * scale
    const gap = baseGap * scale

    const labels = [
      'Adaptability',
      'Confidentiality',
      'Integrity',
      'Mobility',
      'Observability',
      'Visibility'
    ]

    // Sustainability 横長矩形（最上段）
    const totalWidth = 3 * cellSize + 2 * gap
    const sustainabilityX = 0
    const sustainabilityY = 0

    const sustainabilityRect = rc.rectangle(
      sustainabilityX,
      sustainabilityY,
      totalWidth,
      cellSize,
      { fill: '#eee', roughness: 2.8, strokeWidth: 2 }
    )
    svg.current!.appendChild(sustainabilityRect)

    const sustainabilityText = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    sustainabilityText.setAttribute('x', String(sustainabilityX + totalWidth / 2))
    sustainabilityText.setAttribute('y', String(sustainabilityY + cellSize / 2 + 10))
    sustainabilityText.setAttribute('font-size', String(60))
    sustainabilityText.setAttribute('font-family', '"Welcome Drama"')
    sustainabilityText.setAttribute('text-anchor', 'middle')
    sustainabilityText.textContent = 'Sustainability'
    svg.current!.appendChild(sustainabilityText)

    // ACIMOV 6要素（下段2行 × 3列）
    for (let i = 0; i < labels.length; i++) {
      const col = i % 3
      const row = Math.floor(i / 3) + 1
      const x = col * (cellSize + gap)
      const y = row * (cellSize + gap)

      const rect = rc.rectangle(x, y, cellSize, cellSize, {
        fill: '#eee',
        roughness: 2.8,
        strokeWidth: 2
      })
      svg.current!.appendChild(rect)

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      text.setAttribute('x', String(x + 20))
      text.setAttribute('y', String(y + cellSize / 2 + 10))
      text.setAttribute('font-size', String(30))
      text.setAttribute('text-align', 'center')
      text.setAttribute('font-family', '"Welcome Drama"')
      text.textContent = labels[i]
      svg.current!.appendChild(text)
    }
  })

  return (
    <div class={s.parse(styled.div.root)}>
      <svg height={680} ref={svg} width={680} />
    </div>
  )
}

const styled = s.define({
  div: s.object({
    root: s.style({ d: 'grid', placeContent: 'center' })
  })
})
