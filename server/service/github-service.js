const request = require('request');
const i18n = require("../locales");

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
        const response = createErrorResponse(data.statusCode, body);
        return reject(response);
      } else {
        const jsonBody = JSON.parse(body);
        const validPullRequests = getValidPullRequestsFromResponseBody(jsonBody);
        let response = null;

        if (validPullRequests.length) {
          response = createValidPullRequestsResponse(validPullRequests);
        } else if (!jsonBody.items.length) {
          response = createNoPullRequestsResponse();
        } else {
          response = createNoValidPullRequestsResponse(jsonBody);
        }
        return resolve(response);
      }
    });
  });
}

const responseContainsClientOrServerError = (statusCode) => statusCode >= 400;

const createErrorResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: JSON.parse(body)
  };
}

const createNoPullRequestsResponse = () => {
  return {
    valid_pull_requests_amount: 0
  };
}

const createValidPullRequestsResponse = (validPullRequests) => {
  return {
    valid_pull_requests_amount: validPullRequests.length,
    avatar: validPullRequests[0].user.avatar_url,
    pull_requests: validPullRequests.map(item => {
      return {
        url: item.html_url,
        state: item.state
      }
    }),
    message: createMessageByPullrequestQuantity(validPullRequests.length)
  };
}

const getValidPullRequestsFromResponseBody = (responseBody) => {
  const START_HACKTOBER_2018 = '2018-10-01T00:00:00Z';
  const STOP_HACKTOBER_2018 = '2018-11-01T00:00:00Z';
  
  return responseBody.items
    .filter(item => new Date(item.created_at).getTime() > new Date(START_HACKTOBER_2018).getTime())
    .filter(item => new Date(item.created_at).getTime() < new Date(STOP_HACKTOBER_2018).getTime());
}

const createNoValidPullRequestsResponse = (jsonBody) => {
  return {
    valid_pull_requests_amount: 0,
    avatar: jsonBody.items[0].user.avatar_url,
    message: createMessageByPullrequestQuantity(0)
  };
}

const createMessageByPullrequestQuantity = (quantity) => {
  if (!quantity) {
    return i18n.t("no_pull_requests");
  } else if (quantity >= 1 && quantity <= 3) {
    return i18n.t("keep_it_up");
  } else if (quantity === 4) {
    return i18n.t("almost_there");
  } else {
    return i18n.t("congratulations");
  }
}

module.exports = {
    fetchPullRequestsOfUser, createMessageByPullrequestQuantity
}
