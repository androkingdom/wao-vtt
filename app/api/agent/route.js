import { runAgent } from "@/services/agent.service";
import { SubtitleRetrieval } from "@/services/retrieval.service";
import { mapSubtitles } from "@/lib/mapSubtitle";
import { QueryRewriter } from "@/services/rewriter.service";

export async function POST(req) {
  try {
    const { message, courseId } = await req.json();
    console.log("Retrieving context...");
    const query = await QueryRewriter.rewrite(message, courseId);
    console.log("\n\nRewritten query:", query);
    const context = await SubtitleRetrieval.getContent(query, courseId);
    console.log("\n\nRetrieved context completed");
    const parsedContext = JSON.parse(JSON.stringify(context, null, 2));
    const mappedContext = mapSubtitles(parsedContext);

    const response = await runAgent(message, courseId, mappedContext);
    return Response.json({ content: response });
  } catch (error) {
    console.error("Agent error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
