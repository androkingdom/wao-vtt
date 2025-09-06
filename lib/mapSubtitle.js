export function mapSubtitles(docs) {
  const grouped = {};

  console.log("Mapping subtitles...", docs);

  docs.data.forEach(({ document, score }) => {
    const { course, text, timestamp, source } = document;

    if (!grouped[course]) grouped[course] = [];

    grouped[course].push({
      text, // subtitle text
      timestamp, // video timing
      course, // course name
      source: source.split(".")[0], // file/video ref
      score, // reranker score (optional)
    });
  });

  return Object.entries(grouped).map(([course, subtitles]) => ({
    course,
    subtitles,
  }));
}
