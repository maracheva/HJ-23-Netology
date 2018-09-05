'use strict';

if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    var getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}

function createThumbnail(video) {
  return new Promise((done, fail) => {
    const preview = document.createElement('video');
    preview.src = URL.createObjectURL(video);
    preview.addEventListener('loadeddata', () => preview.currentTime = 2);
    preview.addEventListener('seeked', () => {
      const snapshot = document.createElement('canvas');
      const context = snapshot.getContext('2d');
      snapshot.width = preview.videoWidth;
      snapshot.height = preview.videoHeight;
      context.drawImage(preview, 0, 0);
      snapshot.toBlob(done);
    });
  });
}

function record(app) {
  return new Promise((resolved, rejected) => {
      app.mode = 'preparing';
      let chunks = [];
      let recorder = null;

      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false
        })
        .then(stream => {
          app.mode = 'recording';
          app.preview.srcObject = stream;
          recorder = new MediaRecorder(stream);

          recorder.addEventListener('dataavailable', (e) => chunks
            .push(e.data));

          recorder.addEventListener('stop', (e) => {
            const recorded = new Blob(chunks, {
              'type': recorder.mimeType
            });
            chunks = null;
            recorder = stream = null;
            createThumbnail(recorded).then(res => {
              resolved({
                frame: res,
                video: recorded
              });
            })
          });

          recorder.start(1000);

          setTimeout(() => {
            recorder.stop();
            app.preview.srcObject = null;
            stream.getTracks().forEach(track => track.stop());
          }, app.limit);
        })
    })
    .catch(err => {
      console.warn(err);
      app.mode = 'error';
    })
}

