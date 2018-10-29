const i18n = require("../locales");

const createErrorResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: JSON.parse(body)
  };
}

const buildProgressResponse = (pullRequestProgress) => {
  let response = null;

  if (pullRequestProgress.amountOfValidPullRequests) {
    response = createValidPullRequestsResponse(pullRequestProgress);
  } else if (!pullRequestProgress.totalAmountOfPullRequests) {
    response = createNoPullRequestsResponse();
  } else {
    response = createNoValidPullRequestsResponse(pullRequestProgress);
  }

  return response;
}

const createNoPullRequestsResponse = () => {
  return {
    valid_pull_requests_amount: 0
  };
}

const createValidPullRequestsResponse = (pullRequestProgress) => {
  return {
    valid_pull_requests_amount: pullRequestProgress.amountOfValidPullRequests,
    avatar: pullRequestProgress.avatar,
    pull_requests: pullRequestProgress.pull_requests,
    message: createMessageByPullrequestQuantity(pullRequestProgress.amountOfValidPullRequests)
  };
}

const createNoValidPullRequestsResponse = (pullRequestProgress) => {
  return {
    valid_pull_requests_amount: 0,
    avatar: pullRequestProgress.avatar,
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
  createErrorResponse, buildProgressResponse, createMessageByPullrequestQuantity
}