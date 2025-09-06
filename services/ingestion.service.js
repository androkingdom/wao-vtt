import fs from "fs/promises";
import path from "path";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PineconeEmbeddings, PineconeStore } from "@langchain/pinecone";
import { AI_MODELS } from "@/constants/models";
import { getPineconeIndex } from "@/lib/pineconeIndex";
import { FileService } from "@/lib/FileService";
import { groupCaptions } from "@/lib/groupCaptions";

export class SubtitleIngestor {
  static async ingest(filePath, courseTitle, description = null, options = {}) {
    const {
      chunkSize = 500,
      chunkOverlap = 50,
    } = options;
    console.log("Ingesting:", filePath);
    try {
      // 1. Load JSON
      const raw = await fs.readFile(filePath, "utf-8");
      const captions = JSON.parse(raw);

      const fileName = path.basename(filePath);

      // 2. Convert to Documents with `course` metadata
      const docs = groupCaptions(captions, {
        fileName,
        courseTitle,
        description,
      });
      // 3. Split into chunks
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize,
        chunkOverlap,
      });
      const splitDocs = await splitter.splitDocuments(docs);

      // 4. Embeddings
      const embeddings = new PineconeEmbeddings({
        model: "multilingual-e5-large",
      });
      // 5. Pinecone Index
      const pineconeIndex = await getPineconeIndex();

      // 6. Upsert
      const ids = splitDocs.map(
        (doc, i) => `${courseTitle}-${fileName}-${doc.metadata.index}-${i}`
      );

      await PineconeStore.fromDocuments(splitDocs, embeddings, {
        pineconeIndex,
        maxConcurrency: 5,
        ids,
      });

      console.log(
        `✅ Inserted ${splitDocs.length} chunks from ${fileName} into course: ${courseTitle}`
      );

      FileService.deleteFiles([filePath]);
    } catch (err) {
      console.error("❌ Error during ingestion:", err);
      throw err;
    }
  }
}
