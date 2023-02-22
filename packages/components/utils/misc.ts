export const pad = (n: number) => String(n).padStart(2, '0')
export const formatTime = (time: number) =>
  `${pad(Math.floor(time / 60))}:${pad(time % 60)}`
