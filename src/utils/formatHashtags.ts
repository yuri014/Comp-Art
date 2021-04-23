const formatMetaHashtags = (hashtags: Array<string>): string =>
  `${hashtags.slice(0, -1).join(', ').replace(/#/g, '')} e ${hashtags
    .slice(-1)
    .join('')
    .replace('#', '')}`;

export default formatMetaHashtags;
