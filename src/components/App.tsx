import { Route, Routes } from "react-router-dom"

import { SignUpForm, SuccessMessage } from "@/components/organisms"
import { MainLayout } from "@/components/templates"

import pages from "@/utils/pages"

/*
 * Reference: https://v3.shadcn.com/docs/components/
 * Reminder: using shadcn/ui v2.3.0  - npx shadn@2.3.0 add <component>
 *
 * To-do
 * [ ] Implement design components
 *  [x] Implement form input for email input
 *  [x] Amend grid layout for design image
 *  [x] Implement the header components
 *  [x] Implement state and prop types
 *  [x] Form checking for email input
 * [x] Amend mobile layout design for signup form
 * [x] Implement component and unit testing
 * [x] Set up extra page
 *  [x] Submission success page **
 * [x] Set up mobile view
 * [x] Improve the SEO, meta-tags of website
 */

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path={pages.get("home").path} element={<SignUpForm />} />
        <Route path={pages.get("success").path} element={<SuccessMessage />} />
      </Routes>
    </MainLayout>
  )
}

export default App
