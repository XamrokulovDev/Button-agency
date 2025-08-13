import { useRef, forwardRef, useImperativeHandle } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export type ReCaptchaRef = {
  execute: () => Promise<string | null>;
};

const ReCaptcha = forwardRef<ReCaptchaRef>((_, ref) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

  useImperativeHandle(ref, () => ({
    execute: async () => {
      if (recaptchaRef.current) {
        const token = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
        return token;
      }
      return null;
    },
  }));

  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={siteKey}
      size="invisible"
    />
  );
});

export default ReCaptcha;