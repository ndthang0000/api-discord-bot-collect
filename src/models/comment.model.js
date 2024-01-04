const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { STATUS_COMMENT } = require('../constants/chore');

const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    discordUserId: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    discordUsername: {
      type: String,
      required: true,
      trim: true,
    },
    discordChanelId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: STATUS_COMMENT.NEW,
      enum: Object.values(STATUS_COMMENT),
    },
    timeUpdateStatus: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
commentSchema.plugin(toJSON);
commentSchema.plugin(paginate);

const comment = mongoose.model('comment', commentSchema);

module.exports = comment;
