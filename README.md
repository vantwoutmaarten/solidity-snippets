# solidity-snippets

chainlink-vrf-snippet
This will be the most barebone version of getting a random number with Chainlink.

The minimum requirements are:

- Create a subscription manager and subscription and add some link to the subscribtion manager. - After you have subscribption account deploy VRF v2 compatible contract, a VRFV2Consumer.sol.
  contract randomNumberConsumer is VRFV2Consumer...

Some terms to know:
The subscription is funded with link, so you can have an account for multiple consumer contracts.

- keyhash identifies which oracle.
- fee is how much you pay the node to get the number
- randomresult is the result you get back.
- construct vrf consumerbase(arg1, arg2) arg1 = the contract address that will check if a number was really random. , arg2 link token address

- getRandomNumber returns requestId, just the id of the request

  fullfillrandomness give the randomnumber for that id

  - fullFillRandomNess(requestId, randomNess) internal override {
    randomResult = randomNess.
    }
    }
