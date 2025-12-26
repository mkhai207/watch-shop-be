// const nodemailer = require('nodemailer');
// const config = require('../config/config');
// const logger = require('../config/logger');

// const transport = nodemailer.createTransport(config.email.smtp);

// if (config.env !== 'test') {
// 	transport
// 		.verify()
// 		.then(() => logger.info('Connected to email server'))
// 		.catch(() =>
// 			logger.warn(
// 				'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
// 			)
// 		);
// }

// /**
//  * Send an email
//  * @param {string} to
//  * @param {string} subject
//  * @param {string} text
//  * @returns {Promise}
//  */
// const sendEmail = async (to, subject, text) => {
// 	const msg = { from: config.email.from, to, subject, text };
// 	await transport.sendMail(msg);
// };

const { Resend } = require('resend');
const config = require('../config/config');
const logger = require('../config/logger');

const resend = new Resend(config.email.resend.apiKey);

const sendEmail = async (to, subject, text) => {
	try {
		logger.info('Send email', to, subject, text);
		const response = await resend.emails.send({
			from: config.email.from,
			to,
			subject,
			text,
		});
		logger.info('Resend Response:', response);
	} catch (err) {
		logger.error('Send email failed', err);
	}
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
	const subject = 'Reset password';
	// replace this url with the link to the reset password page of your front-end app
	let baseUrl = config.feServerUrl;
	if (!baseUrl) {
		baseUrl = 'http://localhost:3000';
	}
	const resetPasswordUrl = `${baseUrl}/reset-password?token=${token.token}`;
	const text = `Chào bạn,
    Để thay đổi mật khẩu, hãy click vào link sau:
	${resetPasswordUrl}
    Nếu bạn không yêu cầu thay đổi mật khẩu, hãy bỏ qua email này. Yêu cầu của bạn sẽ hết hạn trong ${config.resetPasswordExpirationMinutes} phút.`;
	await sendEmail(to, subject, text);
};

// module.exports = {
// 	transport,
// 	sendEmail,
// 	sendResetPasswordEmail,
// };

module.exports = {
	sendEmail,
	sendResetPasswordEmail,
};
