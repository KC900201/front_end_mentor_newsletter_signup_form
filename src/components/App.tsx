import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import desktopImage from "@/assets/images/illustration-sign-up-desktop.svg"
import desktopMobileImage from "@/assets/images/illustration-sign-up-mobile.svg"
import listIcon from "@/assets/images/icon-list.svg"

/*
 * Reference: https://v3.shadcn.com/docs/components/
 * Reminder: using shadcn/ui v2.3.0  - npx shadn@2.3.0 add <component>
 *
 * To-do
 * [ ] Implement design components
 *  [x] Implement form input for email input
 *  [x] Amend grid layout for design image
 *  [x] Implement the header components
 *  [ ] Implement state and prop types
 *  [x] Form checking for email input
 * [ ] Set up testing
 * [ ] Set up extra page
 *  [ ] Submission success page
 *  [x] Error page
 * [ ] Set up mobile view
 * [ ] Improve the SEO, meta-tags of website
 */

const productList = [
  "Product discovery and building what matters",
  "Measuring to ensure updates are successful",
  "And much more!",
]

const formSchema = z.object({
  email: z.email("Valid email required"),
})

function App() {
  // Set up form validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted with values:", values)
  }
  return (
    <main className="flex h-screen justify-center">
      <Card className="flex h-fit w-[375px] flex-row items-center justify-between self-center rounded-3xl p-4 text-justify md:w-[1440px]">
        <div className="relative size-full pl-5">
          <CardHeader className="text-5xl font-bold">
            <CardTitle>Stay updated!</CardTitle>
            <CardDescription
              className="text-xl font-normal"
              style={{ marginTop: "1rem" }}
            >
              Join 60,000+ product managers receiving monthly updates on:
            </CardDescription>
          </CardHeader>
          <CardContent className="self-center text-xl">
            <ul className="list-none">
              {productList.map((item, index) => (
                <li
                  key={index}
                  className="mb-2 flex items-center justify-start gap-2"
                >
                  <img
                    src={listIcon}
                    alt="List icon"
                    className="mr-2 inline-block"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
          {/* Email address */}
          <CardContent className="mt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-lg font-bold">
                          Email address
                        </FormLabel>
                        <FormMessage className="text-red-500" />
                      </div>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@company.com"
                          className={`p-7 text-lg ${
                            form.formState.errors.email
                              ? "border-red-500 bg-red-50 text-red-500 placeholder:text-red-300 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          }`}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="mt-6 w-full bg-neutral-blue-800 p-8 text-center text-lg font-bold"
                >
                  Subscribe to monthly newsletter
                </Button>
              </form>
            </Form>
          </CardContent>
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
