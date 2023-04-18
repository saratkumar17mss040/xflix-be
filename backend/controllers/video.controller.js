const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { videoService } = require('../services');

const getVideos = catchAsync(async (req, res) => {
	try {
		let videos;
		let { query } = req;
		videos = await videoService.getVideoByQuery(query);
		if (!videos) {
			throw new ApiError(httpStatus.NOT_FOUND, 'All Videos not found');
		}
		res.send(videos);
	} catch (err) {
		const { statusCode, message } = err;
		if (!statusCode) {
			return res.status(500).send({ message: 'Internal server Error' });
		}
		res.status(statusCode).send({ statusCode, message });
	}
});

const getVideoById = catchAsync(async (req, res) => {
	try {
		const video = await videoService.getVideoById(req.params.videoId);
		if (!video) {
			throw new ApiError(httpStatus.NOT_FOUND, 'Video not found');
		}
		res.send(video);
	} catch (err) {
		const { statusCode, message } = err;
		if (!statusCode) {
			return res.status(500).send({ message: 'Internal server Error' });
		}
		res.status(statusCode).send({ statusCode, message });
	}
});

const postVideo = catchAsync(async (req, res) => {
	try {
		const { body } = req;
		const video = await videoService.postVideo(body);
		res.status(201).send(video);
	} catch (err) {
		const { statusCode, message } = err;
		if (!statusCode)
			return res.status(500).send({ message: 'Internal server Error' });
		res.status(statusCode).send({ statusCode, message });
	}
});

const patchVote = catchAsync(async (req, res) => {
	try {
		const { videoId } = req.params;
		const { vote, change } = req.body;
		await videoService.patchVoteCount(videoId, vote, change);
		res.sendStatus(204);
	} catch (error) {
		const { statusCode, message } = error;
		if (!statusCode)
			return res.status(500).send({ message: 'Internal server Error' });
		res.status(statusCode).send({ statusCode, message });
	}
});

const patchViewCount = catchAsync(async (req, res) => {
	try {
		const { videoId } = req.params;
		await videoService.patchViewCount(videoId);
		res.sendStatus(204);
	} catch (error) {
		const { statusCode, message } = error;
		if (!statusCode)
			return res.status(500).send({ message: 'Internal server Error' });
		res.status(statusCode).send({ statusCode, message });
	}
});

module.exports = {
	getVideos,
	getVideoById,
	postVideo,
	patchVote,
	patchViewCount,
};
