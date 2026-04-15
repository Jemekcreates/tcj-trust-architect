import { useState, useRef, useEffect } from "react";

const CALENDLY_LINK = "https://calendly.com/thecreativesjunction/30mins";

const SYSTEM_PROMPT = `You are an AI Trust Infrastructure Architect trained by The Creatives Junction.

Your role is to diagnose where buyer hesitation exists inside a business's sales journey and design a video-led trust infrastructure that helps buyers make decisions with confidence.

You do NOT create generic marketing advice. You analyze a business and recommend specific video assets and trust mechanisms that make credibility, expertise, and proof visible before buyers make decisions.

Core Philosophy:
- Problem: Buyer hesitation
- Approach: Using strategic video to make trust visible
- Outcome: Faster decisions and stronger revenue

Buyer hesitation happens when a buyer cannot clearly see: who the business is, how they think, whether they are credible, whether their solution works, whether it is safe to choose them.

Your Diagnostic Framework — you analyze across five areas:
1. Decision Momentum — Where do deals slow down?
2. Trust Without Conversation — Can a buyer feel confident before speaking to the business?
3. Proof Visibility — Is proof shown or explained?
4. Authority Visibility — Can buyers see expertise or only hear about it?
5. Decision Friction — What makes the buyer hesitate?

IMPORTANT CONVERSATION INSTRUCTIONS:
- You are having a ONE-AT-A-TIME conversational diagnostic. Ask ONE question at a time.
- Start by warmly welcoming the user by name (you already have their name and email from registration).
- Then ask your diagnostic questions ONE BY ONE. After each answer, acknowledge it briefly and ask the next question.
- Diagnostic questions to work through (adapt naturally, skip if already answered):
  1. What service or product do you provide?
  2. Who is your ideal customer?
  3. What is the average deal value?
  4. Where do deals most often stall or slow down?
  5. How long does a typical sales decision take?
  6. What objections come up most often from buyers?
  7. What proof do buyers currently see before speaking to you?
  8. Do you currently use video? If so, where?
- After gathering enough information (typically 6-8 questions), say you have enough to build their diagnosis and that you'll now generate their full Trust Infrastructure Plan.
- Then produce the full diagnosis in this EXACT structured format using markdown:

---
## Business Diagnosis

**Business Overview:** [brief summary]

**Buyer Hesitation Points:**
- [point 1]
- [point 2]
- [point 3]

**Trust Gaps Identified:**
- [gap 1]
- [gap 2]
- [gap 3]

---
## Recommended Trust Infrastructure

**Video 1: [Video Type Name]**
- **Purpose:** [what it does]
- **Buyer hesitation solved:** [specific hesitation]
- **Where to place:** [placement]

**Video 2: [Video Type Name]**
- **Purpose:** [what it does]
- **Buyer hesitation solved:** [specific hesitation]
- **Where to place:** [placement]

**Video 3: [Video Type Name]**
- **Purpose:** [what it does]
- **Buyer hesitation solved:** [specific hesitation]
- **Where to place:** [placement]

[Add Video 4 and 5 if needed]

---
## Implementation Guidance

[2-3 paragraphs on strategy and messaging for each video — no filming technical advice]

---
## Summary

"This business does not have a demand problem. It has a decision confidence problem.

The following video trust infrastructure would make the necessary reassurance visible before buyers decide."

---
**NEXT STEP:** Book your Trust Audit Call with The Creatives Junction to begin implementing this infrastructure. [SHOW_CALENDLY_BUTTON]

---

Available video types to recommend from:
Authority Videos: Founder story video, Expertise explanation video, "How we think" video, Point-of-view thought leadership video
Proof Videos: Client testimonial video, Case story video, Before/after transformation video, Results walkthrough
Trust Videos: Process explanation video, Behind-the-scenes operations video, "What happens when you work with us" video
Decision Support Videos: Proposal companion video, FAQ objection handling video, Buyer reassurance video

Tone: Clear, structured, insightful, diagnostic. Like a commercial strategist, not a marketer. No hype. Focus on buyer psychology, decision confidence, visible trust.`;

