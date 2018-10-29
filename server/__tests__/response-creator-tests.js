const { createErrorResponse, createProgressResponse, createResponseMessageByPullrequestQuantity } = require('../app/response-creator');

describe('Response Creator - createResponseMessageByPullrequestQuantity', () => {
    it('should return a message if quantity is 0', () => {
        expect(createResponseMessageByPullrequestQuantity(0)).toEqual(`You haven't created any Pull Requests so far. Start contributing to the Open Source Community and Win a T-Shirt at 5 PRs`);
    });

    it('should return a message if quantity is between 1 and 3', () => {
        expect(createResponseMessageByPullrequestQuantity(2)).toEqual(`Great job. The Open Source community is already thankful to you, but you can achieve more. Keep it up!`);
    });

    it('should return a message if quantity is 4', () => {
        expect(createResponseMessageByPullrequestQuantity(4)).toEqual(`You are almost there! One more to go and you will be able to wear one of the coolest T-Shirts out there`);
    });

    it('should return a message if quantity is >= 5', () => {
        expect(createResponseMessageByPullrequestQuantity(5)).toEqual(`You did it! Congratulations! Time to rest and wait for your well deserved T-Shirt!`);
    });
});

describe('Response Creator - createErrorResponse', () => {
    it('should return object with given error status code and body', () => {
        const statusCode = 404;
        const bodyString = '{"test":"test"}';

        expect(createErrorResponse(statusCode, bodyString)).toEqual({
            statusCode: statusCode,
            body: JSON.parse(bodyString)
        });
    });
});

describe('Response Creator - createProgressResponse', () => {
    it('should return ValidPullRequestsResponse when progress contains one valid pull request', () => {
        const pullRequestProgressWithValidPullRequests = {
            amountOfValidPullRequests: 1
        };

        expect(createProgressResponse(pullRequestProgressWithValidPullRequests)).toEqual({
            valid_pull_requests_amount: 1,
            message: "Great job. The Open Source community is already thankful to you, but you can achieve more. Keep it up!"
        });
    });

    it('should return NoPullRequestResponse when progress contains no pull requests', () => {
        const pullRequestProgressWithoutPullRequests = {};

        expect(createProgressResponse(pullRequestProgressWithoutPullRequests)).toEqual({
            valid_pull_requests_amount: 0
        });
    });

    it('should return NoValidPullRequestsResponse when progress contains one pull request, but is not valid', () => {
        const pullRequestProgressWithoutValidPullRequests = {
            totalAmountOfPullRequests: 1
        };

        expect(createProgressResponse(pullRequestProgressWithoutValidPullRequests)).toEqual({
            valid_pull_requests_amount: 0,
            message: "You haven't created any Pull Requests so far. Start contributing to the Open Source Community and Win a T-Shirt at 5 PRs"
        });
    });
});