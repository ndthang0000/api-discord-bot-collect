const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const ApiTokenSchema = mongoose.Schema(
  {
    apiToken: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
ApiTokenSchema.plugin(toJSON);

/**
 * @typedef ApiToken
 */
const ApiToken = mongoose.model('ApiToken', ApiTokenSchema);

module.exports = ApiToken;
