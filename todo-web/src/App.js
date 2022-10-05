import "./App.css";
import React, { useState, useEffect } from "react";

import { Task } from "./components/Task";
import { Box, Center, Text, CheckboxGroup } from "@chakra-ui/react";

import axios from "axios";

export default function App() {
  const [tasks, setTasks] = useState([]);
  //非同期関数asyncでawaitキーワードを使用することでpromise(resolve, reject)の結果が返されるまで待機する
  const fetch = async () => {
    //axios.getでrailsとapi通信
    const res = await axios.get("http://localhost:3010/tasks");
    // console.log(res);
    setTasks(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  //toggle:on/off切り替えの意味
  const toggleIsDone = (index) => {
    // 一旦tasksを変数に入れることでsetTaskが機能するようにする
    const tasksCopy = [...tasks];
    const isDone = tasks[index].is_done;
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
                  isDone={task.is_done}
                  // 関数を渡す
                  toggleIsDone={toggleIsDone}
                />
              );
            })}
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
  );
}
