import { useFetcher  } from "@remix-run/react"
import { LinksFunction } from "@remix-run/node"
import { useState } from "react"
import styles from "~/styles/signup.css?url"

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }]

const EmailForm = () => {
  const [email, setEmail] = useState('')
  const fetcher = useFetcher()

  const emailIsValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return emailRegex.test(email.trim())
  }

  return (
    <>
      <fetcher.Form 
        method="post" 
        className="signup-form" 
        onSubmit={(e) => {
          if (!emailIsValid(email)) e.preventDefault()
        }}
      >
        <div className="input-group">
          <label htmlFor="email" className="sr-only">Email address</label>
          <div className={`email-input-wrapper ${email === '' ? 'neutral' : emailIsValid(email) ? 'valid' : 'invalid'}`}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              aria-label="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="hidden" name="formType" value="email" />
          </div>
          <button type="submit">Join</button>
        </div>
      </fetcher.Form>
      {fetcher.state === "submitting" && <p>Submitting...</p>}
      {fetcher.state === "idle" && !fetcher.data && <div className="input-icon">
        {email === '' ? '' : emailIsValid(email) ? '✅ Valid' : '❌ Enter a valid email'}
      </div>}
      {fetcher.data?.success && <p>Thank you for joining our mailing list!</p>}
      {fetcher.data?.error && <p>Error: {fetcher.data.error}</p>}
    </>
  )
}

export default EmailForm