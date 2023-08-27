const models = require("./models");
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/api/register", async (req, res) => {
	const { email, password, isAdmin } = req.body;
	const user = new models.User({ email, password, isAdmin });
	await user.save();
	const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
	res.send({ token });
});

router.get("/api/user", async (req, res) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const { userId } = jwt.verify(token, process.env.SECRET_KEY);
		const user = await models.User.findById(userId);
		res.send(user);
	} catch (error) {
		res.status(401).send({ error: "Invalid token" });
	}
});

router.post("/api/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await models.User.findOne({ email });
	if (!user) {
		return res.status(422).send({ error: "Invalid password or email" });
	}
	try {
		if (!(await user.comparePassword(password))) throw new Error();
		const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
		res.send({ token });
	} catch (err) {
		return res.status(422).send({ error: "Invalid password or email" });
	}
});

router.post("/api/forms", async (req, res) => {
	try {
		const { form_id, title, fields } = req.body;
		const token = req.headers.authorization.split(" ")[1];
		const { userId } = jwt.verify(token, process.env.SECRET_KEY);
		const form = new models.Form({ form_id, title, fields, user: userId });
		await form.save();
		res.status(201).send(form);
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

router.get("/api/forms", async (req, res) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const { userId } = jwt.verify(token, process.env.SECRET_KEY);
		const forms = await models.Form.find({ user: userId });
		res.send(forms);
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

router.get("/api/forms/:form_id", async (req, res) => {
	try {
		const form = await models.Form.findOne({ form_id: req.params.form_id });
		if (!form) {
			return res.status(404).send({ error: "Form not found" });
		}
		res.send(form);
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

router.put("/api/forms/:form_id", async (req, res) => {
	try {
		const form = await models.Form.findOne({ form_id: req.params.form_id });
		if (!form) {
			return res.status(404).send({ error: "Form not found" });
		}
		form.title = req.body.title;
		form.fields = req.body.fields;
		form.attempts = req.body.attempts;
		await form.save();
		res.send(form);
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

router.delete("/api/forms/:form_id", async (req, res) => {
	try {
		const form = await models.Form.findOne({ form_id: req.params.form_id });
		if (!form) {
			return res.status(404).send({ error: "Form not found" });
		}
		await form.deleteOne();
		res.status(204).send();
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

module.exports = router;
