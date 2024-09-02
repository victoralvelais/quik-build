import React, { useState } from "react"

interface BetaFormProps {
  onSubmit: () => void
}

const BetaForm: React.FC<BetaFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('')
  const [betaEmail, setBetaEmail] = useState('')
  const [reason, setReason] = useState('')

  const submitBeta = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name && betaEmail && reason) {
      alert('Thank you for your interest! We will be in touch soon.')
      onSubmit()
    } else {
      alert('Please fill out all fields.')
    }
  }

  return (
    <div className="popup" id="betaPopup" role="dialog" aria-labelledby="popupTitle">
      <h2 id="popupTitle">Apply for Beta Testing</h2>
      <form onSubmit={submitBeta}>
        <input type="hidden" name="formType" value="beta" />
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
  )
}

export default BetaForm