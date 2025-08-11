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
 *  [ ] Implement state and prop types
 *  [x] Form checking for email input
 * [ ] Set up testing
 * [ ] Set up extra page
 *  [ ] Submission success page **
 *  [x] Error page
 * [ ] Set up mobile view
 * [ ] Improve the SEO, meta-tags of website
 */

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path={pages.get("home").path} element={<SignUpForm />} />
        <Route
          path={pages.get("success").path}
          element={<SuccessMessage emailAddress={"test@example.com"} />}
        />
      </Routes>
    </MainLayout>
  )
}

export default App
