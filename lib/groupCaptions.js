// utils/groupCaptions.js
import { Document } from "langchain/document";

/**
 * Groups raw caption JSON entries into bigger Documents for better embedding.
 *
 * @param {Array} captions - Array of caption objects [{ text, start, end, ... }]
 * @param {Object} options
 * @param {string} options.fileName - Source file name
 * @param {string} options.courseTitle - Course identifier
 * @param {string|null} options.description - Optional course/video description
 * @param {number} [options.groupSize=30] - How many captions per group
 * @returns {Document[]} Array of grouped LangChain Documents
 */
export function groupCaptions(
  captions,
  { fileName, courseTitle, description = null, groupSize = 30 }
) {
  const docs = [];

  for (let i = 0; i < captions.length; i += groupSize) {
    const group = captions.slice(i, i + groupSize);

    const content = group.map((c) => c.text).join(" ");

    docs.push(
      new Document({
        pageContent: content,
        metadata: {
          start: group[0].start,
          end: group[group.length - 1].end,
          timestamp: `${formatTimestamp(group[0].start)} --> ${formatTimestamp(
            group[group.length - 1].end
          )}`,
          source: fileName,
          course: courseTitle,
          description,
          // optional debugging info
          count: group.length,
        },
      })
    );
  }

  return docs;
}

/**
 * Helper to format seconds into VTT-style timestamp
 * @param {number} seconds
 * @returns {string}
 */
function formatTimestamp(seconds) {
  const date = new Date(seconds * 1000).toISOString().substr(11, 8);
  const [hh, mm, ss] = date.split(":");
  return `${hh}:${mm}:${ss}`;
}
