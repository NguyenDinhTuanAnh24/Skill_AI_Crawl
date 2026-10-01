# HTML report design system

## Design intent

The report should feel like a compact research memo, not a trading terminal. Prioritize scanability, source transparency and calm visual hierarchy.

## Visual tokens

| Token | Value | Use |
|---|---|---|
| Paper | `#f3f2ed` | Page background |
| Panel | `#ffffff` | Cards and sections |
| Ink | `#17211b` | Primary text and score panel |
| Muted | `#68716b` | Supporting text |
| Line | `#dedfd9` | Dividers and borders |
| Accent | `#1f6f4a` | Brand, chart, positive state |
| Negative | `#8a4545` | Negative data only |

Do not introduce decorative colors without a semantic need.

## Hierarchy

1. Masthead and data timestamp.
2. One-line report title and compact assessment.
3. Three-point plain-language summary.
4. Six primary metrics.
5. Price chart and annual performance.
6. Fundamentals and score composition.
7. Collapsed news stream.
8. Methodology and disclaimer.

## Interaction rules

- Show eight news items initially.
- Filtering resets the visible limit to eight.
- “Xem thêm” reveals the next eight matching items.
- Source links open in a new tab with `rel="noreferrer"`.
- Interaction must still leave the core report useful when printed.

## Responsive rules

- Below 800px, hero, paired panels and news switch to one column.
- Below 520px, metrics switch to one column and padding is reduced.
- Wide tables remain horizontally scrollable.
- Avoid fixed pixel widths for reading content.

## QA checklist

- No awkward title wrapping at the primary desktop viewport.
- Summary and six KPIs appear before the chart.
- No text overlap, clipped table headers or unreadable contrast.
- Positive/negative color never carries meaning without text.
- Print output removes interactive controls.
