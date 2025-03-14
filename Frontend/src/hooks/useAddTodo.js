import { useState } from "react";
import {
  CustomSuccessAlert,
  CustomErrorAlert,
  defaultTodo,
} from "../utils/general.js";

const useAddTodos = (fetchTodos, page, limit, setNewTodo) => {
  const [isLoading, setIsLoading] = useState(false);

  const addTodo = async (todo) => {
    console.log("Sending request to add todo..."); // Debugging
  
    try {
      setIsLoading(true);
      const controller = new AbortController(); // Create an abort signal
      const timeoutId = setTimeout(() => controller.abort(), 5000); // Set a 5-second timeout
  
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/todos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todo),
          signal: controller.signal, // Attach signal to request
        }
      );
  
      clearTimeout(timeoutId); // Clear timeout if request succeeds
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      console.log("Todo added successfully!");
      await fetchTodos(page, limit);
      setNewTodo(defaultTodo);
      CustomSuccessAlert("New Todo added successfully");
    } catch (error) {
      console.error("Error adding todo:", error);
      CustomErrorAlert(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return { addTodo, isAddingTodo: isLoading };
};

export default useAddTodos;
