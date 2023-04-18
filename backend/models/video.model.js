const mongoose = require('mongoose');

const votesSchema = new mongoose.Schema(
	{
		upVotes: { type: String, default: 0 },
		downVotes: { type: String, default: 0 },
	},
	{ _id: false }
);

const videoSchema = new mongoose.Schema({
	votes: { type: votesSchema, default: {} },
	previewImage: {
		type: String,
		required: true,
		validate: /^https:\/\/i\.ytimg\.com\/vi\/[a-zA-Z0-9_-]{11}\/.*\.jpg/i,
	},
	viewCount: { type: Number, default: 0 },
	title: { type: String, required: true },
	videoLink: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		validate: /^youtube\.com\/embed\/[a-zA-Z0-9_-]{11}$/i,
	},
	genre: { type: String, required: true },
	contentRating: { type: String, required: true },
	releaseDate: { type: String, required: true },
});

const Video = mongoose.model('Video', videoSchema);

module.exports.Video = Video;
