import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
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
import pages from "@/utils/pages"

const productList = [
  "Product discovery and building what matters",
  "Measuring to ensure updates are successful",
  "And much more!",
]

const formSchema = z.object({
  email: z.email("Valid email required"),
})

function SignUpForm() {
  const navigate = useNavigate()

  // Set up form validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Handle successful form submission
    navigate(pages.get("success").path, {
      state: { emailAddress: values.email },
    })
  }

  return (
    <Card className="flex h-screen md:h-fit w-full flex-col md:w-[1440px] md:flex-row items-center justify-between self-center border-none shadow-none rounded-none md:border md:shadow-sm md:rounded-3xl p-0 md:p-4 text-justify">
      {/* Mobile image at top - only visible on mobile */}
      <div className="w-full md:hidden">
        <img
          src={desktopMobileImage}
          alt="Mobile Newsletter illustration"
          className="h-auto w-full object-cover rounded-b-2xl"
        />
      </div>
      <div className="relative w-full md:w-1/2 p-6 md:p-8 flex-1 flex flex-col justify-center md:justify-start">
        <CardHeader className="text-4xl md:text-6xl font-bold p-0 mb-4 md:mb-6">
          <CardTitle className="text-left text-[hsl(234,29%,20%)] leading-tight">
            Stay updated!
          </CardTitle>
          <CardDescription className="text-base md:text-lg font-normal text-wrap text-left text-[hsl(234,29%,20%)] mt-3 md:mt-4">
            Join 60,000+ product managers receiving monthly updates on:
          </CardDescription>
        </CardHeader>
        <CardContent className="text-base md:text-lg p-0 mb-6 md:mb-8">
          <ul className="list-none space-y-2 md:space-y-3">
            {productList.map((item, index) => (
              <li key={index} className="flex items-start gap-3 md:gap-4">
                <img
                  src={listIcon}
                  alt="List icon"
                  className="mt-0.5 flex-shrink-0 w-4 h-4 md:w-5 md:h-5"
                />
                <span className="text-[hsl(234,29%,20%)] font-normal">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
        {/* Email address */}
        <CardContent className="p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-xs md:text-sm font-bold text-[hsl(234,29%,20%)]">
                        Email address
                      </FormLabel>
                      <FormMessage className="text-[hsl(4,100%,67%)] text-xs md:text-sm" />
                    </div>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@company.com"
                        className={`p-5 md:p-4 text-sm md:text-base border rounded-lg ${
                          form.formState.errors.email
                            ? "border-[hsl(4,100%,67%)] bg-red-50 text-[hsl(4,100%,67%)] placeholder:text-red-300 focus:border-[hsl(4,100%,67%)] focus:ring-[hsl(4,100%,67%)]"
                            : "border-[hsl(0,0%,58%)] focus:border-[hsl(234,29%,20%)] focus:ring-[hsl(234,29%,20%)]"
                        }`}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-[hsl(234,29%,20%)] hover:bg-gradient-to-r hover:from-[#ff6155] hover:to-[#ff6155] hover:shadow-[0_16px_32px_rgba(255,97,85,0.5)] transition-all duration-300 p-3 md:p-4 text-center text-sm md:text-base font-bold rounded-lg"
              >
                Subscribe to monthly newsletter
              </Button>
            </form>
          </Form>
        </CardContent>
      </div>

      {/* Desktop image on right - only visible on desktop */}
      <div className="hidden md:flex h-fit w-fit items-center justify-center">
        <img
          src={desktopImage}
          alt="Newsletter illustration"
          className="h-auto w-full max-w-fit object-contain"
        />
      </div>
    </Card>
  )
}

export default SignUpForm
