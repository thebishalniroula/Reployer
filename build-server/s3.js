const { S3Client } = require("@aws-sdk/client-s3");

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

const s3Client = new S3Client({
  region: AWS_REGION || "ap-south-1",
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

module.exports = s3Client;
