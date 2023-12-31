import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}
  /**
   * registers user and refreshes page
   * @param userData
   */
registerUser(): void {
  this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
// Logic for a successful user registration goes here! (To be implemented)
   this.dialogRef.close(); // This will close the modal on success!
   this.snackBar.open("Successfully Registered!", 'OK', {
      duration: 2000
   });
  }, (error) => {
    console.log(error);
    this.snackBar.open(error, 'OK', {
      duration: 2000
    });
  });
}

}
