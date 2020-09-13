import { Component, Input, OnInit } from '@angular/core';

import { TodoGeneric } from '../../core/services/canvas/user/user';

@Component({
  selector: 'home-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todo: TodoGeneric;

  constructor() { }

  async ngOnInit(): Promise<void> { 
  }

}
