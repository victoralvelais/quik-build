import { useState } from "react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import homeCSS from "~/styles/home.css?url";
import Clouds from "~/components/clouds";
import Stars from "~/components/stars";
import Timeline from "~/components/timeline";
import EmailForm from "~/components/emailForm";
import BetaForm from "~/components/betaForm";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: homeCSS }];

export const meta: MetaFunction = () => {
  return [
    { title: "Ur Web App" },
    { name: "description", content: "Build Ur Next Web App!" },
  ];
};

export default function Index() {
  const [showPopup, setShowPopup] = useState(false)

  const handleBetaLinkKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setShowPopup(true)
    }
  }

  return (
    <div className="container">
      <div className="moving-background"></div>
      <Stars />
      <Clouds />
      <div className="content">
        <h1>Your CR <span className="highlight">Online Now!</span></h1>
        <p>Transforming the Way You Host Your Applications</p>
        <EmailForm />
        <Timeline />
        <p>Interested in beta testing? <span className="beta-link" onClick={() => setShowPopup(true)} onKeyDown={handleBetaLinkKeyDown} tabIndex={0} role="button">Apply here</span></p>
      </div>
      {showPopup && <BetaForm onSubmit={() => setShowPopup(false)} />}
    </div>
  )
}
