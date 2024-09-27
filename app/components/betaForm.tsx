import React, { useState } from "react"
import styles from "~/styles/beta.module.css"

interface BetaFormProps {
  onSubmit: () => void
}

const BetaForm: React.FC<BetaFormProps> = ({ onSubmit }) => {
  console.log('styles', styles)
  const [name, setName] = useState('')
  const [betaEmail, setBetaEmail] = useState('')
  const [reason, setReason] = useState('')
  const [goals, setGoals] = useState<string[]>([])
  const [integration, setIntegration] = useState('')

  const submitBeta = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name && betaEmail && reason && goals.length > 0 && integration) {
      alert('Thank you for your interest! We will be in touch soon.')
      onSubmit()
    } else {
      alert('Please fill out all fields.')
    }
  }

  return (
    <div className={styles.betaContainer}>
      <h1>Join Our Beta</h1>
      <form onSubmit={submitBeta} id="betaSignupForm">
        <input type="hidden" name="formType" value="beta" />
    
        <div>
          <label htmlFor="name">Name</label>
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
          <label htmlFor="email">Email</label>
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
            <legend>What are you building?</legend>
            <div className={styles.checkboxGroup}>
              {['Blog', 'Store', 'Portfolio', 'Wiki', 'Other'].map((goal) => (
                <div className={styles.betaContainer__checkboxItem} key={goal}>
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
            <div className={styles.betaContainer__otherInput} id="otherGoalInput" style={{ display: goals.includes('Other') ? 'block' : 'none' }}>
              <label htmlFor="otherGoal">Other goal</label>
              <input type="text" id="otherGoal" name="otherGoal" placeholder="Tell us what you're building" />
            </div>
          </fieldset>
        </div>
    
        <div>
          <fieldset>
            <legend>How will you integrate?</legend>
            <div className={styles.betaContainer__checkboxGroup}>
              {['NPM Package', 'JSON', 'HTML', 'Other'].map((method) => (
                <div className={styles.betaContainer__checkboxItem} key={method}>
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
            <div className={styles.betaContainer__otherInput} id="otherIntegrationInput" style={{ display: integration === 'Other' ? 'block' : 'none' }}>
              <label htmlFor="otherIntegration">Other integration method</label>
              <input type="text" id="otherIntegration" name="otherIntegration" placeholder="Specify your integration method" />
            </div>
          </fieldset>
        </div>
    
        <div>
          <label htmlFor="betaReason">Why do you want to join our beta?</label>
          <textarea
            id="betaReason"
            name="betaReason"
            required
            placeholder="Tell us why you're excited to participate..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></textarea>
        </div>
    
        <button type="submit">Sign Up for Beta Access</button>
      </form>
    </div>  )
}
export default BetaForm