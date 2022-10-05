import "./App.css";
import React, { useState, useEffect } from "react";

import { Task } from "./components/Task";
import { Box, Center, Text, CheckboxGroup } from "@chakra-ui/react";

export default function App() {
  const initialTasks = [
    { name: "買い物", isDone: true },
    { name: "ランニング", isDone: false },
    { name: "プログラミングの勉強", isDone: false },
  ];

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(initialTasks);
  }, []);

  //toggle:on/off切り替えの意味
  const toggleIsDone = (index) => {
    // 一旦tasksを変数に入れることでsetTaskが機能するようにする
    const tasksCopy = [...tasks];
    const isDone = tasksCopy[index].isDone;
    tasksCopy[index].isDone = !isDone;
    setTasks(tasksCopy);
  };

  return (
    <Box mt="64px">
      <Center>
        <Box>
          <Box mb="24px">
            <Text fontSize="24px" fontWeight="bold">
              タスク一覧
            </Text>
          </Box>
          <CheckboxGroup>
            {tasks.map((task, index) => {
              return (
                <Task
                  key={index}
                  index={index}
                  name={task.name}
                  isDone={task.isDone}
                  // 関数を渡す
                  toggleIsDone={toggleIsDone}
                ></Task>
              );
            })}
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
  );
}
