import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';

import {TodoService} from "../../providers/todo/todo";
import { ArchivedTodosPage } from '../archived-todos/archived-todos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];
  public reorderIsEnabled = false;
  // This is for other way to navigate
  // public archiveTodosPage = ArchivedTodosPage;


  constructor(
    private todoService: TodoService,
    public navCtrl: NavController,
    private alertController: AlertController,
    private toastController: ToastController) {
      this.todos = this.todoService.getTodos();
  }

  //For button delete
  archiveTodo(todoIndex) {
    this.todoService.archiveTodo(todoIndex);
  }

  // Go to Archive Page
  goToArchivePage() {
    this.navCtrl.push(ArchivedTodosPage);
  }

  // To togle Reoder value
  toggleReoder(){
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  // To reorder the position of todos inside the array
  itemReorder($event) {
    reorderArray(this.todos, $event);
  }

  // To Add Todos
  openTodoAlert() {
    let addTodoAlert = this.alertController.create({
      title: "Add A Todo",
      message: "Enter Your Todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Todo",
          handler: (inputData)=> {
            let todoText;
            todoText = inputData.addTodoInput;
            this.todoService.addTodo(todoText);

            // Toast Alert Display
            addTodoAlert.onDidDismiss(()=> {
              let addTodoToast = this.toastController.create({
                message: "Todo Added",
                duration: 2000
              });
                addTodoToast.present();
            });

          }
        }
      ]
    });
     addTodoAlert.present();
   }

   editTodo(todoIndex) {
     let editTodoAlert = this.alertController.create({
       title: "Edit A Todo",
       message: "Enter Your Todo",
       inputs: [
         {
           type: "text",
           name: "editTodoInput",
           value: this.todos[todoIndex]
         }
       ],
       buttons: [
         {
           text: "Cancel"
         },
         {
           text: "Edit Todo",
           handler: (inputData)=> {
             let todoText;
             todoText = inputData.editTodoInput;
             this.todoService.editTodo(todoText, todoIndex);

             // Toast Alert Display
             editTodoAlert.onDidDismiss(()=> {
               let editTodoToast = this.toastController.create({
                 message: "Todo Edited",
                 duration: 2000
               });
                 editTodoToast.present();
             });

           }
         }
       ]
     });
      editTodoAlert.present();
    }
}
