const { createResponseMessageByPullrequestQuantity } = require('../app/response-creator');

describe('Response Creator - createMessage', () => {
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