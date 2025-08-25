import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GoBackButton from "../../components/GoBackButton";


describe("GoBackButton Component", () => {
  test("renders button text", () => {
    render(<GoBackButton onClick={jest.fn()} />);
    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<GoBackButton onClick={handleClick} />);
    fireEvent.click(screen.getByText("Go Back"));
    expect(handleClick).toHaveBeenCalled();
  });
});
