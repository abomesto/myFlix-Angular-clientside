import { Component, OnInit, Input } from '@angular/core';
// This import is used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {

  @Input() loginData = {Username: '', Password: ''}

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }
    

    ngOnInit(): void {
        
    }

  /**
   * updates user's information and refreshes user info
   * @param userData
   * @returns the user's information
   * @returns the user's token
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe((result) => {
      // Successfully login done
      localStorage.setItem('Username', JSON.stringify(result.Username));
      localStorage.setItem('token', result.token);
      localStorage.setItem('Username', result.user.Username);
      localStorage.setItem('ID', result.user._id);
      // Logic for a successful user login goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result);
      this.snackBar.open('Logged in', 'OK', {
        duration: 2000
      });
     this.router.navigate(["movies"])
    }, (error) => {
      this.snackBar.open(error, 'OK', {
        duration: 2000
      });
    });
  }

}
