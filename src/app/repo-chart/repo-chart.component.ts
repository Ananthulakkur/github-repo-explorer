import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-repo-chart',
  templateUrl: './repo-chart.component.html',
  styleUrls: ['./repo-chart.component.scss']
})
export class RepoChartComponent implements OnInit {
  @Input() selectedRepo: any; 
  private svg: any; 
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };
  private width = 960 - this.margin.left - this.margin.right;
  private height = 500 - this.margin.top - this.margin.bottom;

  constructor() { }

  ngOnInit(): void {
    this.createBarChart();
  }

  private createBarChart() {
    if (this.svg) {
      this.svg.remove(); 
    }

    this.svg = d3.select('svg#repo-chart')
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const data = [this.selectedRepo];

    const xScale = d3.scaleBand()
      .range([0, this.width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .range([this.height, 0]);

    xScale.domain(data.map(repo => repo.name));
    yScale.domain([0, d3.max(data, (repo) => repo.stargazerCount)]);

    this.svg.append('g')
      .attr('transform', `translate(0,${this.height})`)
      .call(d3.axisBottom(xScale));

    this.svg.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - this.margin.left)
      .attr('x', 0 - (this.height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Stars');

    this.svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (repo) => xScale(repo.name))
      .attr('y', (repo) => yScale(repo.stargazerCount))
      .attr('width', xScale.bandwidth())
      .attr('height', (repo) => this.height - yScale(repo.stargazerCount));
  }
}