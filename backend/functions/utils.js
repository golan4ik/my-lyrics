exports.parseSearchResponse = (data) => {
    const results = [];
    const { meta, response } = data;
    if (!meta || (meta && meta.status !== 200)) return results;
    const { hits } = response;
  
    hits.forEach((hit) => {
      const { type, result } = hit;
  
      results.push({
        type,
        ...result,
      });
    });
  
    return results;
  };