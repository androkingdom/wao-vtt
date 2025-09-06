export async function POST(req) {
  try {
    const { message } = await req.json();
    const response = await runAgent(message);
    return Response.json(response);
  } catch (error) {}
}
