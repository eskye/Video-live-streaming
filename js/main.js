'use strict';

const dimensions = document.querySelector('p#dimensions');
const video = document.querySelector('video');
const stopBtn = document.querySelector('button#stop');
const playBtn = document.querySelector('button#play');
const screenshotBtn = document.querySelector('button#screenshot');
const applyFilterBtn = document.querySelector('button#applyFilter');
const img = document.querySelector('img');
const canvas = document.createElement('canvas');

//Css filters
let filterIndex = 0;
const filters = [
  'grayscale',
  'sepia',
  'blur',
  'brightness',
  'contrast',
  'hue-rotate',
  'hue-rotate2',
  'hue-rotate3',
  'saturate',
  'invert',
  ''
];

const constraints = {
    video: true,
  audio:true
};
const hasUserMedia = () => {
    return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
}
const isStreamSupported =  () => {
    if (hasUserMedia)
     return true;
    else
    alert('getUserMedia() is not supported by your browser');
  }

  const handleSuccess = (stream) => {
    window.stream = stream; // stream available to console
    console.log(stream);
    video.srcObject = stream;
  }
  
  const handleError = (error) => {
    console.log('navigator.getUserMedia error: ', error);
  }
  
  
  
  video.onplay = () => {
      isStreamSupported();
    dimensions.textContent = 'Actual video dimensions: ' + video.videoWidth +
    'x' + video.videoHeight + 'px.';
  };


  stopBtn.onclick = () => {
      video.pause();
  };

  playBtn.onclick = () => {
    navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);
  };

  screenshotBtn.onclick = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      img.src = canvas.toDataURL('image/webp');

  };

 applyFilterBtn.onclick = video.onclick = () => {
    video.className = filters[filterIndex++ % filters.length];
    console.log(filters[filterIndex++ % filters.length]);
    console.log(video);
  };