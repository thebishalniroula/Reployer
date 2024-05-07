const { exec } = require("child_process");
const { lstat, readdirSync, createReadStream, lstatSync } = require("fs");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("./s3.js");
const mime = require("mime-types");

const path = require("path");
async function init() {
  const codeDir = path.join(__dirname, "/code");

  const p = exec(`cd ${codeDir} && npm install && npm run build`);

  p.stdout.on("data", (data) => console.log(data.toString()));
  p.stderr.on("data", (data) => console.error(`Error: ${data.toString()}`));
  p.on("close", async (code) => {
    console.log(`Build complete with code ${code}`);
    console.log("Uploading dist to s3");
    const distDir = path.join(codeDir, "dist");
    await uploadFolderToS3(distDir, s3Client);
    console.log("Upload complete");
  });
}

init();

async function uploadFolderToS3(distDir, s3Client) {
  const buildFiles = readdirSync(distDir, { recursive: true });

  for (const file of buildFiles) {
    const filePath = path.join(distDir, file);

    const isDirectory = lstatSync(filePath).isDirectory();
    if (isDirectory) {
      continue;
    }

    const projectId = process.env.PROJECT_ID;
    const bucketName = process.env.AWS_BUCKET;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: `${projectId}/${file}`,
      ContentType: mime.lookup(filePath),
      Body: createReadStream(filePath),
    });
    try {
      await s3Client.send(command);
    } catch (error) {
      console.log(error);
    }
  }
}
