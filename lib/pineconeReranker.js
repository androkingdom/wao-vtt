import { AI_MODELS } from "@/constants/models";
import { Pinecone } from "@pinecone-database/pinecone";

export async function reranker(query, docs) {
  const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

  const rerankOptions = {
    topN: 2,
    rankFields: ["text"],
    returnDocuments: true,
    parameters: {
      truncate: "END",
    },
  };

  const RerankedDocs = await pc.inference.rerank(
    AI_MODELS.reranker.model,
    query,
    docs,
    rerankOptions
  );

  return RerankedDocs;
}
