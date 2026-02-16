export function welcomeEmail({ name, role }) {
  const isOrg = role === "organisation";
  const roleLabel = isOrg ? "Organisation" : "Student";

  const nextSteps = isOrg
    ? `
      <ol style="margin: 0; padding-left: 18px;">
        <li style="margin: 6px 0;">Complete your organisation profile to activate internship posting.</li>
        <li style="margin: 6px 0;">Create and publish internship opportunities with clear role, duration, stipend, and eligibility details.</li>
        <li style="margin: 6px 0;">Review applications, shortlist candidates, and track status updates from your dashboard.</li>
      </ol>
    `
    : `
      <ol style="margin: 0; padding-left: 18px;">
        <li style="margin: 6px 0;">Complete your student profile to strengthen your internship applications.</li>
        <li style="margin: 6px 0;">Browse internships and apply to opportunities that match your skills and interests.</li>
        <li style="margin: 6px 0;">Track your application status and updates directly from your dashboard.</li>
      </ol>
    `;

  return {
    subject: `Welcome to IIC Portal — Registration Confirmed`,
    html: `
      <div style="margin:0;padding:0;background:#f6f8fb;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f8fb;padding:24px 0;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="width:640px;max-width:92%;background:#ffffff;border:1px solid #e6e8ee;border-radius:14px;overflow:hidden;">
                
                <!-- Header -->
                <tr>
                  <td style="background:#0b1220;padding:18px 22px;">
                    <div style="font-family:Arial,Helvetica,sans-serif;color:#ffffff;font-size:16px;font-weight:700;letter-spacing:0.2px;">
                      IIC Portal • E-Cell
                    </div>
                    <div style="font-family:Arial,Helvetica,sans-serif;color:rgba(255,255,255,0.75);font-size:12px;margin-top:4px;">
                      Registration & Onboarding Support
                    </div>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:22px;">
                    <div style="font-family:Arial,Helvetica,sans-serif;color:#0b1220;font-size:14px;line-height:1.6;">
                      <p style="margin:0 0 12px 0;">Dear ${name},</p>

                      <p style="margin:0 0 12px 0;">
                        Thank you for registering on the <b>IIC Portal</b>. Your registration has been successfully confirmed.
                      </p>

                      <p style="margin:0 0 14px 0;">
                        <b>Registered as:</b> ${roleLabel}
                      </p>

                      <div style="background:#f6f8fb;border:1px solid #e6e8ee;border-radius:12px;padding:14px 14px;margin:0 0 14px 0;">
                        <div style="font-weight:700;margin-bottom:8px;">Next steps</div>
                        ${nextSteps}
                      </div>

                      <p style="margin:0 0 14px 0;">
                        If you face any issues during login or onboarding, please reply to this email and our team will assist you.
                      </p>

                      <p style="margin:0;">
                        Warm regards,<br/>
                        <b>Team IIC (E-Cell)</b><br/>
                        <span style="color:#5a6475;">IIC Portal Support</span>
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:14px 22px;background:#ffffff;border-top:1px solid #e6e8ee;">
                    <div style="font-family:Arial,Helvetica,sans-serif;color:#5a6475;font-size:12px;line-height:1.5;">
                      This is an automated message confirming your registration on IIC Portal.<br/>
                      Please do not share your login credentials or authentication links with anyone.
                    </div>
                  </td>
                </tr>

              </table>

              <div style="font-family:Arial,Helvetica,sans-serif;color:#8a93a3;font-size:11px;line-height:1.4;margin-top:10px;max-width:640px;">
                © ${new Date().getFullYear()} IIC Portal • All rights reserved.
              </div>
            </td>
          </tr>
        </table>
      </div>
    `,
  };
}

export function adminNotifyNewUser({ name, email, role }) {
  const roleLabel = role === "organisation" ? "Organisation" : "Student";

  return {
    subject: `New Registration Received — ${roleLabel}: ${name}`,
    html: `
      <div style="margin:0;padding:0;background:#f6f8fb;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f8fb;padding:24px 0;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="width:640px;max-width:92%;background:#ffffff;border:1px solid #e6e8ee;border-radius:14px;overflow:hidden;">
                
                <tr>
                  <td style="background:#0b1220;padding:18px 22px;">
                    <div style="font-family:Arial,Helvetica,sans-serif;color:#ffffff;font-size:16px;font-weight:700;">
                      IIC Portal • Admin Notification
                    </div>
                    <div style="font-family:Arial,Helvetica,sans-serif;color:rgba(255,255,255,0.75);font-size:12px;margin-top:4px;">
                      New user registration alert
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:22px;">
                    <div style="font-family:Arial,Helvetica,sans-serif;color:#0b1220;font-size:14px;line-height:1.6;">
                      <p style="margin:0 0 12px 0;">
                        A new user has registered on <b>IIC Portal</b>. Details are as follows:
                      </p>

                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                        <tr>
                          <td style="padding:10px 12px;border:1px solid #e6e8ee;background:#f6f8fb;width:170px;"><b>Name</b></td>
                          <td style="padding:10px 12px;border:1px solid #e6e8ee;">${name}</td>
                        </tr>
                        <tr>
                          <td style="padding:10px 12px;border:1px solid #e6e8ee;background:#f6f8fb;"><b>Email</b></td>
                          <td style="padding:10px 12px;border:1px solid #e6e8ee;">${email}</td>
                        </tr>
                        <tr>
                          <td style="padding:10px 12px;border:1px solid #e6e8ee;background:#f6f8fb;"><b>Role</b></td>
                          <td style="padding:10px 12px;border:1px solid #e6e8ee;">${roleLabel}</td>
                        </tr>
                        <tr>
                          <td style="padding:10px 12px;border:1px solid #e6e8ee;background:#f6f8fb;"><b>Time (UTC)</b></td>
                          <td style="padding:10px 12px;border:1px solid #e6e8ee;">${new Date().toISOString()}</td>
                        </tr>
                      </table>

                      <p style="margin:14px 0 0 0;color:#5a6475;font-size:12px;">
                        This notification was generated automatically by the system.
                      </p>
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </div>
    `,
  };
}