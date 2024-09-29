import { useState, useEffect } from "react";
import { json } from "@remix-run/node";
import type { LinksFunction, MetaFunction, ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import homeCSS from "~/styles/home.css?url";
import Clouds from "~/components/clouds";
import Stars from "~/components/stars";
import Timeline from "~/components/timeline";
import EmailForm from "~/components/emailForm";
import BetaForm from "~/components/betaForm";
import { addEmailToList, type User } from "~/.server/list";

export const links: LinksFunction = () => [
  // ...signupCSS(),
  { rel: "stylesheet", href: homeCSS },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Ur Web App" },
    { name: "description", content: "Build Ur Next Web App!" },
  ];
};

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData();
  const address = body.get('email');
  const user: User = { address: address as string };
  const type = body.get('formType');

  try {
    if (type === "beta") {
      user.name = body.get('name') as string;
      user.vars = {
        // beta user details
      };
    }
  
    const result = await addEmailToList(user);
    return json(result);
  } catch (error) {
    console.error(error);
    return json({ success: false, message: 'Failed to submit email!', error });
  }
}

type KeyEvent = React.KeyboardEvent<HTMLElement> | KeyboardEvent

export default function Index() {
  const [showPopup, setShowPopup] = useState(false)

  const handleBetaLinkKeyDown = ({ key }: KeyEvent) => {
    if (key === 'Enter' || key === ' ') {
      setShowPopup(true)
    } else if (key === 'Escape') {
      setShowPopup(false);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleBetaLinkKeyDown);
    return () => document.removeEventListener('keydown', handleBetaLinkKeyDown);
  }, []);

  return (
    <div className="container">
      <div className="movingBackground"></div>
      <Stars />
      <Clouds />
      <div className="content">
        <h1>Your CR <span className="highlight">Online Now!</span></h1>
        <p>Transforming the Way You Host Your Applications</p>
        <EmailForm />
        <Timeline />
        <p className="beta">
          <span>Interested in beta testing?</span> 
          <span
            className="betaLink"
            onClick={() => setShowPopup(true)}
            onKeyDown={handleBetaLinkKeyDown}
            tabIndex={0}
            role="button"
          >
            Apply here
          </span>
        </p>
      </div>
      {showPopup && <BetaForm closeModal={() => setShowPopup(false)} />}
    </div>
  )
}