exports.parseSearchResponse = (data) => {
  const results = [];
  const { meta, response } = data;
  if (!meta || (meta && meta.status !== 200)) return results;
  const { hits, song } = response;

  if (song) {
    return getFlatObject(song);
  }

  hits.forEach((hit) => {
    const { type, result } = hit;

    results.push({
      type,
      ...getFlatObject(result),
    });
  });

  return results;
};

const getFlatObject = (data) => {
  return Object.keys(data).reduce((obj, key) => {
    if (typeof data[key] !== "object") obj[key] = data[key];

    return obj;
  }, {});
};

exports.extractLyricsFromJs = (data) => {
  try {
    const match = data.match(/<p>(.*?)<.\/p>/g);
    const lyrics = match ? match[0] : "";
    let sanitized = lyrics.replace(/href=/g, "");
    sanitized = sanitized.replace(/\\n/g, "");
    sanitized = sanitized.replace(/\\/g, "");

    return sanitized;
  } catch (e) {
    return "";
  }
};
