const formatTime = (time: number): { minutes: number; seconds: number } => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);
  return { minutes, seconds };
};

export default formatTime;
