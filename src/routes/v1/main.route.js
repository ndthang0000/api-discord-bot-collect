const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const commentValidation = require('../../validations/comment.validation');
const commentController = require('../../controllers/comment.controller');
const authApiKey = require('../../middlewares/auth.api.key');

const router = express.Router();

router.get('/comments', validate(commentValidation.getComments), commentController.getListComment);
router.post('/comment', validate(commentValidation.createNewComment), authApiKey, commentController.createNewComment);
router.put('/comment/:commentId', validate(commentValidation.changeStatusComment),auth(), commentController.changeStatusComment);
router.post('/generate-api-token', validate(commentValidation.generateTApiToken),auth(), commentController.generateTApiToken);

module.exports = router;

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Bot discord collect user feedback 
 *     description: Only bot discord can create a comment using X-API-KEY in headers request, get x-api-key from api generate-api-key below
 *     tags: [Comments]
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         schema:
 *           type: string
 *         description: Api key
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *               - discordUserId
 *               - discordUsername
 *               - discordChanelId
 *             properties:
 *               comment:
 *                 type: string
 *                 description: Opinion of user
 *               discordUserId:
 *                 type: string
 *                 description: User discord Id
 *               discordUsername:
 *                 type: string
 *                 description: Username discord
 *               discordChanelId:
 *                  type: string
 *                  description: Channel discord Id
 *             example:
 *               comment: The game so good, thank for publisher
 *               discordUserId: "659031583033917470"
 *               discordUsername: ndthang0000
 *               discordChanelId: "1192299961824579634"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Comment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 * /comments:
 *   get:
 *     summary: Get paginate comment
 *     description: Api public, all user can read.
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [new, resolved]
 *         description: Status of comment
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt:desc, createdAt:asc, timeUpdateStatus:desc]
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *         default: createdAt:desc
 *       - in: query
 *         name: discordUserId
 *         schema:
 *           type: string
 *         description: Filter by user Id
 *       - in: query
 *         name: discordUsername
 *         schema:
 *           type: string
 *         description: Filter by username
 *       - in: query
 *         name: discordChanelId
 *         schema:
 *           type: string
 *         description: Filter by channel Id
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 * /comment/{commentId}:
 *   put:
 *     summary: Change Status of comment
 *     description: Admin can change the status of comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: comment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 description: New status for comment
 *                 enum: [new, resolved]
 *                 default: resolved
 *             example:
 *               status: resolved
 *     responses:
 *       "201":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *
 *                $ref: '#/components/schemas/Comment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 * /generate-api-token:
 *   post:
 *     summary: Generate API key to attach in header request for authenticate
 *     description: Generate API key to attach in header request for authenticate
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Your name
 *             example:
 *               name: Your name
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                  data:
 *                    type: string
 *                example:
 *                  status: true
 *                  data: "Sdfsfsdfsf3423423432"
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
