const { getProgressFromBody } = require("../app/pull-requests-validator");

describe('Pull Requests Validator - getValidPullRequestsFromResponseBody', () => {
    it('should return progress without any pull request', () => {
        const body = {
            items: []
        };

        expect(getProgressFromBody(JSON.stringify(body))).toEqual({
            totalAmountOfPullRequests: 0,
            amountOfValidPullRequests: 0,
            avatar: "",
            pull_requests: []
        });
    });

    it('should return progress without valid pull requests', () => {
        const body = {
            items: [
                { created_at: "2018-09-01T00:00:00Z" },
                { created_at: "2018-12-01T00:00:00Z" }
            ]
        };

        expect(getProgressFromBody(JSON.stringify(body))).toEqual({
            totalAmountOfPullRequests: 2,
            amountOfValidPullRequests: 0,
            avatar: "",
            pull_requests: []
        });
    });

    it('should return progress containing the valid pull requests and the users avatar', () => {
        const body = {
            items: [{
                user: {
                    avatar_url: "avatar_url"
                },
                created_at: "2018-10-02T00:00:00Z",
                html_url: "html_state",
                state: "state"
            }]
        };

        expect(getProgressFromBody(JSON.stringify(body))).toEqual({
            totalAmountOfPullRequests: 1,
            amountOfValidPullRequests: 1,
            avatar: "avatar_url",
            pull_requests: [{
                url: "html_state",
                state: "state"
            }]
        });
    });
});