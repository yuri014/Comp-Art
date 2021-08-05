const createOpmizeUrl = (url: string): string => {
  const s3 = 'comp-art.s3.sa-east-1.amazonaws.com/';

  if (url.includes(s3)) {
    return url.replace(s3, 'disvvqjpzmorn.cloudfront.net/');
  }

  return url;
};

export default createOpmizeUrl;
