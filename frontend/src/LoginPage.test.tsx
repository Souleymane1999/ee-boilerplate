import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("logs in successfully and calls onLoginSuccess with the user", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({ Authorization: "Bearer test-token" }),
        json: async () => ({ user: { id: 1, email: "test@example.com" } }),
      }),
    );
    const onLoginSuccess = vi.fn();

    render(<LoginPage onLoginSuccess={onLoginSuccess} />);
    await userEvent.type(
      screen.getByLabelText("Adresse email"),
      "test@example.com",
    );
    await userEvent.type(screen.getByLabelText("Mot de passe"), "password123");
    await userEvent.click(screen.getByRole("button", { name: /connecter/i }));

    await waitFor(() => {
      expect(onLoginSuccess).toHaveBeenCalledWith({
        id: 1,
        email: "test@example.com",
      });
    });
    expect(localStorage.getItem("auth_token")).toBe("Bearer test-token");
  });

  it("shows an error message on invalid credentials", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        headers: new Headers(),
      }),
    );

    render(<LoginPage onLoginSuccess={vi.fn()} />);
    await userEvent.type(
      screen.getByLabelText("Adresse email"),
      "test@example.com",
    );
    await userEvent.type(screen.getByLabelText("Mot de passe"), "wrong");
    await userEvent.click(screen.getByRole("button", { name: /connecter/i }));

    expect(
      await screen.findByText("Email ou mot de passe incorrect."),
    ).toBeInTheDocument();
  });
});
