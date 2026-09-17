import React, {useState} from 'react'
import {createRoot} from 'react-dom/client'
import './styles.css'

const webhook = import.meta.env.VITE_MAKE_WEBHOOK_URL || ''

function Logo(){return <a className="brand" href="#top" aria-label="Allevor home"><img src="/logo.png" alt=""/><span>ALLEVOR</span></a>}
function Header(){return <header className="site-header"><div className="nav wrap"><Logo/><nav><a href="#services">Services</a><a href="#how-it-works">How It Works</a><a href="#work">Work</a><a href="#about">About</a></nav><a className="btn btn-blue" href="#contact">Get Started</a></div></header>}
function FlowCard(){return <div className="flow-card" aria-label="Automation workflow example"><div className="flow-kicker">A useful system, in motion</div><div className="flow-step"><b>Customer →</b> Input <i/></div><div className="flow-line"/><div className="flow-step active"><b>Automation →</b> Decides <i/></div><div className="flow-line"/><div className="flow-step"><b>Action →</b> Personal follow-up <span className="check">✓</span></div></div>}
function Hero(){return <section className="hero" id="top"><div className="wrap hero-grid"><div><p className="eyebrow">PRACTICAL WORKFLOW AUTOMATION</p><h1>Simple systems. Less busywork.</h1><p className="hero-copy">We build lightweight automations that take repetitive work off your team’s plate.</p><div className="actions"><a className="btn btn-blue" href="#services">See Our Services</a><a className="btn btn-outline" href="#how-it-works">How It Works</a></div></div><FlowCard/></div><div className="hero-banner">Built for small businesses. Designed around the way you actually work.</div></section>}
const services=[['Customer Feedback','Automatically collect, process and respond to customer feedback.'],['Email Follow-Ups','Trigger timely, personalized follow-up messages without manual work.'],['Lead Responses','Handle repetitive first-response workflows for incoming leads.'],['Internal Workflows','Connect forms, notifications, documents and other repetitive internal tasks.'],['Custom Automation','Build a workflow around a specific repetitive process in your business.']]
function Services(){return <section id="services"><div className="wrap"><p className="eyebrow">SERVICES</p><h2>Automation that earns its keep.</h2><p className="section-lead">Small, useful automations for the everyday work that shouldn’t need someone watching it.</p><div className="service-grid">{services.map(([t,d])=><article key={t} className="service-card"><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>}
const product=['Survey sent','Feedback submitted','Response processed','Action determined','Personalized follow-up','Business notified']
function Featured(){return <section className="soft-section featured-section"><div className="wrap"><div className="eyebrow">FEATURED PRODUCT</div><div className="feature-grid"><div><h2>Customer Feedback Automation</h2><p className="section-lead">A simple response system that keeps customers heard and the right people informed.</p><a className="text-link" href="#work">Explore the workflow →</a></div><div className="product-flow">{product.map((x,i)=><div className="product-step" key={x}><span>{String(i+1).padStart(2,'0')}</span><b>{x}</b></div>)}</div></div></div></section>}
function HowItWorks(){const steps=[['Understand','We identify the repetitive process that is consuming time.'],['Design','We map the workflow and determine what should happen automatically.'],['Build','We build and test the automation around the existing business process.'],['Run','The system handles the repetitive work while the business stays in control.']];return <section id="how-it-works"><div className="wrap"><p className="eyebrow">HOW IT WORKS</p><h2>From repetitive task to automated system.</h2><div className="process-grid">{steps.map(([t,d],i)=><article key={t}><span className="num">{String(i+1).padStart(2,'0')}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>}
function Work(){return <section id="work" className="soft-section"><div className="wrap"><p className="eyebrow">WORK</p><h2>One system, clearly explained.</h2><div className="demo"><div className="demo-head"><span>DEMO — CUSTOMER FEEDBACK AUTOMATION</span><span className="dot"/></div><div className="demo-grid"><div><b>Problem</b><p>Feedback arrives, but follow-up is inconsistent and insights are easy to miss.</p></div><div><b>Workflow</b><p>Survey → response → routing → personalized email → relevant notification.</p></div><div><b>Automated result</b><p>The right response happens without another repetitive handoff.</p></div></div><div className="routing"><b>Response routing</b><div><span>New response</span><em>→</em><span>Review needed</span><em>→</em><span>Notify owner</span></div></div></div></div></section>}
function Why(){return <section><div className="wrap"><p className="eyebrow">WHY US</p><h2>Small by design.</h2><p className="section-lead max-copy">We don’t believe every business needs a giant software implementation. We focus on small, practical systems that solve a specific problem, integrate into the way you already work, and can improve over time.</p><div className="why-grid"><div><b>Practical</b><p>Solve the actual problem, not the buzzword.</p></div><div><b>Lightweight</b><p>Build only what is necessary.</p></div><div><b>Built to evolve</b><p>Start small and expand when the workflow proves its value.</p></div></div></div></section>}
function About(){return <section id="about" className="about"><div className="wrap"><p className="eyebrow">ABOUT</p><h2>An independent automation studio focused on making everyday business processes simpler.</h2><p className="section-lead max-copy">We work with businesses internationally, designing practical systems around real processes—not generic playbooks.</p><div className="about-cta"><div><h3>What could your business stop doing manually?</h3><p>Tell us about the repetitive process. We’ll help you determine whether it can be automated.</p></div><a className="btn btn-blue" href="#contact">Get Started</a></div></div></section>}
function Contact() {
  const [status, setStatus] = useState("");

  async function submit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const f = new FormData(form);

    // Honeypot anti-spam field
    if (f.get("website")) return;

    if (!webhook) {
      setStatus(
        "Please configure the Make.com webhook before publishing this form."
      );
      return;
    }

    setStatus("Sending…");

    const payload = Object.fromEntries(f.entries());

    try {
  await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  setStatus(
    "Thanks — your message has been sent. We’ll be in touch."
  );

  form.reset();
} catch (error) {
  console.error("Form submission error:", error);

  setStatus(
    "Something went wrong. Please try again in a moment."
  );
}
  }

  return (
    <section id="contact" className="contact">
      <div className="wrap contact-grid">
        <div>
          <p className="eyebrow">CONTACT</p>
          <h2>Start with the process.</h2>
          <p className="section-lead">
            A few details are enough to begin. Tell us what keeps repeating.
          </p>
        </div>

        <form onSubmit={submit}>
          <div className="field-row">
            <label>
              Name
              <input name="Name" placeholder="Name" />
            </label>

            <label>
              Business
              <input name="Business" placeholder="Business" />
            </label>
          </div>

          <label>
            Email
            <input
              name="Email"
              type="email"
              required
              placeholder="Email"
            />
          </label>

          <label>
            Automation Request
            <textarea
              name="Automation Request"
              required
              placeholder="What would you like to automate?"
            />
          </label>

          <label>
            Current Process <span>(optional)</span>
            <textarea
              name="Current Process"
              placeholder="Current process or problem"
            />
          </label>

          <input
            className="honeypot"
            name="website"
            tabIndex="-1"
            autoComplete="off"
          />

          <button
            className="btn btn-blue submit"
            type="submit"
          >
            Start a Conversation
          </button>

          {status && (
            <p className="form-status" role="status">
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
function Footer(){return <footer><div className="wrap footer-inner"><div><Logo/><p>Practical automation for modern businesses.</p></div><p>© {new Date().getFullYear()} ALLEVOR Studio. All rights reserved.</p></div></footer>}
function App(){return <><Header/><main><Hero/><section className="flow-intro"><div className="wrap"><p className="eyebrow">HOW IT WORKS</p><h2>A useful system, in motion</h2><p className="intro-copy">Customer input enters the system, automation decides what should happen, and the right action follows without another manual handoff.</p></div></section><Services/><Featured/><HowItWorks/><Work/><Why/><About/><Contact/></main><Footer/></>}

const schema={"@context":"https://schema.org","@type":"ProfessionalService","name":"Allevor","url":"https://allevor.com/","description":"Practical workflow automation for small and medium-sized businesses.","areaServed":"Worldwide","serviceType":"Business process automation"}
const script=document.createElement('script'); script.type='application/ld+json'; script.textContent=JSON.stringify(schema); document.head.appendChild(script)

createRoot(document.getElementById('root')).render(<App/>)
