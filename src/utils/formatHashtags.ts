const formatMetaHashtags = (hashtags: Array<string>): string => {
  if (hashtags.length === 1) {
    return hashtags[0];
  }

  return `${hashtags
    .slice(0, -1)
    .join(', ')
    .replace(/#/g, '')} e ${hashtags.slice(-1).join('').replace('#', '')}`;
};

export default formatMetaHashtags;
