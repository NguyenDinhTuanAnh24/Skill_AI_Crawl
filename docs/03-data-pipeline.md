# Data pipeline and contracts

## Source acquisition

The crawler loads the public symbol page and extracts the guest `accessToken` embedded in its application state. The token is held only in memory and is sent as a bearer token to FireAnt API calls.

Endpoint details and operational constraints live in `skills/fireant-stock-report/references/fireant-data.md`.

## Raw snapshot schema

```text
raw
├─ source
│  ├─ name, website, api, retrievedAt
│  └─ range { startDate, endDate }
├─ company
├─ profile
├─ quotes[]
├─ financials[]
└─ news[]
```

`analysis` is stored alongside `raw` in the snapshot. This preserves both input evidence and derived output.

## Data-quality rules

- Reject an empty price series.
- Sort dates in analysis rather than trusting API order.
- Convert numeric values only when finite.
- Keep missing financial values as `null`.
- Deduplicate only when a demonstrated duplicate exists; do not silently discard conflicting rows.
- Use the retrieval timestamp displayed in the report.
- Bound pagination by user input and internal maximums.

## Adjustment rule

Use `adjClose` when provided. Otherwise, FireAnt's historical convention is handled as:

```text
adjusted close = nominal close / adjRatio
```

Apply the same ratio to yearly high and low. The invariant has a regression test.

## Failure policy

- 401/403: report that guest access changed; do not bypass.
- Timeout/network failure: fail with endpoint context; do not create a fresh-looking report from invented values.
- Shape mismatch: stop and update the documented contract plus tests.
- Partial news results: the report may proceed only when the count is accurate and limitations are visible.
