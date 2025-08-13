import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha: React.FC = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;
  return (
    <div>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        size="invisible"
      />
    </div>
  );
};

export default ReCaptcha;