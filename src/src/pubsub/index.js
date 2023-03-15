const { PubSub } = require('apollo-server-express');

const pubSub = new PubSub();

const pubSubTopics = {};

module.exports = { pubSub, pubSubTopics };
