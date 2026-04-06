import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  if (!currentUser) return null;

  return (
    <div className="auth-wrapper">
      <div style={{ background: "var(--clr-white)", border: "1px solid var(--clr-border)", borderRadius: "var(--rounded-lg)", padding: "2.5rem", maxWidth: 440, width: "100%", textAlign: "center", boxShadow: "var(--shadow-hover)" }}>
        <div className="avatar-circle">{currentUser.name.charAt(0).toUpperCase()}</div>
        <h3 style={{ fontFamily: "var(--font-heading)", marginBottom: "0.2rem" }}>{currentUser.name}</h3>
        <span className={`role-tag ${currentUser.role}`} style={{ fontSize: "0.82rem", padding: "0.3rem 0.85rem" }}>{currentUser.role}</span>
        <hr style={{ margin: "1.5rem 0", borderColor: "var(--clr-border)" }} />
        <div style={{ textAlign: "left" }}>
          {[
            { label: "Email", value: currentUser.email },
            { label: "Role", value: currentUser.role, capitalize: true },
            { label: "User ID", value: currentUser._id, mono: true },
          ].map((row, i) => (
            <div key={i} style={{ padding: "0.6rem 0", borderBottom: i < 2 ? "1px solid #f1f5f9" : "none" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--clr-light)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px" }}>{row.label}</div>
              <div style={{ fontSize: row.mono ? "0.78rem" : "0.92rem", color: row.mono ? "var(--clr-light)" : "var(--clr-dark)", fontFamily: row.mono ? "monospace" : "inherit", textTransform: row.capitalize ? "capitalize" : "none" }}>
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
