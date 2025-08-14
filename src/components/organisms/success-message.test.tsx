import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { vi, describe, it, expect, beforeEach } from "vitest"
import SuccessMessage from "./success-message"

// Create mock functions
const mockNavigate = vi.fn()
const mockUseLocation = vi.fn()

// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockUseLocation(),
  }
})

// Mock the pages utility
vi.mock("@/utils/pages", () => ({
  default: {
    get: vi.fn().mockReturnValue({ path: "/" }),
  },
}))

// Mock the success icon
vi.mock("@/assets/images/icon-success.svg", () => ({
  default: "mocked-success-icon.svg",
}))

const renderWithRouter = (
  component: React.ReactElement,
  locationState = {}
) => {
  mockUseLocation.mockReturnValue({
    state: locationState,
  })

  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe("SuccessMessage", () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    mockUseLocation.mockClear()
    vi.clearAllMocks()
  })

  it("renders the success message component", () => {
    renderWithRouter(<SuccessMessage />)

    expect(screen.getByText("Thanks for subscribing!")).toBeInTheDocument()
    expect(screen.getByText("Dismiss message")).toBeInTheDocument()
  })

  it("displays the success icon", () => {
    renderWithRouter(<SuccessMessage />)

    const successIcon = screen.getByAltText("Success Icon")
    expect(successIcon).toBeInTheDocument()
    expect(successIcon).toHaveAttribute("src", "mocked-success-icon.svg")
  })

  it("displays the default email when no email is provided in location state", () => {
    renderWithRouter(<SuccessMessage />)

    expect(
      screen.getByText(/A confirmation email has been sent to/)
    ).toBeInTheDocument()
    expect(screen.getByText("test@example.com")).toBeInTheDocument()
  })

  it("displays the provided email from location state", () => {
    const testEmail = "user@example.com"
    renderWithRouter(<SuccessMessage />, { emailAddress: testEmail })

    expect(
      screen.getByText(/A confirmation email has been sent to/)
    ).toBeInTheDocument()
    expect(screen.getByText(testEmail)).toBeInTheDocument()
  })

  it("displays the complete confirmation message", () => {
    const testEmail = "user@test.com"
    renderWithRouter(<SuccessMessage />, { emailAddress: testEmail })

    const confirmationText = screen.getByText(
      /Please open it and click the button inside to confirm your subscription/
    )
    expect(confirmationText).toBeInTheDocument()
  })

  it("calls navigate when dismiss button is clicked", () => {
    renderWithRouter(<SuccessMessage />)

    const dismissButton = screen.getByRole("button", {
      name: /dismiss message/i,
    })
    fireEvent.click(dismissButton)

    expect(mockNavigate).toHaveBeenCalledTimes(1)
  })

  it("navigates to home page when dismiss button is clicked", () => {
    renderWithRouter(<SuccessMessage />)

    const dismissButton = screen.getByRole("button", {
      name: /dismiss message/i,
    })
    fireEvent.click(dismissButton)

    expect(mockNavigate).toHaveBeenCalledWith("/")
  })

  it("has proper accessibility attributes", () => {
    renderWithRouter(<SuccessMessage />)

    const title = screen.getByTestId("success-title")
    expect(title).toBeInTheDocument()

    const button = screen.getByRole("button", { name: /dismiss message/i })
    expect(button).toBeInTheDocument()

    const image = screen.getByRole("img", { name: /success icon/i })
    expect(image).toBeInTheDocument()
  })

  it("applies correct CSS classes for responsive design", () => {
    renderWithRouter(<SuccessMessage />)

    const card = screen
      .getByText("Thanks for subscribing!")
      .closest(".h-screen")
    expect(card).toHaveClass("h-screen", "w-full", "md:h-fit", "md:w-[400px]")
  })

  it("renders with proper card structure", () => {
    renderWithRouter(<SuccessMessage />)

    // Check if CardHeader, CardContent, and CardTitle are present
    expect(screen.getByText("Thanks for subscribing!")).toBeInTheDocument()
    expect(
      screen.getByText(/A confirmation email has been sent to/)
    ).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("handles empty location state gracefully", () => {
    renderWithRouter(<SuccessMessage />, undefined)

    expect(screen.getByText("Thanks for subscribing!")).toBeInTheDocument()
    expect(screen.getByText("test@example.com")).toBeInTheDocument()
  })

  it("email address is displayed in bold", () => {
    const testEmail = "bold@example.com"
    renderWithRouter(<SuccessMessage />, { emailAddress: testEmail })

    const emailElement = screen.getByText(testEmail)
    expect(emailElement).toHaveClass("font-bold")
  })
})
