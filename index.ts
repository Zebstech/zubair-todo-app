#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todos: string[] = [];
let condition = true;

console.log(
  chalk.greenBright.bold(
    "\n \t Welcome to CodeWith Zubair Todo-List Application\n"
  )
);
let main = async () => {
  while (condition) {
    let option = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "select an option you want todo",
        choices: [
          "add task",
          "delete task",
          "update task",
          "view todos",
          "exit",
        ],
      },
    ]);
    if (option.choice === "add task") {
      await addTask();
    }
    if (option.choice === "delete task") {
      await deleteTask();
    }
    if (option.choice === "update task") {
      await updateTask();
    } else if (option.choice === "view todos") {
      await viewTask();
    } else if (option.choice === "exit") {
      condition = false;
    }
  }
};
let addTask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: "enter your new task",
    },
  ]);
  todos.push(newTask.task);
  console.log(`\n ${newTask.task}task added successfully  in todos`);
};

// function to view all to todo list task
let viewTask = () => {
  console.log("\n your Todo List: \n");
  todos.forEach((task, index) => {
    console.log(`${index + 1}: ${task}`);
  });
};
// function to delete a task from the list
let deleteTask = async () => {
  await viewTask();
  let taskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "enter the 'index no.' of the task you want to delete:",
    },
  ]);
  let deleteTask = todos.splice(taskIndex.index_1, 1);
  console.log(
    `\n ${deleteTask}this task has been deleted successfully from your todo list\n`
  );
};
// funtion to update task
let updateTask = async () => {
  await viewTask();
  let update_task_update = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "enter the 'index no.'of the task you want to update",
    },
    {
      name: "new_task",
      type: "input",
      message: "enter the new task name",
    },
  ]);
  todos[update_task_update.index - 1] = update_task_update.new_task;
  console.log(
    `\n task at index no. ${
      update_task_update.index - 1
    } updated to successfully [for updated list check option: 'view todo list']`
  );
};

main();
