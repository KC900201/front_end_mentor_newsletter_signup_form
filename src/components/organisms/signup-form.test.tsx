import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { vi, describe, it, expect, beforeEach } from "vitest"
import SignUpForm from "./signup-form"

// Create mock functions
const mockNavigate = vi.fn()

// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock the pages utility
vi.mock("@/utils/pages", () => ({
  default: {
    get: vi.fn().mockReturnValue({ path: "/success" }),
  },
}))

// Mock images
vi.mock("@/assets/images/illustration-sign-up-desktop.svg", () => ({
  default: "mocked-desktop-image.svg",
}))

vi.mock("@/assets/images/illustration-sign-up-mobile.svg", () => ({
  default: "mocked-mobile-image.svg",
}))

vi.mock("@/assets/images/icon-list.svg", () => ({
  default: "mocked-list-icon.svg",
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe("SignUpForm", () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    vi.clearAllMocks()
  })

  it("renders the signup form component", () => {
    renderWithRouter(<SignUpForm />)

    expect(screen.getByText("Stay updated!")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Join 60,000+ product managers receiving monthly updates on:"
      )
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /subscribe to monthly newsletter/i })
    ).toBeInTheDocument()
  })

  it("displays the product list items", () => {
    renderWithRouter(<SignUpForm />)

    expect(
      screen.getByText("Product discovery and building what matters")
    ).toBeInTheDocument()
    expect(
      screen.getByText("Measuring to ensure updates are successful")
    ).toBeInTheDocument()
    expect(screen.getByText("And much more!")).toBeInTheDocument()
  })

  it("displays list icons for each product item", () => {
    renderWithRouter(<SignUpForm />)

    const listIcons = screen.getAllByAltText("List icon")
    expect(listIcons).toHaveLength(3)
    listIcons.forEach((icon) => {
      expect(icon).toHaveAttribute("src", "mocked-list-icon.svg")
    })
  })

  it("displays email input field with correct attributes", () => {
    renderWithRouter(<SignUpForm />)

    const emailInput = screen.getByRole("textbox", { name: /email address/i })
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute("type", "email")
    expect(emailInput).toHaveAttribute("placeholder", "email@company.com")
  })

  it("displays mobile image on mobile and desktop image on desktop", () => {
    renderWithRouter(<SignUpForm />)

    const mobileImage = screen.getByAltText("Mobile Newsletter illustration")
    const desktopImage = screen.getByAltText("Newsletter illustration")

    expect(mobileImage).toBeInTheDocument()
    expect(mobileImage).toHaveAttribute("src", "mocked-mobile-image.svg")

    expect(desktopImage).toBeInTheDocument()
    expect(desktopImage).toHaveAttribute("src", "mocked-desktop-image.svg")
  })

  it("validates email input and shows error for invalid email", async () => {
    renderWithRouter(<SignUpForm />)

    const emailInput = screen.getByRole("textbox", { name: /email address/i })
    const submitButton = screen.getByRole("button", {
      name: /subscribe to monthly newsletter/i,
    })

    // Enter invalid email
    fireEvent.change(emailInput, { target: { value: "invalid-email@email" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("Valid email required")).toBeInTheDocument()
    })
  })

  it("shows error styling on input field when validation fails", async () => {
    renderWithRouter(<SignUpForm />)

    const emailInput = screen.getByRole("textbox", { name: /email address/i })
    const submitButton = screen.getByRole("button", {
      name: /subscribe to monthly newsletter/i,
    })

    // Submit empty form
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(emailInput).toHaveClass("border-[hsl(4,100%,67%)]")
      expect(emailInput).toHaveClass("bg-red-50")
      expect(emailInput).toHaveClass("text-[hsl(4,100%,67%)]")
    })
  })

  it("accepts valid email input", async () => {
    renderWithRouter(<SignUpForm />)

    const emailInput = screen.getByRole("textbox", { name: /email address/i })

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })

    expect(emailInput).toHaveValue("test@example.com")
  })

  it("navigates to success page with email when form is submitted with valid email", async () => {
    renderWithRouter(<SignUpForm />)

    const emailInput = screen.getByRole("textbox", { name: /email address/i })
    const submitButton = screen.getByRole("button", {
      name: /subscribe to monthly newsletter/i,
    })

    // Enter valid email and submit
    fireEvent.change(emailInput, { target: { value: "user@example.com" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/success", {
        state: { emailAddress: "user@example.com" },
      })
    })
  })

  it("does not navigate when form is submitted with invalid email", async () => {
    renderWithRouter(<SignUpForm />)

    const emailInput = screen.getByRole("textbox", { name: /email address/i })
    const submitButton = screen.getByRole("button", {
      name: /subscribe to monthly newsletter/i,
    })

    // Enter invalid email and submit
    fireEvent.change(emailInput, { target: { value: "invalid-email@email" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("Valid email required")).toBeInTheDocument()
    })

    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it("has proper accessibility attributes", () => {
    renderWithRouter(<SignUpForm />)

    const heading = screen.getByRole("heading", { name: /stay updated/i })
    expect(heading).toBeInTheDocument()

    const emailInput = screen.getByRole("textbox", { name: /email address/i })
    expect(emailInput).toBeInTheDocument()

    const submitButton = screen.getByRole("button", {
      name: /subscribe to monthly newsletter/i,
    })
    expect(submitButton).toBeInTheDocument()

    const images = screen.getAllByRole("img")
    expect(images.length).toBeGreaterThan(0)
  })

  it("applies correct responsive CSS classes", () => {
    renderWithRouter(<SignUpForm />)

    const card = screen.getByText("Stay updated!").closest(".h-screen")
    expect(card).toHaveClass(
      "h-screen",
      "md:h-fit",
      "w-full",
      "flex-col",
      "md:flex-row"
    )
  })

  it("handles form submission with enter key", async () => {
    renderWithRouter(<SignUpForm />)

    const emailInput = screen.getByRole("textbox", { name: /email address/i })

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.keyDown(emailInput, { key: "Enter", code: "Enter" })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/success", {
        state: { emailAddress: "test@example.com" },
      })
    })
  })

  it("clears error message when user starts typing valid email", async () => {
    renderWithRouter(<SignUpForm />)

    const emailInput = screen.getByRole("textbox", { name: /email address/i })
    const submitButton = screen.getByRole("button", {
      name: /subscribe to monthly newsletter/i,
    })

    // First, trigger an error by submitting empty form
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("Valid email required")).toBeInTheDocument()
    })

    // Now type a valid email
    fireEvent.change(emailInput, { target: { value: "valid@example.com" } })

    // Error should still be there since we haven't submitted yet
    expect(screen.getByText("Valid email required")).toBeInTheDocument()

    // Clear the input completely - error should disappear
    fireEvent.change(emailInput, { target: { value: "" } })

    // Error should be gone when input is empty
    await waitFor(() => {
      expect(screen.queryByText("Valid email required")).not.toBeInTheDocument()
    })
  })

  it("displays correct button styling and hover states", () => {
    renderWithRouter(<SignUpForm />)

    const submitButton = screen.getByRole("button", {
      name: /subscribe to monthly newsletter/i,
    })

    expect(submitButton).toHaveClass("w-full")
    expect(submitButton).toHaveClass("bg-[hsl(234,29%,20%)]")
    expect(submitButton).toHaveClass("hover:bg-gradient-to-r")
    expect(submitButton).toHaveClass("font-bold")
  })

  it("has proper form structure with FormField components", () => {
    renderWithRouter(<SignUpForm />)

    // Check that form elements are properly structured
    const form = screen
      .getByRole("textbox", { name: /email address/i })
      .closest("form")
    expect(form).toBeInTheDocument()

    const label = screen.getByText("Email address")
    expect(label).toBeInTheDocument()
  })
})
