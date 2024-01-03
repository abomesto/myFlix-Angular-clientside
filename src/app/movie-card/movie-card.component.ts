import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  favorites: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }


  /**
   * opens dialog with movie director details
   * @param name
   * @param bio
   * @returns director dialog with name and bio
   *
   */
  openDirectorDialog(director: any): void {
   this.dialog.open(MovieDetailsComponent, {
      data: {
        title: director.name,
        content: director.birthdate,
      },
    });

  }

  /**
   * opens dialog with movie genre details
   * @param name
   * @param description
   * @returns genre dialog with name and description
   *
   */
  openGenreDialog(genre: any): void {
     this.dialog.open(MovieDetailsComponent, {
      data: {
        title: genre.name,
        content: genre.description,
      },
    });
  
  }

  /**
   * opens dialog with movie synopsis
   * @param description
   * @returns synopsis dialog with movie description
   *
   */
  openSynopsisDialog(movie: any): void {
  this.dialog.open(MovieDetailsComponent, {
      data: {
        title: 'Synopsis',
        content: movie.summary,
      },
    });
  }

}