import { useFetcher  } from "@remix-run/react"
import { useState } from "react"
import styles from "~/styles/signup.module.css"

const EmailForm = () => {
  const [email, setEmail] = useState('')
  const fetcher = useFetcher()

  const emailIsValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return emailRegex.test(email.trim())
  }

  return (
    <>
      <fetcher.Form 
        method="post" 
        className={styles.signupForm} 
        onSubmit={(e) => {
          if (!emailIsValid(email)) e.preventDefault()
        }}
      >
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.srOnly}>Email address</label>
          <div className={email === '' ? styles.neutral : emailIsValid(email) ? styles.valid : styles.invalid}>
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
      <div className={`${styles.inputIcon} ${email === '' ? styles.hidden : ''}`}>
        {emailIsValid(email) ? '✅ Valid' : '❌ Enter a valid email'}
      </div>
      {fetcher.data?.success && <p>Thank you for joining our mailing list!</p>}
      {fetcher.data?.error && <p>Error: {fetcher.data.error}</p>}
    </>
  )
}

export default EmailForm