const getProgressFromBody = (body) => {
  const jsonBody = JSON.parse(body);

  const validPullRequests = getValidPullRequestsFromResponseBody(jsonBody);
  const avatar_of_user = validPullRequests.length ? validPullRequests[0].user.avatar_url : "";

  return {
    totalAmountOfPullRequests: jsonBody.items.length,
    amountOfValidPullRequests: validPullRequests.length,
    avatar: avatar_of_user,
    pull_requests: validPullRequests.map(item => {
      return {
        url: item.html_url,
        state: item.state
      }
    })
  };
}

const getValidPullRequestsFromResponseBody = (responseBody) => {
  const START_HACKTOBER_2018 = '2018-10-01T00:00:00Z';
  const STOP_HACKTOBER_2018 = '2018-11-01T00:00:00Z';
  
  return responseBody.items
    .filter(item => new Date(item.created_at).getTime() > new Date(START_HACKTOBER_2018).getTime())
    .filter(item => new Date(item.created_at).getTime() < new Date(STOP_HACKTOBER_2018).getTime());
}

module.exports = {
  getProgressFromBody
}