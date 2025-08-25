// src/tests/components/StatusCards.test.js

import React from "react";
import { render, screen } from "@testing-library/react";
import StatusCards from "../../components/StatusCards";

// Mock Ant Design components to avoid undefined errors
jest.mock("antd", () => {
  const React = require("react");
  return {
    Card: (props) => <div {...props}>{props.children}</div>,
    Row: (props) => <div {...props}>{props.children}</div>,
    Col: (props) => <div {...props}>{props.children}</div>,
    Typography: {
      Title: (props) => <h1 {...props}>{props.children}</h1>,
    },
  };
});

describe("StatusCards Component", () => {
  const props = {
    totalOnRoad: 5,
    totalCompleted: 10,
    totalOnHold: 2,
  };

  it("renders the correct counts and labels", () => {
    render(<StatusCards {...props} />);
    expect(screen.getByText("5 On Road")).toBeInTheDocument();
    expect(screen.getByText("10 Completed")).toBeInTheDocument();
    expect(screen.getByText("2 On Hold")).toBeInTheDocument();
  });

  it("renders three cards", () => {
    render(<StatusCards {...props} />);
    const cards = screen.getAllByRole("heading"); // Title maps to h1 in mock
    expect(cards.length).toBe(3);
  });

  it("applies the correct background colors for each status", () => {
    render(<StatusCards {...props} />);
    
    const onRoadCard = screen.getByText("5 On Road").parentElement;
    const completedCard = screen.getByText("10 Completed").parentElement;
    const onHoldCard = screen.getByText("2 On Hold").parentElement;

    expect(onRoadCard).toHaveStyle("background: #ECDE7C");
    expect(completedCard).toHaveStyle("background: #7AC14D");
    expect(onHoldCard).toHaveStyle("background: #FE4C4A");
  });
});
