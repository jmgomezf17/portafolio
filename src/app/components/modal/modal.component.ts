import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../service/data-api.service';
import { BookInterface } from '../../models/book';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid: string;

  constructor(private dataApiService: DataApiService) { }

  ngOnInit() {
  }

  onSaveBook(bookForm: NgForm): void{
//    console.log('boksss', bookForm.value);
    if( bookForm.value.id === null ){
      bookForm.value.userUid = this.userUid;
      this.dataApiService.addBooks(bookForm.value);
    }else{
      this.dataApiService.updateBooks(bookForm.value);
    }
    bookForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}
