import "./App.css";
import React, { useState, useEffect } from "react";

import { Task } from "./components/Task";
import {
  Box,
  Center,
  Text,
  CheckboxGroup,
  Flex,
  Input,
  Button,
} from "@chakra-ui/react";

import axios from "axios";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  //非同期関数asyncでawaitキーワードを使用することでpromise(resolve, reject)の結果が返されるまで待機する

  const fetch = async () => {
    //axios.getでrailsとapi通信
    const res = await axios.get("http://localhost:3010/tasks");
    setTasks(res.data);
  };

  const createTask = async () => {
    await axios.post("http://localhost:3010/tasks", {
      name: name,
      is_done: false,
    });
    //input値をリセット
    setName("");
    //タスクの再取得
    fetch();
  };

  const destroyTask = async (id) => {
    await axios.delete(`http://localhost:3010/tasks/${id}`);
    fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  //toggle:on/off切り替えの意味
  const toggleIsDone = async (id, index) => {
    // 一旦tasksを変数に入れることでsetTaskが機能するようにする
    // const tasksCopy = [...tasks];
    const isDone = tasks[index].is_done;
    // tasksCopy[index].isDone = !isDone;
    // setTasks(tasksCopy);
    await axios.put(`http://localhost:3010/tasks/${id}`, {
      is_done: !isDone,
    });
    fetch();
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

          <Flex mb="24px">
            <Input
              placeholder="タスク名を入力"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Box ml="16px">
              <Button colorScheme="teal" onClick={createTask}>
                タスクを作成
              </Button>
            </Box>
          </Flex>

          <CheckboxGroup>
            {tasks.map((task, index) => {
              return (
                <Task
                  id={task.id}
                  index={index}
                  name={task.name}
                  isDone={task.is_done}
                  // 関数を渡す
                  toggleIsDone={toggleIsDone}
                  destroyTask={destroyTask}
                />
              );
            })}
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
  );
}
