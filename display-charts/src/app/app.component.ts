import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  numbers: number[] = [];
  numbersTotal: number[] = [];
  limit = 10;

  chartOption: EChartsOption = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    combineLatest([
      this.http.get<number[]>('assets/results.json'),
      this.http.get<number[]>('assets/resultsTotal.json'),
    ]).subscribe(([v, vT]) => {
      this.numbers = v;
      this.numbersTotal = vT;
      this.updateChartOptions();
    });
  }

  changeLimit(event: Event) {
    this.limit = parseInt((event.target as HTMLInputElement).value);
    this.updateChartOptions();
  }

  private updateChartOptions() {
    this.chartOption = {
      xAxis: {
        type: 'category',
        data: this.generateNumbersArray(this.limit),
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      series: [
        {
          data: this.numbers.slice(0, this.limit),
          type: 'bar',
        },
        {
          data: this.numbersTotal.slice(0, this.limit),
          type: 'bar',
        },
      ],
    };
  }

  private generateNumbersArray(length: number): number[] {
    return Array(length)
      .fill(null)
      .map((_, i) => i + 1);
  }
}
