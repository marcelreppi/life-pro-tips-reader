const Alexa = require("alexa-sdk");
const { getLifeProTip } = require("./lib.js")

const handlers = {
	"LaunchRequest": function () {
		this.emit("GetLifeProTipIntent");
	},
	"GetLifeProTipIntent": async function () {
		let title = await getLifeProTip()
		title = title.replace(/"[a-zA-Z .,]*"/g, (match) => {
			const pauseDuration = "0.3s"
			return `<break time="${pauseDuration}"/> "${match.substring(1, match.length-1)}" <break time="${pauseDuration}"/>`
		})
		this.emit(":tell", title);
	},
	"AMAZON.HelpIntent": function () {
		this.emit(":ask", "Just say open life pro tips");
	},
	"AMAZON.CancelIntent": function () {
		this.emit(":tell", "Bye!");
	},
	"AMAZON.StopIntent": function () {
		this.emit(":tell", "Bye!");
	},
};

exports.handler = function (event, context) {
	const alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);
	alexa.execute();
};