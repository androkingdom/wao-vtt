import { getPineconeIndex } from "@/lib/pineconeIndex";
import { PineconeEmbeddings, PineconeStore } from "@langchain/pinecone";
import { reranker } from "@/lib/pineconeReranker";

export class SubtitleRetrieval {
  static async getContent(query, courseName) {
    // 1. Hook into LangChain vector store
    console.log("Embedding...");
    const embeddings = new PineconeEmbeddings({
      model: "multilingual-e5-large",
    });

    const pineconeIndex = await getPineconeIndex();

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
    });

    // 2. Build retriever with metadata filter
    console.log("Retrivering...");
    const retriever = vectorStore.asRetriever({
      k: 5,
      filter: { course: courseName },
    });

    // 3. Run retrieval (Runnable API)
    console.log("Retriver invoke...");
    const results = await retriever.invoke(query);
    console.log("Result Generated:", results.length);

    // 4. Format output
    const formattedResults = results.map((doc) => ({
      text: doc.pageContent,
      ...doc.metadata,
    }));

    // 4. Rerank results
    console.log("Reranking results...");
    const rerankedResults = await reranker(query, formattedResults);

    return rerankedResults;
  }
}
