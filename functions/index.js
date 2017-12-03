'use strict';

const functions = require('firebase-functions');
const mkdirp = require('mkdirp-promise');
const vision = require('@google-cloud/vision')();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const gcs = require('@google-cloud/storage')();
const os = require('os');
const fs = require('fs');

const watchBucketFiles = functions.storage.object().onChange(_analyseNewImage);

exports.blurOffensiveImages = watchBucketFiles;

/**
 * Checks if an image is flagged as Adult or Violence
 * by the Cloud Vision API 
 * and if it is blur it using ImageMagick.
 * @method _analyseNewImage
 * @param  {Object} event - File change event
 * @return {Promise} Safe search analysis
 */
function _analyseNewImage(event) {
  const object = event.data;
  const file = gcs.bucket(object.bucket).file(object.name);

  // Exit if this is a move or deletion event.
  const wasRemoved = object.resourceState === 'not_exists';
  if (wasRemoved) {
    return console.log('This is a deletion event.');
  }

  const cloudVisionAPI = {
    safeSearchAnalysis: vision.detectSafeSearch(file),
  };

  // Check the image content using the Cloud Vision API.
  return cloudVisionAPI.safeSearchAnalysis
    .then(data => {
      const safeSearch = data[0];
      const isInnapropiate = safeSearch.adult || safeSearch.violence;

      console.log('SafeSearch results on image:', safeSearch);

      if (isInnapropiate) {
        const filePath = object.name;
        const bucketName = object.bucket;
        const metadata = object.metadata;

        return _blurImage(filePath, bucketName, metadata);
      }
    });
}

/**
 * Blurs the given image located in the given bucket using ImageMagick.
 * @method _blurImage
 * @param  {String}  filePath   - File name
 * @param  {String}  bucketName - Target bucket name
 * @param  {Object}  metadata   - JSON metadata
 * @return {Promise} Blurring steps chained promises
 */
function _blurImage(
  filePath,
  bucketName,
  metadata
) {
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const bucket = gcs.bucket(bucketName);

  const steps = {
    downloadFile: () => {
      console.log('Temporary directory has been created', tempLocalDir);

      return bucket.file(filePath).download({destination: tempLocalFile});
    },
    applyBlur: () => {
      console.log('The file has been downloaded to', tempLocalFile);

      return spawn('convert', [tempLocalFile, '-channel', 'RGBA', '-blur', '0x56', tempLocalFile]);
    },
    uploadFile: () => {
      console.log('Blurred image created at', tempLocalFile);

      const newFileOptions = {
        destination: filePath,
        metadata: {
          metadata: metadata // Keeping custom metadata.
        },
      };

      return bucket.upload(tempLocalFile, newFileOptions);
    },
    deteleTemp: () => {
      console.log('Blurred image uploaded to Storage at', filePath);

      fs.unlinkSync(tempLocalFile);

      console.log('Deleted local file', filePath);
    },
  };

  return mkdirp(tempLocalDir) // Create the temp directory where the storage file will be downloaded.
    .then(steps.downloadFile) // Download file from bucket.
    .then(steps.applyBlur)    // Blur the image using ImageMagick.
    .then(steps.uploadFile)   // Upload the Blurred image.
    .then(steps.deteleTemp);  // Erase temporal file.
}
>>>>>>> master
