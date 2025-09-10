export const AI_MODELS = {
  // For reranking → reorder retrieved docs by query relevance
  reranker: {
    provider: "bge",
    model: "bge-reranker-v2-m3",
  },

  // For rewriting queries → handle user typos, verbosity, reformulations
  rewriter: {
    provider: "gemini",
    model: "gemini-2.5-flash",
  },

  // For final answer generation → synthesize context into response
  generator: {
    provider: "gemini",
    model: "gemini-2.5-flash",
  },
};
