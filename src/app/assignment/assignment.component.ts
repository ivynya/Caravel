import { Component, OnInit } from '@angular/core';
import { Assignment } from 'app/core/schemas';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  assignment: Assignment;

  constructor() { }

  ngOnInit(): void { 
    
  }

}
