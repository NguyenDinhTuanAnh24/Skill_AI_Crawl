# FireAnt public data contract

The implementation first loads `https://fireant.vn/ma-chung-khoan/<SYMBOL>` and extracts the guest `accessToken` embedded in `__NEXT_DATA__`. The token stays in memory. Requests use `Authorization: Bearer <token>` against `https://api.fireant.vn`.

Endpoints used:

- `GET /symbols/{symbol}` — listing identity.
- `GET /symbols/{symbol}/profile` — profile.
- `GET /symbols/{symbol}/historical-quotes?startDate&endDate&offset&limit` — price and volume.
- `GET /symbols/{symbol}/financial-data?type=Y&count=N` — annual fundamentals.
- `GET /search/exact?keywords={symbol}&type=news&offset&limit` — tagged news.

Operational constraints:

- Keep pagination bounded and insert a short delay between pages.
- Never store or display the access token.
- A 401/403 can indicate a changed guest-access policy; do not work around it.
- FireAnt remains the data owner. Re-check its terms before commercial or high-volume use.
