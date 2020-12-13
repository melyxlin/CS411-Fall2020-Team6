import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import { act } from "react-dom/test-utils";

describe("Main Component", () => {
  it("renders the page", () => {
    const wrapper = render(<App />);
    expect(wrapper).toBeDefined();
  });

  it("displays an error when form is submitted without a language and message", async () => {
    // Finding submit button of Token Validation form.
    const { getByText, container } = render(<App />);
    const button = await waitFor(() => container.querySelector("Form"));

    // Clicking submit button.
    await waitFor(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Message Required.")).not.toBeNull();
    expect(getByText("Language Required.")).not.toBeNull();
  });

  it("displays an error when form is submitted without a language", async () => {
    // Finding submit button of Token Validation form.
    const { getByText, getByTestId, container } = render(<App />);
    const button = await waitFor(() => container.querySelector("Form"));
    const messageInput = await waitFor(() => getByTestId("message-field"));

    await waitFor(() => {
      fireEvent.change(messageInput, {
        target: {
          value: "Hello World",
        },
      });
    });

    // Clicking submit button.
    await waitFor(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Language Required.")).not.toBeNull();
  });

  it("displays an error when form is submitted without a message", async () => {
    // Finding submit button of Token Validation form.
    const { getByText, getByTestId, container } = render(<App />);
    const button = await waitFor(() => container.querySelector("Form"));
    const languageInput = await waitFor(() => getByTestId("language-field"));

    await waitFor(() => {
      fireEvent.change(languageInput, {
        target: {
          value: "en-es",
        },
      });
    });

    // Clicking submit button.
    await waitFor(() => {
      fireEvent.submit(button);
    });

    expect(getByText("Message Required.")).not.toBeNull();
  });

  it("displays the right number of characters when message is typed", async () => {
    // Finding submit button of Token Validation form.
    const { getByText, getByTestId, container } = render(<App />);
    const button = await waitFor(() => container.querySelector("Form"));
    const messageInput = await waitFor(() => getByTestId("message-field"));

    await waitFor(() => {
      fireEvent.change(messageInput, {
        target: {
          value: "Hello World",
        },
      });
    });

    // Clicking submit button.
    await act(async () => {
      fireEvent.submit(button);
    });

    expect(getByText("11/280")).not.toBeNull();
  });

  it("stops writing when the max number of characters is typed", async () => {
    // Finding submit button of Token Validation form.
    const { getByText, getByTestId, container } = render(<App />);
    const button = await waitFor(() => container.querySelector("Form"));
    const messageInput = await waitFor(() => getByTestId("message-field"));

    await waitFor(() => {
      fireEvent.change(messageInput, {
        target: {
          value: "a".repeat(290),
        },
      });
    });

    // Clicking submit button.
    await act(async () => {
      fireEvent.submit(button);
    });

    expect(getByText("280/280")).not.toBeNull();
  });
});
