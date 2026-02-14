export function welcomeEmail({ name, role }) {
  const roleLabel = role === "organisation" ? "Organisation" : "Student";

  return {
    subject: `Welcome to IIC Portal, ${name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6">
        <h2>Welcome, ${name}!</h2>
        <p>You’ve successfully registered on the <b>IIC Portal</b> as a <b>${roleLabel}</b>.</p>
        <p>
          Next steps:
          <ul>
            ${
              role === "organisation"
                ? `<li>Complete your organisation profile</li><li>Post internships and manage applications</li>`
                : `<li>Complete your student profile</li><li>Browse internships and apply</li>`
            }
          </ul>
        </p>
        <p>Regards,<br/>IIC Team</p>
      </div>
    `
  };
}

export function adminNotifyNewUser({ name, email, role }) {
  return {
    subject: `New ${role} registration: ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6">
        <h3>New Registration</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Role:</b> ${role}</p>
        <p>Time: ${new Date().toISOString()}</p>
      </div>
    `
  };
}