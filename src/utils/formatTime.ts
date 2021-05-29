interface IFormatTime {
  minutes: number | string;
  seconds: number | string;
}

const formatTime = (time: number): IFormatTime => {
  const rawMinutes = Math.floor(time / 60);
  const rawSeconds = Math.floor(time - rawMinutes * 60);
  const minutes = rawMinutes >= 10 ? rawMinutes : `0${rawMinutes}`;
  const seconds = rawSeconds >= 10 ? rawSeconds : `0${rawSeconds}`;
  return { minutes, seconds };
};

export default formatTime;
