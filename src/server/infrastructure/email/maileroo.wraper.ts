import { MailerooClient, EmailAddress } from "maileroo-sdk";
import emailConfig from "./email.config.json";

if (!process.env.NODE_MAILEROO_API_KEY) {
  throw new Error("Missing Maileroo API key");
}

const client = new MailerooClient(process.env.NODE_MAILEROO_API_KEY);

export enum EmailTemplate {
  INVITE_EMAIL = "INVITE_EMAIL",
  INVITE_REGISTRATION_EMAIL = "INVITE_REGISTRATION_EMAIL",
  CONFIRM_EMAIL = "CONFIRM_EMAIL",
  FORGOT_PASSWORD_EMAIL = "FORGOT_PASSWORD_EMAIL",
  ACCOUNT_LOCKED_EMAIL = "ACCOUNT_LOCKED_EMAIL",
  WELCOME_EMAIL = "WELCOME_EMAIL",
}

type TemplateKey = keyof typeof emailConfig;
const getTemplateConfig = (name: TemplateKey) => {
  const config = emailConfig[name];
  if (!config) throw new Error(`Missing config for template: ${name}`);
  return config;
};

const validateEmailfields = (
  data: Record<string, unknown>,
  requiredFields: string[]
) => {
  const missing = requiredFields.filter((field) => !(field in data));
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(", ")}`);
  }
};

export const sendEmail = async (
  emailTemplate: TemplateKey,
  to: string,
  data: Record<string, unknown>
) => {
  try {
    const template = getTemplateConfig(emailTemplate);
    validateEmailfields(data, template.requiredFields);
    const response = await client.sendTemplatedEmail({
      from: new EmailAddress(template.fromEmail, template.fromDisplayName),
      to: [new EmailAddress(to)],
      template_id: template.id,
      template_data: data,
      subject: template.subject,
    });
    console.log("Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error(`Error sending ${emailTemplate} to ${to}:`, error);
    throw error;
  }
};
