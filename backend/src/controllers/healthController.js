export function getHealth(_request, response) {
  response.json({
    status: "ok",
    message: "Sandbox backend running"
  });
}
