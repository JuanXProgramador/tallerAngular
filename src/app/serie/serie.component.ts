import { Component, OnInit } from '@angular/core';
import { Serie } from "./serie";
import { SerieService } from './serie.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})



export class SerieComponent implements OnInit {

  series: Array<Serie> = [];

  promedio:number = 0; 

  seriesTable: HTMLElement = document.getElementById("series")!;

  constructor(private serieService: SerieService) { }

  getSeries(): void {
    this.serieService.getSeries().subscribe((series) => {
      this.series = series;
      this.promedio = this.promedioSeasons(series);
    });
  }

  ngOnInit(): void {
    this.getSeries();
  }

  ngAfterViewInit(): void{
    this.promedioSeasons(this.series);
  }

  promedioSeasons(series:Serie[]):number{
    let promedio:number = 0;
    let n:number = 0;
    for(let serie of series){
        promedio += serie.seasons;
        n++;
    }
    return (promedio/n);
  }  

}
