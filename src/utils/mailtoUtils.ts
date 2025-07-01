
export const generateMailtoUrl = (formData: {
  name: string;
  company: string;
  email: string;
  message: string;
}, recipientEmail: string = 'your-email@example.com') => {
  const subject = `Portfolio Contact Form - ${formData.name}`;
  
  const body = `Hi,

I'm reaching out through your portfolio contact form.

Name: ${formData.name}
Company: ${formData.company || 'Not specified'}
Email: ${formData.email}

Message:
${formData.message}

Best regards,
${formData.name}`;

  const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  return mailtoUrl;
};

export const openMailtoLink = (url: string): boolean => {
  try {
    window.location.href = url;
    return true;
  } catch (error) {
    console.error('Failed to open mailto link:', error);
    return false;
  }
};
