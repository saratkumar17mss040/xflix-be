const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getVotesJoiSchema = Joi.object({
	upVotes: Joi.number().integer().default(0),
	downVotes: Joi.number().integer().default(0),
}).default();

const postVideoJoiSchema = {
	body: Joi.object().keys({
		videoLink: Joi.string()
			.required()
			.custom((value, helpers) => {
				if (!value.match(/^youtube\.com\/embed\/[a-zA-Z0-9_-]{11}$/i)) {
					return helpers.message('Please submit a valid youtube link');
				}
				return value;
			}),
		title: Joi.string().required(),
		genre: Joi.string()
			.required()
			.valid(
				'Education',
				'Sports',
				'Movies',
				'Comedy',
				'Lifestyle',
				'All Genre'
			),
		contentRating: Joi.string()
			.required()
			.valid('Anyone', '7+', '12+', '16+', '18+'),
		releaseDate: Joi.date().required(),
		previewImage: Joi.string()
			.required()
			.custom((value, helpers) => {
				if (
					!value.match(
						/^https:\/\/i\.ytimg\.com\/vi\/[a-zA-Z0-9_-]{11}\/.*\.jpg/i
					)
				) {
					return helpers.message(
						'Please submit a valid format for YouTube preview images'
					);
				}
				return value;
			}),
		votes: getVotesJoiSchema.optional(),
		viewCount: Joi.number().integer().default(0),
	}),
};

const getVideoByIdJoiSchema = {
	params: Joi.object().keys({
		videoId: Joi.string().custom(objectId),
	}),
};

const getVideosByQueryJoiSchema = {
	query: Joi.object().keys({
		title: Joi.string(),
		genres: Joi.string()
			.regex(/^All|Education|Sports|Comedy|Lifestyle*$/)
			.message(
				'Invalid genres query parameter. Valid values are: All, Education, Sports, Comedy, Lifestyle.'
			),
		contentRating: Joi.string().valid('All Age', '7+', '12+', '16+', '18+'),
		sortBy: Joi.string().valid('viewCount', 'releaseDate'),
	}),
};

const patchVoteSchema = {
	body: Joi.object().keys({
		vote: Joi.string().valid('upVote', 'downVote').required(),
		change: Joi.string().valid('increase', 'decrease').required(),
	}),
	params: Joi.object().keys({
		videoId: Joi.string().custom(objectId),
	}),
};

const patchViewsSchema = {
	params: Joi.object().keys({
		videoId: Joi.string().custom(objectId),
	}),
};

module.exports = {
	getVideosByQueryJoiSchema,
	getVideoByIdJoiSchema,
	postVideoJoiSchema,
	patchVoteSchema,
	patchViewsSchema,
};
