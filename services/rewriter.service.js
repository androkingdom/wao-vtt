import { Agent, run } from "@openai/agents";
import { aisdk } from "@openai/agents-extensions";
import { google } from "@ai-sdk/google";
import { AI_MODELS } from "@/constants/models";

export class QueryRewriter {
  static async rewrite(query, courseId) {
    const SYSTEM_PROMPT = `
    You are a query rewriting assistant. Your goal is to optimize user queries for improved information retrieval from a knowledge base for the course: ${courseId}.
    Rewrite the provided user query to be more precise, include relevant keywords, and address any ambiguity, while preserving the original intent.
    If the query is already optimal, return it as is.
    Return only the rewritten query.

    Example 1:
    User Query: "Tell me about the capital of France."
    Rewritten Query: "What is the capital city of France?"

    Example 2:
    User Query: "How do I reset my password?"
    Rewritten Query: "Steps to reset user account password."

    Example 3:
    User Query: "Hello"
    Rewritten Query: "Hi! How can you help me?"
    `;
    const model = aisdk(google(AI_MODELS.rewriter.model));
    const agent = new Agent({
      name: "query-rewriter",
      instructions: SYSTEM_PROMPT,
      model,
    });

    const result = await run(agent, query);
    return result.finalOutput;
  }
}
