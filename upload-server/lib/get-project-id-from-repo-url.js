const getProjectIdFromRepoUrl = (url) => {
  return url.split("/").pop();
};

module.exports = getProjectIdFromRepoUrl;
