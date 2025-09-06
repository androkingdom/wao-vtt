import webvtt from "node-webvtt";
import { FileService } from "@/lib/FileService.js";
import { SubtitleIngestor } from "@/services/ingestion.service";
import pLimit from "p-limit";

FileService.configure({ maxSizeMB: 10 });

export async function POST(req) {
  const formData = await req.formData();
  const files = formData.getAll("files");

  const savedJsonPaths = [];

  for (const file of files) {
    if (file.type === "text/vtt") {
      // Read VTT file contents
      const vttString = await file.text();

      // Parse into JSON
      const parsed = webvtt.parse(vttString);
      const jsonString = JSON.stringify(parsed.cues, null, 2);

      // Save JSON file instead of VTT
      const buffer = Buffer.from(jsonString, "utf-8");
      const jsonFile = new File(
        [buffer],
        file.name.replace(/\.vtt$/i, ".json"),
        {
          type: "application/json",
        }
      );

      const paths = await FileService.saveFiles([jsonFile]);
      savedJsonPaths.push(paths[0]);
    }
  }

  const limit = pLimit(5); // run 5 ingestion tasks at a time

  console.log("Ingesting...");
  await Promise.all(
    savedJsonPaths.map((file) =>
      limit(() =>
        SubtitleIngestor.ingest(
          file,
          formData.get("courseName"),
          formData.get("description") ?? null,
          {
            chunkSize: 1000,
            chunkOverlap: 200,
          }
        )
      )
    )
  );

  return Response.json({ success: true, saved: savedJsonPaths });
}
