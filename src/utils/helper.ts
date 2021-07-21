export function formatTime (time: DOMHighResTimeStamp) {
  time = Math.floor(time);
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  return minutes + ':' + (seconds > 10 ? seconds : '0' + seconds);
};
