import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  numbers: number[] = [];
  limit = 10;

  chartOption: EChartsOption = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<number[]>('assets/results.json').subscribe((v) => {
      this.numbers = v;
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
      series: [
        {
          data: this.numbers.slice(0, this.limit),
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