function renderMarkdown(text) {
  if (!text) return "";
  let html = text
    .replace(/^---$/gm, '<hr class="divider"/>')
    .replace(/^## (.+)$/gm, '<h2 class="md-h2">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="md-h3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>(\n|$))+/g, (m) => `<ul class="md-ul">${m}</ul>`)
    .replace(/\[SHOW_CALENDLY_BUTTON\]/g, `<a href="${CALENDLY_LINK}" target="_blank" class="calendly-btn">📅 Book Your Trust Audit Call</a>`)
    .replace(/\n\n/g, '</p><p class="md-p">')
    .replace(/\n/g, '<br/>');
  return `<p class="md-p">${html}</p>`;
}

function GateForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email to continue.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    onSubmit({ name: name.trim(), email: email.trim(), company: company.trim() });
  };

  return (
    <div className="gate-container">
      <div className="gate-card">
        <div className="gate-logo">
          <span className="logo-text">TCJ</span>
        </div>
        <div className="gate-eyebrow">AI-Powered Diagnostic</div>
        <h1 className="gate-title">Trust Infrastructure<br/>Architect</h1>
        <p className="gate-sub">
          Discover exactly why buyers hesitate — and get a custom video trust plan to fix it. Free. In minutes.
        </p>
        <div className="gate-form">
          <div className="field-group">
            <label className="field-label">Your Name</label>
            <input className="field-input" type="text" placeholder="Jane Smith" value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
          </div>
          <div className="field-group">
            <label className="field-label">Work Email</label>
            <input className="field-input" type="email" placeholder="jane@company.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
          </div>
          <div className="field-group">
            <label className="field-label">Company Name <span className="optional">(optional)</span></label>
            <input className="field-input" type="text" placeholder="Acme Ltd" value={company} onChange={e => setCompany(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
          </div>
          {error && <div className="field-error">{error}</div>}
          <button className="gate-btn" onClick={handleSubmit}>Begin My Diagnosis →</button>
        </div>
        <p className="gate-privacy">No spam. No sales calls unless you book one.</p>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="msg msg-ai">
      <div className="msg-avatar">AI</div>
      <div className="msg-bubble typing-bubble">
        <span className="dot"/><span className="dot"/><span className="dot"/>
      </div>
    </div>
  );
}

function Message({ msg }) {
  const isAI = msg.role === "ai";
  return (
    <div className={`msg ${isAI ? "msg-ai" : "msg-user"}`}>
      {isAI && <div className="msg-avatar">AI</div>}
      <div className={`msg-bubble ${isAI ? "bubble-ai" : "bubble-user"}`} dangerouslySetInnerHTML={{ __html: isAI ? renderMarkdown(msg.content) : msg.content }} />
      {!isAI && <div className="msg-avatar user-avatar">You</div>}
    </div>
  );
}

function ChatInterface({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasPlan, setHasPlan] = useState(false);
  const [history, setHistory] = useState([]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { startConversation(); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const startConversation = async () => {
    setLoading(true);
    const userContext = `The user's name is ${user.name}, email is ${user.email}${user.company ? `, and they work at ${user.company}` : ""}. Greet them warmly by first name and ask your first diagnostic question.`;
    const initialHistory = [{ role: "user", content: userContext }];
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYSTEM_PROMPT, messages: initialHistory }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "Hello! Let's get started.";
      setHistory([...initialHistory, { role: "assistant", content: text }]);
      setMessages([{ role: "ai", content: text }]);
    } catch (e) {
      setMessages([{ role: "ai", content: "Something went wrong starting the session. Please refresh and try again." }]);
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const newUserMsg = { role: "user", content: text };
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setLoading(true);
    const newHistory = [...history, newUserMsg];
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2000, system: SYSTEM_PROMPT, messages: newHistory }),
      });
      const data = await res.json();
      const aiText = data.content?.map(b => b.text || "").join("") || "I couldn't process that. Please try again.";
      setHistory([...newHistory, { role: "assistant", content: aiText }]);
      setMessages([...newMessages, { role: "ai", content: aiText }]);
      if (aiText.includes("SHOW_CALENDLY_BUTTON") || aiText.includes("Trust Audit Call")) setHasPlan(true);
    } catch (e) {
      setMessages([...newMessages, { role: "ai", content: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
    inputRef.current?.focus();
  };

  const downloadPDF = () => {
    const planMessages = messages.filter(m => m.role === "ai" && (m.content.includes("Business Diagnosis") || m.content.includes("Recommended Trust Infrastructure")));
    if (planMessages.length === 0) { alert("Your Trust Infrastructure Plan will appear here once the diagnosis is complete."); return; }
    const content = planMessages.map(m => m.content).join("\n\n");
    const cleanText = content.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\[SHOW_CALENDLY_BUTTON\]/g, `Book your call: ${CALENDLY_LINK}`);
    const blob = new Blob([`VIDEO TRUST INFRASTRUCTURE PLAN\nPrepared for: ${user.name}${user.company ? " — " + user.company : ""}\nPowered by The Creatives Junction\n\n${cleanText}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `Trust-Infrastructure-Plan-${user.name.replace(/\s+/g, "-")}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-header-left">
          <div className="gate-logo small-logo"><span className="logo-text">TCJ</span></div>
          <div>
            <div className="chat-title">Trust Infrastructure Architect</div>
            <div className="chat-subtitle">Powered by The Creatives Junction</div>
          </div>
        </div>
        <div className="chat-header-right">
          {hasPlan && <button className="download-btn" onClick={downloadPDF}>↓ Download Plan</button>}
          <div className="user-chip">{user.name}</div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((msg, i) => <Message key={i} msg={msg} />)}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-bar">
        <input ref={inputRef} className="chat-input" type="text" placeholder="Type your answer..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} disabled={loading} />
        <button className="send-btn" onClick={sendMessage} disabled={loading || !input.trim()}>{loading ? "..." : "Send"}</button>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --ink: #0d0d0d; --cream: #f7f4ef; --gold: #c9a84c; --gold-light: #e8d5a3; --charcoal: #1e1e1e; --mid: #5a5a5a; --border: #e0dbd0; }
        body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--ink); min-height: 100vh; }
        .gate-container { min-height: 100vh; background: var(--ink); display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative; overflow: hidden; }
        .gate-container::before { content: ''; position: absolute; top: -40%; right: -20%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%); pointer-events: none; }
        .gate-container::after { content: ''; position: absolute; bottom: -30%; left: -15%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%); pointer-events: none; }
        .gate-card { background: #161616; border: 1px solid #2a2a2a; border-radius: 4px; padding: 3rem 3.5rem; width: 100%; max-width: 500px; position: relative; z-index: 1; animation: fadeUp 0.6s ease both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .gate-logo { width: 48px; height: 48px; border: 1.5px solid var(--gold); border-radius: 3px; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem; }
        .gate-logo.small-logo { width: 36px; height: 36px; margin: 0; }
        .logo-text { font-family: 'Cormorant Garamond', serif; font-size: 14px; font-weight: 700; color: var(--gold); letter-spacing: 0.05em; }
        .small-logo .logo-text { font-size: 11px; }
        .gate-eyebrow { font-size: 11px; font-weight: 500; color: var(--gold); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.75rem; }
        .gate-title { font-family: 'Cormorant Garamond', serif; font-size: 2.6rem; font-weight: 600; color: #f0ece4; line-height: 1.1; margin-bottom: 1.25rem; }
        .gate-sub { font-size: 0.95rem; color: #888; line-height: 1.6; margin-bottom: 2.5rem; font-weight: 300; }
        .gate-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .field-group { display: flex; flex-direction: column; gap: 0.4rem; }
        .field-label { font-size: 0.78rem; font-weight: 500; color: #aaa; letter-spacing: 0.05em; text-transform: uppercase; }
        .optional { color: #555; font-weight: 400; }
        .field-input { background: #1e1e1e; border: 1px solid #2e2e2e; border-radius: 3px; padding: 0.85rem 1rem; color: #f0ece4; font-family: 'DM Sans', sans-serif; font-size: 0.95rem; transition: border-color 0.2s; outline: none; }
        .field-input:focus { border-color: var(--gold); }
        .field-input::placeholder { color: #444; }
        .field-error { font-size: 0.85rem; color: #e07070; }
        .gate-btn { background: var(--gold); color: var(--ink); border: none; padding: 1rem 1.5rem; border-radius: 3px; font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: opacity 0.2s, transform 0.15s; margin-top: 0.5rem; letter-spacing: 0.02em; }
        .gate-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .gate-privacy { font-size: 0.78rem; color: #444; text-align: center; margin-top: 1.25rem; }
        .chat-container { display: flex; flex-direction: column; height: 100vh; background: var(--cream); }
        .chat-header { background: var(--ink); padding: 1rem 1.5rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #2a2a2a; flex-shrink: 0; }
        .chat-header-left { display: flex; align-items: center; gap: 1rem; }
        .chat-header-right { display: flex; align-items: center; gap: 0.75rem; }
        .chat-title { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 600; color: #f0ece4; line-height: 1.2; }
        .chat-subtitle { font-size: 0.72rem; color: var(--gold); letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; }
        .user-chip { background: #1e1e1e; color: #999; border: 1px solid #2e2e2e; padding: 0.35rem 0.85rem; border-radius: 2rem; font-size: 0.78rem; font-weight: 500; }
        .download-btn { background: transparent; border: 1px solid var(--gold); color: var(--gold); padding: 0.35rem 0.9rem; border-radius: 2rem; font-size: 0.78rem; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.2s, color 0.2s; }
        .download-btn:hover { background: var(--gold); color: var(--ink); }
        .chat-messages { flex: 1; overflow-y: auto; padding: 2rem 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .msg { display: flex; align-items: flex-start; gap: 0.75rem; animation: msgIn 0.35s ease both; }
        @keyframes msgIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .msg-user { flex-direction: row-reverse; }
        .msg-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--ink); border: 1.5px solid var(--gold); display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700; color: var(--gold); flex-shrink: 0; letter-spacing: 0.05em; font-family: 'Cormorant Garamond', serif; }
        .user-avatar { background: var(--gold); border-color: var(--gold); color: var(--ink); }
        .msg-bubble { max-width: 72%; padding: 1rem 1.25rem; border-radius: 3px; font-size: 0.93rem; line-height: 1.65; }
        .bubble-ai { background: white; border: 1px solid var(--border); color: var(--ink); }
        .bubble-user { background: var(--ink); color: #f0ece4; }
        .typing-bubble { display: flex; align-items: center; gap: 5px; padding: 1rem 1.25rem; }
        .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--gold); animation: bounce 1.2s infinite; display: inline-block; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }
        .md-h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-weight: 700; color: var(--ink); margin: 1.25rem 0 0.5rem; border-bottom: 1px solid var(--border); padding-bottom: 0.4rem; }
        .md-h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-weight: 600; margin: 1rem 0 0.35rem; }
        .md-ul { padding-left: 1.25rem; margin: 0.35rem 0; }
        .md-ul li { margin: 0.2rem 0; }
        .md-p { margin: 0.35rem 0; }
        .divider { border: none; border-top: 1px solid var(--border); margin: 1rem 0; }
        .calendly-btn { display: inline-block; background: var(--gold); color: var(--ink) !important; padding: 0.75rem 1.5rem; border-radius: 3px; text-decoration: none; font-weight: 700; font-size: 0.95rem; margin-top: 0.75rem; transition: opacity 0.2s; letter-spacing: 0.01em; }
        .calendly-btn:hover { opacity: 0.85; }
        .chat-input-bar { background: white; border-top: 1px solid var(--border); padding: 1rem 1.5rem; display: flex; gap: 0.75rem; flex-shrink: 0; }
        .chat-input { flex: 1; border: 1px solid var(--border); border-radius: 3px; padding: 0.85rem 1rem; font-family: 'DM Sans', sans-serif; font-size: 0.93rem; outline: none; color: var(--ink); transition: border-color 0.2s; background: var(--cream); }
        .chat-input:focus { border-color: var(--ink); }
        .chat-input::placeholder { color: #aaa; }
        .send-btn { background: var(--ink); color: #f0ece4; border: none; padding: 0.85rem 1.5rem; border-radius: 3px; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: opacity 0.2s; white-space: nowrap; letter-spacing: 0.03em; }
        .send-btn:hover:not(:disabled) { opacity: 0.8; }
        .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        @media (max-width: 600px) { .gate-card { padding: 2rem 1.5rem; } .gate-title { font-size: 2rem; } .msg-bubble { max-width: 88%; font-size: 0.88rem; } }
      `}</style>
      {!user ? <GateForm onSubmit={setUser} /> : <ChatInterface user={user} />}
    </>
  );
}
