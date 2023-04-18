const { Video } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const dayjs = require('dayjs');
dayjs.extend(customParseFormat);

const getVideos = async () => {
	return Video.find({});
};

// getVideoByQuery
const getVideoByQuery = async (queryObj) => {
	let videoDocuments = await Video.find({});
	const queryKeyArray = Object.keys(queryObj);
	if (queryKeyArray.length === 0) return videoDocuments;
	if (queryObj.hasOwnProperty('genres')) {
		const genresArray = queryObj.genres.split(',');
		if (genresArray.includes('All')) {
			return videoDocuments;
		} else {
			let filteredByGenres = [];
			genresArray.forEach((genre) => {
				filteredByGenres = [
					...filteredByGenres,
					...videoDocuments.filter((video) => video.genre === genre),
				];
			});
			videoDocuments = filteredByGenres;
		}
	}
	if (queryObj.hasOwnProperty('title')) {
		videoDocuments = videoDocuments.filter((video) =>
			video.title.match(new RegExp(queryObj.title, 'gi'))
		);
	}
	if (queryObj.hasOwnProperty('contentRating')) {
		const contentRatingArray = queryObj.contentRating.split(',');
		let filteredByContentRating = [];
		contentRatingArray.forEach((contentRating) => {
			filteredByContentRating = [
				...filteredByContentRating,
				...videoDocuments.filter(
					(video) => video.contentRating === contentRating
				),
			];
		});
		videoDocuments = filteredByContentRating;
	}
	if (queryObj.hasOwnProperty('sortBy')) {
		if (queryObj.sortBy === 'viewCount') {
			// sortBy descending order - by viewCount
			videoDocuments.sort(
				(firstVideo, secondVideo) =>
					secondVideo.viewCount - firstVideo.viewCount
			);
		} else if (queryObj.sortBy === 'releaseDate') {
			// sortBy descending order - by releaseDate
			videoDocuments.sort((firstVideo, secondVideo) =>
				// secondVideo.releaseDate - firstVideo.releaseDate
				dayjs(secondVideo.releaseDate, 'DD MMM YYYY').diff(
					dayjs(firstVideo.releaseDate, 'DD MMM YYYY')
				)
			);
		}
	}
	return videoDocuments;
};

const getVideoById = async (id) => {
	return Video.findById(id);
};

const postVideo = async (body) => {
	try {
		const video = await Video.create(body);
		return video;
	} catch (error) {
		if (error.name === 'MongoError' && error.code === 11000) {
			throw new ApiError(httpStatus.CONFLICT, 'Enter a unique video URL');
		} else {
			console.log('ise=====>');
			throw new ApiError(
				httpStatus.INTERNAL_SERVER_ERROR,
				'Internal server error'
			);
		}
	}
};

const patchVoteCount = async (id, vote, change) => {
	const video = await Video.findById(id);
	if (!video) throw new ApiError(httpStatus.NOT_FOUND, 'No such video exists');
	if (change === 'increase') {
		const incVote = (parseInt(video.votes[vote + 's'], 10) + 1).toString(10);
		video.votes[vote + 's'] = incVote;
	} else if (change === 'decrease') {
		if (video.votes[vote + 's'] === '0')
			throw new ApiError(
				httpStatus.BAD_REQUEST,
				'Upvotes or Downvotes cannot be made less than 0'
			);
		const decVote = (parseInt(video.votes[vote + 's'], 10) - 1).toString(10);
		video.votes[vote + 's'] = decVote;
	}
	await video.save();
};

const patchViewCount = async (id) => {
	const video = await Video.findById(id);
	if (!video) throw new ApiError(httpStatus.NOT_FOUND, 'No such video exists');
	video.viewCount = video.viewCount + 1;
	await video.save();
};

module.exports = {
	getVideos,
	getVideoById,
	getVideoByQuery,
	postVideo,
	patchVoteCount,
	patchViewCount,
};
