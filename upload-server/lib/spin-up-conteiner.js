const { RunTaskCommand } = require("@aws-sdk/client-ecs");
const Docker = require("dockerode");
const docker = new Docker();

function startLocalContainer(githubRepo, projectId) {
  return new Promise((resolve, reject) => {
    docker.createContainer(
      {
        Image: "builder-server",
        Env: [
          "AWS_REGION=" + process.env.AWS_REGION,
          "AWS_ACCESS_KEY_ID=" + process.env.AWS_ACCESS_KEY_ID,
          "AWS_SECRET_ACCESS_KEY=" + process.env.AWS_SECRET_ACCESS_KEY,
          "AWS_BUCKET=" + process.env.AWS_BUCKET,
          "PROJECT_ID=" + projectId,
          "GIT_REPO_URL=" + githubRepo,
        ],
      },
      function (err, container) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          container.start(function (err, data) {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(data.toString());
              console.log("Container started successfully - ", data.toString());
            }
          });
        }
      }
    );
  });
}

const startRemoteContainer = (githubRepo, projectId) => {
  return new Promise(async (resolve, reject) => {
    const command = new RunTaskCommand({
      cluster: process.env.CLUSTER,
      taskDefinition: process.env.TASK_DEFINATIOn,
      launchType: "FARGATE",
      networkConfiguration: {
        awsvpcConfiguration: {
          subnets: process.env.SUBNETS.split(","),
        },
      },
      overrides: {
        containerOverrides: [
          {
            environment: [
              {
                name: "AWS_REGION",
                value: process.env.AWS_REGION,
              },
              {
                name: "AWS_ACCESS_KEY_ID",
                value: process.env.AWS_ACCESS_KEY_ID,
              },
              {
                name: "AWS_SECRET_ACCESS_KEY",
                value: process.env.AWS_SECRET_ACCESS_KEY,
              },
              {
                name: "PROJECT_ID",
                value: projectId,
              },
              {
                name: "GIT_REPO_URL",
                value: gitRepoUrl,
              },
            ],
          },
        ],
      },
    });
    try {
      const data = await ecsClient.send(command);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const spinUpContainer = ({ environement, gitRepoUrl, projectId }) => {
  if (environement === "production") {
    return startRemoteContainer(gitRepoUrl, projectId);
  } else {
    return startLocalContainer(gitRepoUrl, projectId);
  }
};

module.exports = spinUpContainer;
