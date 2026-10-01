import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const port = Number(process.env.PORT || 4173);
const reportsDir = path.resolve("reports");

const server = http.createServer((request, response) => {
  const requested = request.url === "/" ? "/HPG-5y-report.html" : decodeURIComponent(request.url.split("?")[0]);
  const filePath = path.resolve(reportsDir, `.${requested}`);
  if (!filePath.startsWith(`${reportsDir}${path.sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Chưa có báo cáo. Chạy npm run report trước.");
      return;
    }
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    response.end(content);
  });
});

server.listen(port, "127.0.0.1", () => console.log(`Báo cáo: http://localhost:${port}`));
