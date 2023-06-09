const AWS = require('aws-sdk');

exports.handler = async (event, context) => {

  try {
    // Get the body from the POST request
    //const requestBody = event.body;
    const requestBody = decodeURIComponent(event.body).replaceAll('&', '\n').replaceAll('=', ': ');

    // Construct the email parameters
    const emailParams = {
      Source: 'no-reply@monkey-clumps.com', // Sender email address
      Destination: {
        ToAddresses: ['regulus.support@teradata.com'], // Array of recipient email addresses
      },
      Message: {
        Subject: {
          Data: 'Regulus developers preview waitlist request', // Subject of the email
        },
        Body: {
          Text: {
            Data: requestBody, // Body content of the email
          },
        },
      },
    };

    // Create a new SES instance
    const ses = new AWS.SES();

    // Send the email using SES
    const result = await ses.sendEmail(emailParams).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};

