import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [MessageService],
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: '' +
          'Message sent successfully \n' +
          'Name: ' + this.contactForm.value.name + '\n' +
          'Email: ' + this.contactForm.value.email + '\n' +
          'Message: ' + this.contactForm.value.message,
      });
      this.contactForm.reset();
    }
  }
}
