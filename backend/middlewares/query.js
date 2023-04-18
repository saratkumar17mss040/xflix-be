// const allowQueryParams = (expectedParams) => {
// 	return function (req, res, next) {
// 		const missingParams = [];

// 		// Check if each expected parameter is present and has the expected value
// 		expectedParams.forEach((param) => {
// 			const expectedValue = param.value;
// 			const actualValue = req.query[param.name];
// 			if (expectedValue !== actualValue) {
// 				missingParams.push(param.name);
// 			}
// 		});

// 		if (missingParams.length === 0) {
// 			// All expected parameters are present and have the expected values
// 			next(); // Call the next middleware function in the chain
// 		} else {
// 			// Some expected parameters are missing or have incorrect values
// 			const errorMessage = `Missing or invalid query parameters: ${missingParams.join(
// 				', '
// 			)}`;
// 			res.status(400).send(errorMessage);
// 		}
// 	};
// }

// module.exports = allowQueryParams;