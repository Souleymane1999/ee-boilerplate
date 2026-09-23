import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, status: 200 }),
    );
  });

  it("shows the login page when no user is authenticated", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Connexion" }),
    ).toBeInTheDocument();
  });
});
