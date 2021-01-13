import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public chartCompany: any = null;
  public companyJoined: any = null;

  constructor(
    private Title: Title,
  ) { }

  ngOnInit(): void {
    this.Title.setTitle('TH | Home'); // Modificar el titulo del encabezado.
    this.createStatistics();
  }

  createStatistics(){
    this.chartCompany = new Chart('chartCompany', {
         // The type of chart we want to create
          type: 'doughnut',

          // The data for our dataset
          data: {
              labels: ['Vicman', 'Ciatran', 'Vicman Technologys'],
              datasets: [{
                  label: 'My First dataset',
                  backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 88, 132)', 'rgb(255, 10, 132)'],
                  borderColor: '#ccc',
                  data: [10, 10, 30]
              }]
          },

          // Configuration options go here
          options: {}
    });

    this.companyJoined = new Chart('companyJoined', {
        type: 'bar',
        data: {
          labels: ['Noviembre', 'Diciembre', 'Enero'],
          datasets: [{
            label: ['Personal ingresado'],
            data: [15, 20, 30],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 88, 132)', 'rgb(255, 10, 132)'],
          }]
        },
        options: {}
    });
  }

}
