import { useState, useEffect } from "react"
import { useFetcher } from "@remix-run/react"
import styles from "~/styles/beta.module.css"

interface BetaFormProps {
  closeModal: () => void
}

type FetcherData = {
  success?: boolean;
  error?: string;
};

const BetaForm: React.FC<BetaFormProps> = ({ closeModal }: { closeModal: () => void }) => {
  const fetcher = useFetcher<FetcherData>()
  const [name, setName] = useState('')
  const [betaEmail, setBetaEmail] = useState('')
  const [reason, setReason] = useState('')
  const [goals, setGoals] = useState<string[]>([])
  const [integration, setIntegration] = useState('')

  useEffect(() => {
    if (fetcher.data?.success) setTimeout(() => closeModal(), 5000);
  }, [fetcher.data, closeModal]);

  const submitBeta = (e: React.FormEvent<HTMLFormElement>) => {
    if (name && betaEmail && reason && goals.length > 0 && integration) {
      return true
    } else {
      e.preventDefault()
      return false
    }
  }

  const handleClickOutside = (({ target, currentTarget }: React.MouseEvent<HTMLDivElement>) => {
    if (target === currentTarget) closeModal();
  });

  const handleModalOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') closeModal();
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <section 
      className={styles.modalOverlay} 
      onClick={handleClickOutside}
      onKeyDown={handleModalOverlayKeyDown}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.betaContainer}>
        <div className={styles.betaWrapper}>
          <button className={styles.closeButton} onClick={closeModal} aria-label="Close beta signup form">×</button>
          <h1>Join Our Beta</h1>
          {!fetcher.data?.success && <fetcher.Form
            id="betaSignupForm"
            method="post" 
            className={styles.signupForm} 
            onSubmit={submitBeta}
          >
            <input type="hidden" name="formType" value="beta" />
        
            <div>
              <label htmlFor="name">Name 🤗</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
        
            <div>
              <label htmlFor="email">Email 📧</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="your@email.com"
                value={betaEmail}
                onChange={(e) => setBetaEmail(e.target.value)}
              />
            </div>
        
            <div>
              <fieldset>
                <legend>What kind of project are you building? 💡</legend>
                <div className={styles.checkboxGroup}>
                  {['Blog', 'Store', 'Portfolio', 'Wiki', 'Other'].map((goal) => (
                    <div className={styles.checkboxItem} key={goal}>
                      <input
                        type="checkbox"
                        id={`goal${goal}`}
                        name="goals"
                        value={goal}
                        checked={goals.includes(goal)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setGoals([...goals, goal])
                          } else {
                            setGoals(goals.filter(g => g !== goal))
                          }
                        }}
                      />
                      <label htmlFor={`goal${goal}`}>{goal}</label>
                    </div>
                  ))}
                </div>
                <div className={styles.otherInput} id="otherGoalInput" style={{ display: goals.includes('Other') ? 'block' : 'none' }}>
                  <label htmlFor="otherGoal">Other goal</label>
                  <input type="text" id="otherGoal" name="otherGoal" placeholder="Tell us what you're building" />
                </div>
              </fieldset>
            </div>
        
            <div>
              <fieldset>
                <legend>How will you integrate? 🔗</legend>
                <div className={styles.checkboxGroup}>
                  {['NPM', 'JSON', 'HTML', 'Other'].map((method) => (
                    <div className={styles.checkboxItem} key={method}>
                      <input
                        type="checkbox"
                        id={`integrate${method.replace(' ', '')}`}
                        name="integration"
                        value={method}
                        checked={integration === method}
                        onChange={(e) => setIntegration(e.target.checked ? method : '')}
                      />
                      <label htmlFor={`integrate${method.replace(' ', '')}`}>{method}</label>
                    </div>
                  ))}
                </div>
                <div className={styles.otherInput} id="otherIntegrationInput" style={{ display: integration === 'Other' ? 'block' : 'none' }}>
                  <label htmlFor="otherIntegration">Other integration method</label>
                  <input type="text" id="otherIntegration" name="otherIntegration" placeholder="Specify your integration method" />
                </div>
              </fieldset>
            </div>
        
            <div>
              <label htmlFor="betaReason">Why are you excited to join our beta? ✨</label>
              <textarea
                id="betaReason"
                name="betaReason"
                placeholder="Share your creative vision and how we can help..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            </div>
        
            <button type="submit">Join the innovation 🚀</button>
          </fetcher.Form>}
          {fetcher.state === "submitting" && <p className={styles.submitting}>Submitting...</p>}
          {fetcher.data?.success && <p className={styles.success}>Thank you for joining our beta! We'll be in touch soon.</p>}
          {fetcher.data?.error && (
            <p className={styles.error}>
              Error: {typeof fetcher.data.error === 'string' 
                ? fetcher.data.error 
                : JSON.stringify(fetcher.data.error)}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default BetaForm