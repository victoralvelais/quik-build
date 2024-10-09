import { useState } from "react";
import { json } from "@remix-run/node";
import type { LinksFunction, MetaFunction, ActionFunction, ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import homeCSS from "~/styles/home.css?url";
import styles from "~/styles/signup.module.css";
import { unsubscribeEmailFromList } from "~/.server/list";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: homeCSS },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Unsubscribe - Ur Web App" },
    { name: "description", content: "Unsubscribe from our mailing list" },
  ];
};

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const email = url.searchParams.get('email');
  return json({ email });
};

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData();
  const email = body.get('email') as string;

  try {
    const result = await unsubscribeEmailFromList(email);
    return json(result);
  } catch (error) {
    console.error(error);
    return json({ success: false, message: 'Failed to unsubscribe!', error });
  }
};

export default function Unsubscribe() {
  const { email: initialEmail } = useLoaderData<{ email: string | null }>();
  const [email, setEmail] = useState(initialEmail || '');
  const fetcher = useFetcher<{ success?: boolean; message?: string }>();

  const emailIsValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email.trim());
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Unsubscribe</h1>
        {fetcher.data?.success ? (
          <p className={styles.success}>{fetcher.data.message}</p>
        ) : (
          <div className={styles.formContainer}>
            <p>Please confirm your email to unsubscribe:</p>
            <fetcher.Form 
              method="post" 
              className={styles.signupForm} 
              onSubmit={(e) => {
                if (!emailIsValid(email)) e.preventDefault();
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
                    placeholder="Confirm your email address..."
                    aria-label="Email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit">Unsubscribe</button>
                </div>
              </div>
            </fetcher.Form>
            {fetcher.state === "submitting" && <p className={styles.submitting}>Processing...</p>}
            <div className={`${styles.inputIcon} ${email === '' ? styles.hidden : ''}`}>
              {emailIsValid(email) ? '✔️ Valid' : '❌ Enter a valid email'}
            </div>
            {fetcher.data?.message && <p className={styles.error}>{fetcher.data.message}</p>}
          </div>
        )}
      </div>
    </div>
  );
}