let stream;
let mediaRecorder;

export const getAudioStream = (preferredDeviceId = 'default') => {
  return navigator.mediaDevices.getUserMedia({ audio: { deviceId: preferredDeviceId } });
};

export const getAudioInputs = async () => {
  await getAudioStream(); // to get permission
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter(({ kind }) => kind === 'audioinput');
};

export const startRecording = async (preferredDeviceId, onData) => {
  stream = undefined;
  mediaRecorder = undefined;

  stream = await getAudioStream(preferredDeviceId);
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start();

  mediaRecorder.ondataavailable = (e) => {
    const blob = new Blob([e.data], { type: 'audio/webm; codecs=opus' });
    onData(blob);
  };
};

export const stopRecording = () => {
  if (mediaRecorder) mediaRecorder.stop();
  if (stream) stream.getTracks().forEach((track) => track.stop());
};
