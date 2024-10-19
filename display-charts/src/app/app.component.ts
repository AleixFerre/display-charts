import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import results from './results.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgxEchartsDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [provideEcharts()],
})
export class AppComponent {
  numbers: number[] = results;

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: this.numbers,
        type: 'bar',
      },
    ],
  };
}
