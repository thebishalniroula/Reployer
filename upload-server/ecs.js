const { ECSClient } = require("@aws-sdk/client-ecs");

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

const ecsClient = new ECSClient({
  region: AWS_REGION || "ap-south-1",
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

module.exports = ecsClient;
