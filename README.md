# Frontend Mentor - Newsletter sign-up form with success message solution

This is a solution to the [Newsletter sign-up form with success message challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/newsletter-signup-form-with-success-message-3FC1AZbNrv). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Development](#development)
  - [Testing](#testing)
  - [Building](#building)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Add their email and submit the form
- See a success message with their email after successfully submitting the form
- See form validation messages if:
  - The field is left empty
  - The email address is not formatted correctly
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![Desktop Design](./design/desktop-design.jpg)
![Mobile Design](./design/mobile-design.jpg)
![Desktop Success](./design/desktop-success.jpg)
![Mobile Success](./design/mobile-success.jpg)

### Links

- Solution URL: [GitHub Repository](https://github.com/KC900201/front_end_mentor_newsletter_signup_form)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- [React 18](https://reactjs.org/) - JavaScript library
- [TypeScript](https://www.typescriptlang.org/) - For type safety
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [React Hook Form](https://react-hook-form.com/) - For form management
- [Zod](https://zod.dev/) - For schema validation
- [React Router DOM](https://reactrouter.com/) - For client-side routing
- [Shadcn/ui](https://ui.shadcn.com/) - Component library
- [Radix UI](https://www.radix-ui.com/) - Headless UI primitives
- [Vitest](https://vitest.dev/) - Testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - For component testing
- Mobile-first responsive design
- CSS Grid and Flexbox

### What I learned

This project helped me strengthen my understanding of:

1. **Form validation with React Hook Form and Zod**:

```tsx
const formSchema = z.object({
  email: z.email("Valid email required"),
})

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: { email: "" },
})
```

2. **Component composition with Shadcn/ui**:

```tsx
<Card className="flex h-screen md:h-fit w-full flex-col...">
  <CardHeader>
    <CardTitle>Stay updated!</CardTitle>
    <CardDescription>Join 60,000+ product managers...</CardDescription>
  </CardHeader>
  <CardContent>
    <Form {...form}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email address</FormLabel>
            <FormControl>
              <Input type="email" placeholder="email@company.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  </CardContent>
</Card>
```

3. **Responsive design with Tailwind CSS**:

```tsx
className = "h-screen w-full md:h-fit md:w-[960px] flex-col md:flex-row"
```

4. **State management with React Router**:

```tsx
navigate(pages.get("success").path, {
  state: { emailAddress: values.email },
})
```

### Continued development

Areas I want to continue focusing on:

- Advanced form validation patterns
- Component testing strategies
- Accessibility improvements
- Performance optimization with React
- Advanced TypeScript patterns

### Useful resources

- [React Hook Form Documentation](https://react-hook-form.com/) - Excellent for understanding form management
- [Zod Documentation](https://zod.dev/) - Great for schema validation
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Comprehensive utility-first CSS framework
- [Shadcn/ui Documentation](https://ui.shadcn.com/) - Modern component library

## Getting Started

### Installation

Clone the repository:

```bash
git clone https://github.com/KC900201/front_end_mentor_newsletter_signup_form.git
cd newsletter_signup_form
```

Install dependencies:

```bash
npm install
# or
pnpm install
```

### Development

Start the development server:

```bash
npm run dev
# or
pnpm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

### Testing

Run the test suite:

```bash
npm run test
# or
pnpm run test
```

Run tests with UI:

```bash
npm run test:ui
# or
pnpm run test:ui
```

### Building

Build for production:

```bash
npm run build
# or
pnpm run build
```

Preview the production build:

```bash
npm run serve
# or
pnpm run serve
```

### Linting and Type Checking

Run ESLint:

```bash
npm run lint
# or
pnpm run lint
```

Run TypeScript type checking:

```bash
npm run typecheck
# or
pnpm run typecheck
```

## Author

- Website - [KC900201](https://github.com/KC900201)
- Frontend Mentor - [@KC900201](https://www.frontendmentor.io/profile/KC900201)
- GitHub - [@KC900201](https://github.com/KC900201)
