const video = document.querySelector('video');
const startRecordBtn = document.querySelector('button#btn-start-recording');
const stopRecordBtn = document.querySelector('button#btn-stop-recording');

const constraints = {
    video: true,
  audio:true
};


startRecordBtn.onclick = (e) => {
    navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);
}

let recorder;
const handleSuccess = (stream) => {
    startRecordBtn.disabled = true;
    window.stream = stream;
    video.muted = true;
    video.volume = 0;
    video.srcObject = stream;

    recorder = RecordRTC(stream, {
        type: 'video'
    });

    recorder.startRecording();

    // release camera on stopRecording
    recorder.camera = stream;
    stopRecordBtn.disabled = false;
  }
  const stopRecordingCallback = () => {
    video.src = video.srcObject = null;
    video.muted = false;
    video.volume = 1;
    video.src = URL.createObjectURL(recorder.getBlob());
    
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}

stopRecordBtn.onclick = (e) => {
  e.disabled = true;
  recorder.stopRecording(stopRecordingCallback);
}

  const handleError = (error) => {
    console.log('navigator.getUserMedia error: ', error);
  }