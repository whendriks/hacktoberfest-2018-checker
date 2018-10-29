const NoPullRequestResponse = require("./responses/no-pull-request-response");
const ValidPullRequestsResponse = require("./responses/valid-pull-requests-response");
const NoValidPullRequestsResponse = require("./responses/no-valid-pull-requests-response");

const i18n = require("../locales");

const createErrorResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: JSON.parse(body)
  };
}

const createProgressResponse = (pullRequestProgress) => {
  if (pullRequestProgress.amountOfValidPullRequests) {
    let message = createResponseMessageByPullrequestQuantity(pullRequestProgress.amountOfValidPullRequests);
    return new ValidPullRequestsResponse(pullRequestProgress, message);
  } else if (!pullRequestProgress.totalAmountOfPullRequests) {
    return new NoPullRequestResponse();
  } else {
    let message = createResponseMessageByPullrequestQuantity(0);
    return new NoValidPullRequestsResponse(pullRequestProgress, message);
  }
}

const createResponseMessageByPullrequestQuantity = (quantity) => {
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
  createErrorResponse, createProgressResponse, createResponseMessageByPullrequestQuantity
}