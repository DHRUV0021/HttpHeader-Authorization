import { Component, OnInit } from '@angular/core';
import { CrudsService, Header } from '../cruds.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  Task!: Header;

  allData: Array<Header> = new Array<Header>();
  toggaleButton: boolean = false;

  constructor(private data: CrudsService) { }
  ngOnInit(): void {
    this.Task = new Header;
    this.getData();
  }
//================GET METHOD================//
  getData() {
    this.data.getTask().subscribe({
      next: (res: any) => {
        this.allData = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("successfuly");
      }
    })
  }

//================POST METHOD================//
  addData() {
    this.data.addTask(this.Task).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getData();
      },
      error: (err) => {
        console.log(err);
        switch (err.status) {
          case 401:
            console.log(" unauthorized");
            break;
          case 404:
            console.log(" not found");
            break;
          case 400:
            console.log(" bed request");
            break;
        }
      },
    })
  }

//================DELETE METHOD================//
  deleteData(data: Header) {
    this.data.deleteTask(data.id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toggaleButton = false;
        this.getData();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("delete");
      }
    })
  }

//================EDIT METHODS================//
  fillData(data: Header) {
    this.Task = data;
    this.toggaleButton = true;
  }

  updateData() {
    this.data.editTask(this.Task).subscribe({
      next: (res) => {
        console.log(res);
        this.toggaleButton = false;
        this.getData();
        this.Task = new Header;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
};
