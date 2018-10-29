function ValidPullRequestsResponse(pullRequestProgress, responseMessage) {
  return {
    valid_pull_requests_amount: pullRequestProgress.amountOfValidPullRequests,
    avatar: pullRequestProgress.avatar,
    pull_requests: pullRequestProgress.pull_requests,
    message: responseMessage
  };
}

module.exports = ValidPullRequestsResponse;