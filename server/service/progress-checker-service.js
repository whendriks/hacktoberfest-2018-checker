const request = require('request');

const responseCreator = require("./response-creator");
const pullRequestsValidator = require("./pull-requests-validator");

const fetchPullRequestsOfUser = (username) => {
  return new Promise((resolve, reject) => {
    const API_PREVIEW_COMMIT_SEARCH = 'application/vnd.github.cloak-preview';
    const GITHUB_USER_DOING_REQUEST = 'tminussi';

    request.get({
      url: `https://api.github.com/search/issues?q=author:${username}+type:pr`,
      headers: {
        Accept: API_PREVIEW_COMMIT_SEARCH,
        'User-Agent': GITHUB_USER_DOING_REQUEST
      }
    }, (err, data, body) => {
      if (responseContainsClientOrServerError(data.statusCode)) {
        const response = responseCreator.createErrorResponse(data.statusCode, body);
        return reject(response);
      } else {
        const pullRequestProgress = pullRequestsValidator.getProgressFromBody(body);
        const response = responseCreator.buildProgressResponse(pullRequestProgress);

        return resolve(response);
      }
    });
  });
}

const responseContainsClientOrServerError = (statusCode) => statusCode >= 400;

module.exports = {
    fetchPullRequestsOfUser
}
