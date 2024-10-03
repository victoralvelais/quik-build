import { useFetcher } from "@remix-run/react"
import { useState } from "react"
import styles from "~/styles/signup.module.css"

type FetcherData = {
  success?: boolean;
  error?: string;
};

const EmailForm = () => {
  const [email, setEmail] = useState('')
  const fetcher = useFetcher<FetcherData>()

  const emailIsValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return emailRegex.test(email.trim())
  }

  return (
    <div className={styles.formContainer}>
      <p>Get notified when we launch!</p>
      <fetcher.Form 
        method="post" 
        className={styles.signupForm} 
        onSubmit={(e) => {
          if (!emailIsValid(email)) e.preventDefault()
        }}
      >
        <div className={styles.inputContainer}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.srOnly}>Email address</label>
            <input
              className={email === '' ? styles.neutral : emailIsValid(email) ? styles.valid : styles.invalid}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address..."
              aria-label="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="hidden" name="formType" value="email" />
            <button type="submit">Stay updated</button>
          </div>
        </div>
      </fetcher.Form>
      {fetcher.state === "submitting" && <p className={styles.submitting}>Submitting...</p>}
      <div className={`${styles.inputIcon} ${email === '' ? styles.hidden : ''}`}>
        {emailIsValid(email) ? '✔️ Valid' : '❌ Enter a valid email'}
      </div>
      {fetcher.data?.success && <p className={styles.success}>Thank you for joining our mailing list!</p>}
      {fetcher.data?.error && <p className={styles.error}>Error: {fetcher.data.error}</p>}
    </div>
  )
}

export default EmailForm