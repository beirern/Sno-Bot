// Class that interacts with GCP Storage
// https://cloud.google.com/storage/docs/downloading-objects#storage-download-object-nodejs

// Imports the Google Cloud client library
const fs = require('fs');
const { Storage } = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

class StorageHandler {
  // const bucketName = 'Name of a bucket, e.g. my-bucket';
  // const srcFilename = 'Remote file to download, e.g. file.txt';
  // const destFilename = 'Local destination for file, e.g. ./local/path/to/file.txt';
  static async downloadFile(bucketName, srcFilename, destFilename) {
    if (fs.existsSync(destFilename)) {
      console.log('File exists! Skipping dowload.');
      return;
    }
    console.log('Downloading...');

    const options = {
      // The path to which the file should be downloaded, e.g. "./file.txt"
      destination: destFilename,
    };

    // Downloads the file
    await storage.bucket(bucketName).file(srcFilename).download(options);

    console.log(
      `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`,
    );
  }
}

module.exports = StorageHandler;
