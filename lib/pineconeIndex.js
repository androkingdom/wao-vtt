import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

let pinecone = null;
let pineconeIndex = null;

async function getPineconeIndex() {
  if (!pinecone) {
    pinecone = new PineconeClient();
    pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
  }
  return pineconeIndex;
}

export { getPineconeIndex };
