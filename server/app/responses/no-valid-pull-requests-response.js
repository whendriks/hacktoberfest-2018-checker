function NoValidPullRequestsResponse(pullRequestProgress, responseMessage) {
    return {
        valid_pull_requests_amount: 0,
        avatar: pullRequestProgress.avatar,
        message: responseMessage
    };
}

module.exports = NoValidPullRequestsResponse;