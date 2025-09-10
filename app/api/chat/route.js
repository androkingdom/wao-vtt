export async function POST(req) {
  try {
    const { message } = await req.json();
    return;
    const response = await runAgent(message);
    return Response.json(response);
  } catch (error) {}
}
