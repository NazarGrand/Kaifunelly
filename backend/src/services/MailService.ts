import { constants } from "../env-constants";
import { sgMail } from "../config/SendGrid";

export async function deliverMail(
  email: string,
  name: string,
  verificationCode: string,
) {
  const msg = {
    to: email,
    from: constants.SENDGRID_EMAIL!,
    templateId: constants.SENDGRID_TEMPLATE_ID!,
    dynamic_template_data: {
      name: name,
      verificationLink: `${constants.CLIENT_URL}/account-activated?code=${verificationCode}`,
      logo: constants.LOGO_URL,
      emailPhoto: constants.EMAIL_PHOTO,
    },
  };

  await sgMail.send(msg);
}
