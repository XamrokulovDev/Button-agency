import React, { useRef, useImperativeHandle, forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export type ReCaptchaHandle = {
  execute: () => Promise<string | null>;
};

const ReCaptchaComponent = forwardRef<ReCaptchaHandle>((_, ref) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

  useImperativeHandle(ref, () => ({
    execute: () =>
      new Promise((resolve) => {
        if (recaptchaRef.current) {
          recaptchaRef.current.executeAsync().then((token) => {
            resolve(token || null);
            recaptchaRef.current?.reset(); // optional: reset after use
          });
        } else {
          resolve(null);
        }
      }),
  }));

  return <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} size="invisible" />;
});

export default ReCaptchaComponent;
