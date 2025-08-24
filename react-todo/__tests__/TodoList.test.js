// src/__tests__/TodoList.test.js - Comprehensive test suite
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../TodoList";

describe("TodoList Component", () => {
  // Test 1: Initial render
  test("renders TodoList component with initial todos", () => {
    render(<TodoList />);
    
    // Check title
    expect(screen.getByRole("heading", { name: /todo list/i })).toBeInTheDocument();
    
    // Check initial todos
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    
    // Check form elements
    expect(screen.getByPlaceholderText("Add a new todo")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  // Test 2: Adding a new todo
  test("can add a new todo", async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a new todo");
    const button = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("New Todo")).toBeInTheDocument();
    });
    
    // Input should be cleared after adding
    expect(input.value).toBe("");
  });

  // Test 3: Adding todo with form submission (Enter key)
  test("can add a new todo by pressing Enter", async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a new todo");

    fireEvent.change(input, { target: { value: "Todo via Enter" } });
    fireEvent.submit(input.closest('form'));

    await waitFor(() => {
      expect(screen.getByText("Todo via Enter")).toBeInTheDocument();
    });
  });

  // Test 4: Prevent adding empty todos
  test("does not add empty or whitespace-only todos", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a new todo");
    const button = screen.getByText("Add");
    
    // Try empty string
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);
    
    // Should still have only 2 initial todos
    expect(screen.getAllByText("Delete")).toHaveLength(2);
    
    // Try whitespace only
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(button);
    
    // Should still have only 2 initial todos
    expect(screen.getAllByText("Delete")).toHaveLength(2);
  });

  // Test 5: Toggling todo completion
  test("can toggle a todo completion status", async () => {
    render(<TodoList />);
    const todoItem = screen.getByText("Learn React");

    // Initially should not be completed
    expect(todoItem.closest('li')).toHaveStyle("text-decoration: none");

    // Click to toggle
    fireEvent.click(todoItem);

    // Should now be completed
    await waitFor(() => {
      expect(todoItem.closest('li')).toHaveStyle("text-decoration: line-through");
    });

    // Click again to toggle back
    fireEvent.click(todoItem);

    // Should not be completed again
    await waitFor(() => {
      expect(todoItem.closest('li')).toHaveStyle("text-decoration: none");
    });
  });

  // Test 6: Deleting a todo
  test("can delete a todo", async () => {
    render(<TodoList />);
    const todoItem = screen.getByText("Learn React");
    const deleteButtons = screen.getAllByText("Delete");
    const deleteButton = deleteButtons[0]; // First delete button

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(todoItem).not.toBeInTheDocument();
    });
    
    // Should have one less delete button
    expect(screen.getAllByText("Delete")).toHaveLength(1);
  });

  // Test 7: Delete button doesn't trigger toggle
  test("delete button click does not toggle todo", async () => {
    render(<TodoList />);
    const todoItem = screen.getByText("Learn React");
    const deleteButton = screen.getAllByText("Delete")[0];

    // Click delete button
    fireEvent.click(deleteButton);

    // Todo should be deleted, not toggled
    await waitFor(() => {
      expect(todoItem).not.toBeInTheDocument();
    });
  });

  // Test 8: Empty state
  test("shows empty message when all todos are deleted", async () => {
    render(<TodoList />);
    const deleteButtons = screen.getAllByText("Delete");

    // Delete all todos
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => {
      expect(screen.getAllByText("Delete")).toHaveLength(1);
    });

    fireEvent.click(screen.getByText("Delete"));
    
    await waitFor(() => {
      expect(screen.getByTestId("empty-message")).toBeInTheDocument();
      expect(screen.getByText("No todos yet. Add one above!")).toBeInTheDocument();
    });
  });

  // Test 9: Multiple todos can be added
  test("can add multiple todos", async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a new todo");
    const button = screen.getByText("Add");

    // Add first todo
    fireEvent.change(input, { target: { value: "First new todo" } });
    fireEvent.click(button);

    // Add second todo
    fireEvent.change(input, { target: { value: "Second new todo" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("First new todo")).toBeInTheDocument();
      expect(screen.getByText("Second new todo")).toBeInTheDocument();
    });

    // Should have 4 todos total (2 initial + 2 new)
    expect(screen.getAllByText("Delete")).toHaveLength(4);
  });

  // Test 10: Input trims whitespace
  test("trims whitespace from todo text", async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a new todo");
    const button = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "  Todo with spaces  " } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Todo with spaces")).toBeInTheDocument();
    });
  });

  // Test 11: Integration test - complete workflow
  test("complete workflow: add, toggle, and delete todo", async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a new todo");
    const button = screen.getByText("Add");

    // Add a todo
    fireEvent.change(input, { target: { value: "Workflow test todo" } });
    fireEvent.click(button);

    // Wait for todo to be added
    await waitFor(() => {
      expect(screen.getByText("Workflow test todo")).toBeInTheDocument();
    });

    const newTodo = screen.getByText("Workflow test todo");

    // Toggle it to completed
    fireEvent.click(newTodo);

    await waitFor(() => {
      expect(newTodo.closest('li')).toHaveStyle("text-decoration: line-through");
    });

    // Delete it
    const deleteButtons = screen.getAllByText("Delete");
    const todoDeleteButton = deleteButtons.find(button => 
      button.closest('li').textContent.includes("Workflow test todo")
    );
    
    fireEvent.click(todoDeleteButton);

    await waitFor(() => {
      expect(screen.queryByText("Workflow test todo")).not.toBeInTheDocument();
    });
  });
});