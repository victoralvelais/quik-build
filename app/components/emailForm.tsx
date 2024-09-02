import { useState } from "react"

const EmailForm = () => {
  const [email, setEmail] = useState('')

  const joinMailingList = (e) => {
    e.preventDefault()
    if (email) {
      alert(`Thank you for joining our mailing list with email: ${email}`)
    } else {
      alert('Please enter a valid email address.')
    }
  }

  return (
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
  )
}

export default EmailForm