/**
 * SuccessMessage (WIP)
 * reference - /design/desktop-success.jpg, /design/mobile-success.jpg
 * returns a success message for the user after subscribing
 * @param emailAddress - The email address of the user
 * @returns - A JSX element containing the success message
 */

interface SuccessMessageProps {
  emailAddress: string
}

function SuccessMessage({ emailAddress }: SuccessMessageProps) {
  return (
    <div className="mt-4 text-center">
      <h2 className="text-2xl font-bold">Thanks for subscribing!</h2>
      <p className="mt-2 text-lg">
        A confirmation email has been sent to {emailAddress}. Please open it and
        click the button inside to confirm your subscription
      </p>
    </div>
  )
}

export default SuccessMessage
