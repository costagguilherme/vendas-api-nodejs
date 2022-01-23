import nodemailer from 'nodemailer'
import {HandlebarsMailTemplate} from './HandlebarsMailTemplate'

interface IMailContact {
	name: string,
	email: string
}

interface ITemplateVariable {
	[key: string]: string | number
}

interface IParseMailTemplate {
	file: string;
	variables: ITemplateVariable
}

interface ISendMail {
	to: IMailContact,
	templateData: IParseMailTemplate,
	from: IMailContact,
	subject: string
}


class EtherealMail {

	static async sendMail ({to, from, subject, templateData}: ISendMail) {

		const account = await nodemailer.createTestAccount()
		const mailTemplate = new HandlebarsMailTemplate()
		const transporter = nodemailer.createTransport({
			host: account.smtp.host,
			port: account.smtp.port,
			secure: account.smtp.secure,
			auth: {
				user: account.user,
				pass: account.pass
			}
		})

		const message = await transporter.sendMail({
			from: {name: from?.name || 'Equipe API Vendas', address: from?.email || 'equipe@apivendas.com'} ,
			to: {name: to.name, address: to.email} ,
			subject: subject,
			html: await mailTemplate.parse(templateData)
		})

		console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
	}
}


export {EtherealMail}