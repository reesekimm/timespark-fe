import { render, screen } from "../../utils/rtl-utils";
import { Message } from ".";

describe("Message", () => {
  it("render properly", () => {
    render(<Message message="hi" />);
    expect(screen.getByText("hi")).toBeInTheDocument();
  });
});
