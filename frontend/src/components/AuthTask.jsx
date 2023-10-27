import { createContext, useContext, useState } from "react";


const TaskContext = createContext();

// Hook personalizado que permite a los componentes acceder al contexto de tareas.
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthComponent");
  return context;
};

// Proveedor de tareas que envuelve a los componentes y provee datos relacionados con las tareas.
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

    // Provee el listado de tareas a los componentes envueltos.
  return (
    <TaskContext.Provider
      value={{
        tasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
