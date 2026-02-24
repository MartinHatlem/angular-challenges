import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      imageSource="assets/img/teacher.png"
      [addNewItem]="addNewTeacher"
      [deleteById]="deleteTeacher"
      [bgColor]="'rgba(250, 0, 0, 0.1)'" />
  `,
  styles: [],
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  store = inject(TeacherStore);

  teachers = this.store.teachers;

  addNewTeacher = () => {
    this.store.addOne(randTeacher());
  };
  deleteTeacher = (id: number) => {
    this.store.deleteOne(id);
  };
  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
}
