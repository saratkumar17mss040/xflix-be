const express = require('express');
const validate = require('../../middlewares/validate');
const {
	getVideosByQueryJoiSchema,
	getVideoByIdJoiSchema,
	postVideoJoiSchema,
	patchVoteSchema,
	patchViewsSchema,
} = require('../../validations/video.validation');
const videoController = require('../../controllers/video.controller');

const router = express.Router();

router.get('/', validate(getVideosByQueryJoiSchema), videoController.getVideos);
router.get(
	'/:videoId',
	validate(getVideoByIdJoiSchema),
	videoController.getVideoById
);
router.post('/', validate(postVideoJoiSchema), videoController.postVideo);
router.patch(
	'/:videoId/votes',
	validate(patchVoteSchema),
	videoController.patchVote
);
router.patch(
	'/:videoId/views',
	validate(patchViewsSchema),
	videoController.patchViewCount
);

module.exports = router;
