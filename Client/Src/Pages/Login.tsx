import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "../Ui/Nav.tsx";
import { Card } from "../Ui/Card.tsx";
import { Input } from "../Ui/Input.tsx";
import { Button } from "../Ui/Button.tsx";
import { Color, Font, Space, Type } from "../Ui/Token.ts";

export function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", display: "", invite: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      navigate("/");
    } else {
      const { error } = await res.json();
      setError(error);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: Color.bg }}>
      <Nav user={null} />
      <main style={{ maxWidth: 400, margin: "80px auto", padding: `0 ${Space[4]}` }}>
        <Card size="lg">
          <h1 style={{ fontFamily: Font.display, fontSize: Type.xl.fontSize, fontWeight: 700, color: Color.text, marginBottom: Space[2] }}>
            Join Foxtrot
          </h1>
          <p style={{ fontFamily: Font.sans, fontSize: Type.sm.fontSize, color: Color.muted, marginBottom: Space[6] }}>
            You need an invite code to join.
          </p>
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: Space[3] }}>
            <Input value={form.display}  onChange={(v) => setForm({ ...form, display: v })}  placeholder="Display name" />
            <Input value={form.username} onChange={(v) => setForm({ ...form, username: v })} placeholder="Username" />
            <Input value={form.invite}   onChange={(v) => setForm({ ...form, invite: v })}   placeholder="Invite code" />
            {error && (
              <p style={{ fontFamily: Font.mono, fontSize: Type.xs.fontSize, color: Color.danger }}>{error}</p>
            )}
            <Button type="submit" disabled={loading} style={{ width: "100%", justifyContent: "center", marginTop: Space[2] }}>
              {loading ? "joining…" : "join"}
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
}
