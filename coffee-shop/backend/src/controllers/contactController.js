// In-memory session store for contact submissions
const sessionSubmissions = [];

export const handleContactSubmission = (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation checks
    const errors = {};
    if (!name || name.trim().length < 2) {
      errors.name = "Full name must be at least 2 characters long";
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please provide a valid email address";
    }
    if (!phone || phone.trim().length < 7) {
      errors.phone = "Please provide a valid contact phone number";
    }
    if (!subject || subject.trim().length < 3) {
      errors.subject = "Subject must be at least 3 characters long";
    }
    if (!message || message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed for submitted contact form",
        errors
      });
    }

    const submissionRecord = {
      id: `DEMO-SUB-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
      receivedAt: new Date().toISOString(),
      sessionOnly: true
    };

    sessionSubmissions.push(submissionRecord);
    console.log(`[Contact Form Received] ID: ${submissionRecord.id} from ${submissionRecord.name} (${submissionRecord.email})`);

    return res.status(201).json({
      success: true,
      message: "Your message has been received successfully for this active demonstration session! Our barista team will attend to your inquiry.",
      note: "Demonstration Notice: Submissions are held in server memory for the current running session only. No permanent database or live SMTP mailer is connected.",
      data: submissionRecord
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error processing contact submission",
      error: error.message
    });
  }
};

export const getSessionSubmissions = (req, res) => {
  return res.status(200).json({
    success: true,
    total: sessionSubmissions.length,
    submissions: sessionSubmissions
  });
};

