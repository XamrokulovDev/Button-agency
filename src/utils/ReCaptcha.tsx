import { useRef, forwardRef, useImperativeHandle } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export interface ReCaptchaHandle {
  executeAsync: () => Promise<string | null>;
  reset: () => void;
}

interface ReCaptchaProps {
  onChange?: (token: string | null) => void;
}

const ReCaptcha = forwardRef<ReCaptchaHandle, ReCaptchaProps>(({ onChange }, ref) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

  useImperativeHandle(ref, () => ({
    executeAsync: async () => {
      if (recaptchaRef.current) {
        return await recaptchaRef.current.executeAsync();
      }
      return null;
    },
    reset: () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }
  }));

  return (
    <div>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        size="invisible"
        onChange={onChange}
      />
    </div>
  );
});

ReCaptcha.displayName = "ReCaptcha";

export default ReCaptcha;