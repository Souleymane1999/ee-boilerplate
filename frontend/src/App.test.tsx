import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, status: 200 }),
    );
  });

  it("renders the boilerplate title", () => {
    render(<App />);
    expect(screen.getByText("EE Boilerplate")).toBeInTheDocument();
  });

  it("shows a loading status before the health check resolves", () => {
    render(<App />);
    expect(screen.getByText("Vérification...")).toBeInTheDocument();
  });

  it("shows the backend as available once the health check succeeds", async () => {
    render(<App />);
    expect(await screen.findByText("Backend disponible")).toBeInTheDocument();
  });
});
