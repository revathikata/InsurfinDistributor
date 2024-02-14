import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent{
  selected: Date; // Holds the selected date
  maxDate: Date; // Maximum selectable date
  minDate: Date; // Minimum selectable date
  date!: Date 

  constructor(private dialog: MatDialog,  private dialogRef: MatDialogRef<DatePickerComponent>,
    @Inject(MAT_DIALOG_DATA) data:string){
      // this.selected = data
      this.maxDate = new Date();
      this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  
      // Calculate the minimum birth date (120 years ago from today)
      this.minDate = new Date();
      this.minDate.setFullYear(this.minDate.getFullYear() - 100);
    }
    
    ngOnInit(): void {
    // this.maxDate=new Date()
    // this.maxDate.setMonth(this.maxDate.getMonth() -12 * 18)
    // this.maxDate.setFullYear(this.maxDate.getFullYear() -3 * 1)
    }
    add(){
     const dd = this.selected.getDate().toString().padStart(2, "0");
    //  const mm = +this.selected.getMonth().toString().padStart(2, "0") +1;
    const mm = ("0" + (this.selected.getMonth() + 1)).slice(-2);
     const yyyy = this.selected.getFullYear();
    //  console.log(dd, mm, yyyy);
    const value = `${dd}/${mm}/${yyyy}`;
      this.dialogRef.close(value);
  
      
}


cancel(){
  this.dialog.closeAll()

}
}
