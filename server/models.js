const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	isAdmin: { type: Boolean, default: false },
});

UserSchema.pre("save", function (next) {
	const user = this;
	if (!user.isModified("password")) return next();
	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
	let check = await bcrypt.compare(candidatePassword, this.password);
	return check;
};

const FormFieldSchema = new mongoose.Schema({
	field_id: { type: String },
	label: { type: String },
	kind: { type: String },
	type: { type: String },
	value: { type: String, default: "" },
	options: [
		{
			option_id: { type: String },
			label: { type: String },
			selected: { type: Boolean, default: false },
		},
	],
});

const FormSchema = new mongoose.Schema({
	form_id: { type: String, required: true, unique: true, index: true },
	title: { type: String, default: "Untitled Form" },
	fields: [FormFieldSchema],
	attempts: [
		{
			attempt_id: { type: Number },
			date: { type: Date },
			answers: [FormFieldSchema],
			user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		},
	],
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports.User = mongoose.model("User", UserSchema);
module.exports.Form = mongoose.model("Form", FormSchema);
