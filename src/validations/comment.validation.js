const Joi = require('joi');
const { STATUS_COMMENT } = require('../constants/chore');
const { objectId } = require('./custom.validation');

const getComments = {
  query: Joi.object().keys({
    sortBy: Joi.string().valid('createdAt:desc','createdAt:asc','timeUpdateStatus:desc'),
    limit: Joi.number().integer().default(10),
    page: Joi.number().integer().default(1),
    status: Joi.string().valid(STATUS_COMMENT.NEW, STATUS_COMMENT.RESOLVED),
    discordUserId: Joi.string(),
    discordUsername: Joi.string(),
    discordChanelId: Joi.string(),
  }),
};

const createNewComment = {
  body: Joi.object().keys({
    comment: Joi.string().required(),
    discordUserId: Joi.string().required(),
    discordUsername: Joi.string().required(),
    discordChanelId: Joi.string().required(),
  }),
};

const changeStatusComment = {
  params: Joi.object().keys({
    commentId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    status: Joi.string().required().valid(STATUS_COMMENT.NEW,STATUS_COMMENT.RESOLVED),
  }),
};

module.exports = {
  createNewComment,
  getComments,
  changeStatusComment
}