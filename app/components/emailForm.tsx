import { LinksFunction } from "@remix-run/node"
import { useState } from "react"
import styles from "~/styles/signup.css?url"

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }]

const EmailForm = () => {
  const [email, setEmail] = useState('')

  const joinMailingList = (e) => {
    e.preventDefault()
    if (email.length > 0) {
      alert(`Thank you for joining our mailing list with email: ${email}`)
    } else {
      alert('Please enter a valid email address.')
    }
  }

  const emailIsValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return emailRegex.test(email.trim())
  }

  return (
    <>
      <form className="signup-form" onSubmit={joinMailingList}>
        <div className="input-group">
          <label htmlFor="email" className="sr-only">Email address</label>
          <div className={`email-input-wrapper ${email === '' ? 'neutral' : emailIsValid(email) ? 'valid' : 'invalid'}`}>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              aria-label="Email address"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <button type="submit">Join</button>
        </div>
      </form>
      <div className="input-icon">
        {email === '' ? '' : emailIsValid(email) ? '✅ Valid' : '❌ Enter a valid email'}
      </div>
    </>
  )
}

export default EmailForm