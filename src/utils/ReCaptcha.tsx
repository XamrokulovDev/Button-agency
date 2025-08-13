"use client"

import { useRef, forwardRef, useImperativeHandle } from "react"
import ReCAPTCHA from "react-google-recaptcha"

export interface ReCaptchaRef {
  executeAsync: () => Promise<string | null>
  reset: () => void
}

const ReCaptcha = forwardRef<ReCaptchaRef>((_, ref) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string

  useImperativeHandle(ref, () => ({
    executeAsync: async () => {
      if (recaptchaRef.current) {
        return await recaptchaRef.current.executeAsync()
      }
      return null
    },
    reset: () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
      }
    },
  }))

  return (
    <div>
      <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} size="invisible" />
    </div>
  )
})

ReCaptcha.displayName = "ReCaptcha"
export default ReCaptcha;