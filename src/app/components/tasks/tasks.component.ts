import { Component, OnInit } from '@angular/core';

import { Task } from 'src/app/Task';

import { TaskService } from 'src/app/services/task.service'; // services

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks)); // get task
  }

  deleteTask(task: Task) {
    // delete task
    this.taskService.deleteSetTask(task).subscribe((): Task[] => {
      //deleteSetTask => comes from services function made

      return (this.tasks = this.tasks.filter((t) => t.id !== task.id));
    });
  }

  toggleTaskReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskStatus(task).subscribe(); //updateTaskSatus => comes from services function made
  }

  addTask(task: Task) {
    this.taskService
      .addNewTask(task)
      .subscribe((task) => this.tasks.push(task));
  }
}
