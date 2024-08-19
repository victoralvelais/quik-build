import { useState } from "react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import homeCSS from "~/styles/home.css?url";
import Clouds from "~/components/clouds";
import Stars from "~/components/stars";
import Timeline from "~/components/timeline";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: homeCSS }];

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [betaEmail, setBetaEmail] = useState('')
  const [reason, setReason] = useState('')
  const [showPopup, setShowPopup] = useState(false)

  const joinMailingList = (e) => {
    e.preventDefault()
    if (email) {
      alert(`Thank you for joining our mailing list with email: ${email}`)
    } else {
      alert('Please enter a valid email address.')
    }
  }

  const submitBeta = (e) => {
    e.preventDefault()
    if (name && betaEmail && reason) {
      alert('Thank you for your interest! We will be in touch soon.')
      setShowPopup(false)
    } else {
      alert('Please fill out all fields.')
    }
  }

  const handleBetaLinkKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setShowPopup(true)
    }
  }

  return (
    <div className="container">
      <div className="moving-background"></div>
      <Stars />
      <Clouds />
      <div className="content">
        <h1>Your CR <span className="highlight">Online Now!</span></h1>
        <p>Transforming the Way You Host Your Applications</p>
        <form className="signup-form" onSubmit={joinMailingList}>
          <div className="input-group">
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              aria-label="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Join</button>
          </div>
        </form>
        <Timeline />
        <p>Interested in beta testing? <span className="beta-link" onClick={() => setShowPopup(true)} onKeyDown={handleBetaLinkKeyDown} tabIndex={0} role="button">Apply here</span></p>
      </div>

      {showPopup && (
        <div className="popup" id="betaPopup" role="dialog" aria-labelledby="popupTitle">
          <h2 id="popupTitle">Apply for Beta Testing</h2>
          <form onSubmit={submitBeta}>
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              aria-label="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="betaEmail" className="sr-only">Email</label>
            <input
              type="email"
              id="betaEmail"
              placeholder="Email"
              aria-label="Email"
              required
              value={betaEmail}
              onChange={(e) => setBetaEmail(e.target.value)}
            />
            <label htmlFor="reason" className="sr-only">Why do you want to beta test?</label>
            <textarea
              id="reason"
              placeholder="Why do you want to beta test?"
              aria-label="Reason for beta testing"
              rows={4}
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
            <button type="submit">Submit Application</button>
          </form>
        </div>
      )}
    </div>
  )
}
