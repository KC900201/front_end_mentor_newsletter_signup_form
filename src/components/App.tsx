import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { SignUpForm } from "@/components/organisms"
import { MainLayout } from "@/components/templates"
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
 *  [ ] Submission success page **
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
    <MainLayout>
      <SignUpForm />
    </MainLayout>
  )
}

export default App
