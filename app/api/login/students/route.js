export async function POST(req) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return Response.json({
        error: "Missing username or password",
        status: 400,
      });
    }

    

  } catch (error) {
    return Response.json({
      error: error.message,
      status: 500,
    });
  }
}
