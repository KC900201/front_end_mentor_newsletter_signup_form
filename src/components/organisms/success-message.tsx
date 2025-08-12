import { useLocation, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import successIcon from "@/assets/images/icon-success.svg"
import pages from "@/utils/pages"

/**
 * SuccessMessage
 * reference - /design/desktop-success.jpg, /design/mobile-success.jpg
 * returns a success message for the user after subscribing
 * @param emailAddress - The email address of the user
 * @returns - A JSX element containing the success message
 */

function SuccessMessage() {
  const location = useLocation()
  const navigate = useNavigate()
  const emailAddress = location.state?.emailAddress || "test@example.com"

  const onRedirect = () => {
    navigate(pages.get("home").path)
  }

  return (
    <Card className="h-screen w-full md:h-fit md:w-[400px] self-center rounded-none md:rounded-3xl text-justify p-6 md:p-8 flex flex-col justify-center md:justify-start">
      <CardHeader className="text-4xl md:text-5xl text-left font-bold flex-shrink-0">
        <img
          src={successIcon}
          alt="Success Icon"
          className="mb-8 md:mb-4 w-16 h-16 md:w-12 md:h-12"
        />
        <CardTitle className="text-[hsl(234,29%,20%)] text-4xl md:text-5xl leading-tight">
          Thanks for subscribing!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between md:justify-start">
        <CardDescription className="text-base md:text-md text-[hsl(235,18%,26%)] font-normal text-wrap text-left leading-relaxed mb-8 md:mb-0">
          A confirmation email has been sent to{" "}
          <span className="font-bold">{emailAddress}</span>. Please open it and
          click the button inside to confirm your subscription.
        </CardDescription>
        <Button
          onClick={onRedirect}
          className="mt-auto md:mt-6 w-full text-center bg-[hsl(234,29%,20%)] text-base font-bold p-4 md:p-6 hover:bg-gradient-to-r hover:from-[#ff6155] hover:to-[#ff6155] hover:shadow-[0_16px_32px_rgba(255,97,85,0.5)] transition-all duration-300"
        >
          Dismiss message
        </Button>
      </CardContent>
    </Card>
  )
}

export default SuccessMessage
