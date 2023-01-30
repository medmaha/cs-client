const { render, screen } = require("@testing-library/react")
const { default: Login } = require("../Login")

test("testing login route", async () => {
    render(<Login />)
    await screen.findByRole("button")
})
