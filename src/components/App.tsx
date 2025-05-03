import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

/* To-do
 * Implement design components
 * Implement form check for email
 * Set up testing
 * Implement form submission handling
 */

function App() {
  return (
    <main className="flex h-screen justify-center">
      <Card className="grid h-[550px] w-[1440px] self-center overflow-hidden p-2 md:grid-cols-2">
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
          <CardFooter>
            <Button className="bg-neutral-blue-800 p-8 text-center">
              Subscribe to monthly newsletter
            </Button>
          </CardFooter>
        </div>
        <div className="relative hidden size-3/6 bg-muted md:block">
          <img
            src="/src/assets/images/illustration-sign-up-desktop.svg"
            alt="Image"
            className="absolute inset-0 size-fit object-cover"
          />
        </div>
      </Card>
    </main>
  )
}

export default App
