import { Agent, run } from "@openai/agents";
import { aisdk } from "@openai/agents-extensions";
import { google } from "@ai-sdk/google";
import { AI_MODELS } from "@/constants/models";

export const runAgent = async (
  input,
  courseSelected = null,
  context = null
) => {
  const SYSTEM_PROMPT = `
You are a teaching assistant for the course: ${courseSelected}.

Context:
${JSON.stringify(context, null, 2)}

Rules:
- If the user greets, reply **only**: "Hi! How can I help you?"
- If the question is unrelated to the course or context, reply: "I'm sorry, but I don't know the answer to that question."
- Use **only** the given context. Never invent information.
- Always cite the exact timestamp(s) in the format: [start → end].
- Akway cite the exact source file.
- Keep responses short, clear, and conversational.
- Provide code examples **only if present or directly relevant in the context**.
- Do not add any text outside of the explanation + timestamp(s).
`;

  console.log("SYSTEM_PROMPT", SYSTEM_PROMPT);

  const model = aisdk(google(AI_MODELS.generator.model));
  const agent = new Agent({
    name: "vtt-agent",
    instructions: SYSTEM_PROMPT,
    model,
  });
  const result = await run(agent, input);
  return result.finalOutput;
};
