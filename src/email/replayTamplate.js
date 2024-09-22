

export function replayTamplate(message){
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sara7a App - New Notifaction </title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
      color: #333;
    }
    .email-container {
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      max-width: 600px;
      margin: 0 auto;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #007bff;
      font-size: 24px;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
    }
    a.reset-link {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
      margin-top: 20px;
    }
    a.reset-link:hover {
      background-color: #0056b3;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>

  <div class="email-container">
    <h1>New Notifaction</h1>
    <p>Hello,</p>
    <p> ${message}  </p> 

    <a <a href="${process.env.FRONT_URL}/message" class="reset-link"> Open sara7a App </a>

    
    <div class="footer">
      <p>Thank you for using our service!</p>
    </div>
  </div>

</body>
</html>
`
}