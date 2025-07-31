import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import desktopImage from "@/assets/images/illustration-sign-up-desktop.svg"
import desktopMobileImage from "@/assets/images/illustration-sign-up-mobile.svg"

/*
 * Reference: https://v3.shadcn.com/docs/components/
 * Reminder: using shadcn/ui v2.3.0  - npx shadn@2.3.0 add <component>
 *
 * To-do
 * [ ] Implement design components
 *  [ ] Implement form input for email input
 *  [x] Amend grid layout for design image
 *  [ ] Implement the header components
 *  [ ] Implement state and prop types
 *  [ ] Form checking for email input
 * [ ] Set up testing
 * [ ] Set up extra page
 *  [ ] Submission success page
 *  [ ] Error page
 * [ ] Set up mobile view
 */

function App() {
  return (
    <main className="flex h-screen justify-center">
      <Card className="flex h-fit w-[375px] flex-row items-center justify-between self-center p-3 text-center md:w-[1440px]">
        <div className="relative size-full">
          <CardHeader className="text-5xl font-bold">
            <CardTitle>Stay updated!</CardTitle>
            <CardDescription className="text-lg font-normal">
              Join 60,000+ product managers receiving monthly updates on:
            </CardDescription>
          </CardHeader>
          <CardContent className="self-center text-2xl font-bold">
            This is a content
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center gap-4">
            <Button className="bg-neutral-blue-800 p-8 text-center">
              Subscribe to monthly newsletter
            </Button>
          </CardFooter>
        </div>
        <div className="flex h-full w-1/2 items-center justify-center">
          <img
            src={desktopMobileImage}
            alt="Mobile Newsletter illustration"
            className="h-auto w-full max-w-full object-contain md:hidden"
          />
          <img
            src={desktopImage}
            alt="Newsletter illustration"
            className="hidden h-auto w-full max-w-full object-contain md:block"
          />
        </div>
      </Card>
    </main>
  )
}

export default App
