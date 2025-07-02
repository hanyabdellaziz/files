# Mawwany Website - Email Functionality Implementation

This document outlines the implementation of email functionality across the Mawwany website, including configuration, testing guidelines, and troubleshooting information.

## Email Configuration

The website uses NodeMailer to send emails through a configured SMTP server. The following environment variables are required:

- `EMAIL_HOST`: SMTP server host
- `EMAIL_PORT`: SMTP server port (typically 465 for SSL, 587 for TLS)
- `EMAIL_SECURE`: Whether to use SSL/TLS (true/false)
- `EMAIL_USER`: SMTP authentication username
- `EMAIL_PASSWORD`: SMTP authentication password
- `EMAIL_FROM`: Default sender email address

## Email Routing

The website routes emails based on the form being submitted:

1. **Contact Us Form**: Emails are sent to `info@mawwany.com`
2. **Career Applications**: Emails are sent to `HR@mawwany.com`
3. **Quote Requests**: Emails are sent to `operation@mawwany.com`

## Implementation Details

### Core Email Functionality

- The email sending logic is centralized in `/lib/email.ts`
- All form submissions are processed via API routes that implement consistent validation, error handling, and email formatting
- Form files (like resumes) are processed separately before being attached to emails

### Security Considerations

- User inputs are validated and sanitized before processing
- SMTP credentials are stored securely as environment variables
- File uploads are validated for size and type before processing

## Testing Email Functionality

To test email functionality:

1. **Setup Testing Environment**: Configure appropriate SMTP settings
2. **Test Each Form**:
   - Complete the Contact Us form with valid data and submit
   - Apply for a job position through the Career section
   - Request a quote from the homepage
3. **Confirm Receipt**: Verify that emails are received at the correct addresses
4. **Error Testing**: Test form validation by submitting with missing fields
5. **Edge Cases**: Test with very large messages and file attachments

## Error Handling

- Invalid form submissions return appropriate error messages
- Server-side errors are logged and display user-friendly messages
- Network errors during form submission are handled gracefully
- File upload failures show specific error messages

## Troubleshooting

If emails are not being sent:

1. **Check Environment Variables**: Ensure all required email configuration variables are set
2. **Verify SMTP Settings**: Confirm the SMTP server details are correct
3. **Check Network Connectivity**: Ensure the server can connect to the SMTP host
4. **Review Server Logs**: Look for error messages in the server logs
5. **Test SMTP Configuration**: Use a tool like nodemailer-smtp-pool to test SMTP settings

## Maintenance

- Regularly monitor email deliverability rates
- Update SMTP credentials if necessary
- Adjust email templates as needed
