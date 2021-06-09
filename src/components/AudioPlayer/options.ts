import { WaveSurferParams } from 'wavesurfer.js/types/params';

export interface Colors {
  lightColor: string;
  darkColor: string;
}

const formWaveSurferOptions = (
  ref: React.MutableRefObject<HTMLDivElement>,
  colors: Colors,
): WaveSurferParams => ({
  container: (ref as unknown) as HTMLDivElement,
  waveColor: colors.lightColor,
  progressColor: colors.darkColor,
  cursorColor: colors.darkColor,
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 40,
  normalize: true,
  partialRender: true,
  xhr: {
    credentials: 'same-origin',
    withCredentials: true,
    mode: 'cors',
  },
});

export default formWaveSurferOptions;
