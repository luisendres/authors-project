const mongoose = require("mongoose");

module.exports = (db_name) => {
	mongoose
		.connect(`mongodb://localhost/${db_name}`)
		.then(() => {
			console.log(`Successfully connected to ${db_name}`);
		})
		.catch((err) => {
			console.log(`mongoose connection to ${db_name} failed:`, err);
		});
};

// mongoose.connect("mongodb://localhost/name_of_your_DB", {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// })
// 	.then(() => console.log("Established a connection to the database"))
// 	.catch(err => console.log("Something went wrong when connecting to the database", err));