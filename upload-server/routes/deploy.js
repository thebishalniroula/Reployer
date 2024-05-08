const getProjectIdFromRepoUrl = require("../lib/get-project-id-from-repo-url");
const spinUpContainer = require("../lib/spin-up-conteiner");
const deploy = async (req, res) => {
  const { github_repo_url: GIT_REPO_URL } = req.body;

  if (!GIT_REPO_URL) {
    res.status(400).send("Missing github repo");
    return;
  }

  const PROJECT_ID = getProjectIdFromRepoUrl(GIT_REPO_URL);

  try {
    await spinUpContainer({
      environement: process.env.ENVIROMENT,
      gitRepoUrl: GIT_REPO_URL,
      projectId: PROJECT_ID,
    });
    res.sendStatus(200);
    return;
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }
};

module.exports = { deploy };
