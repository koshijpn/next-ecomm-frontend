import { PUBLIC_AWS_REGION, PUBLIC_AWS_BUCKET, PUBLIC_IDENTITY_POOL_ID } from '$env/static/public';
// import AWS from 'aws-sdk';

export async function uploadMedia (file, directory = "") {
  AWS.config.update({
    region: PUBLIC_AWS_REGION,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: PUBLIC_IDENTITY_POOL_ID
    })
  });
  
  // example.jpg
  // exaple@&  => example--
  // dir = images (folder)

  const getFileExtension = (str) => str.slice(str.lastIndexOf(".")); // .jpg
  const directoryKey = directory ? directory + "/" : ""; // images/
  const fileName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9]/gi, '-').toLowerCase(); // example /if other thing (a-z and 0-9) change to -
  const fileExtention = getFileExtension(file.name) // call getFileExtension ()
  const fullKey = directoryKey + fileName + fileExtention; // images/example.jpg => url

  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: PUBLIC_AWS_BUCKET,
      Key: fullKey,
      Body: file,
    }
  });

  try {
    const res = await upload.promise();
    return [file.name, res.Location];
  } catch (err) {
    return alert(`There was an error uploading your photo: ${err}`);
  }
}