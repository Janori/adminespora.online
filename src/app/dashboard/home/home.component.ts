import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import {TdDataTableService} from '@covalent/core';
import {ResizeService} from '../../resize/resize.service';
import {routerAnimation} from '../../utils/page.animation';
import {AREA_CHART_OPTION, AREA_CHART_WITH_LINE_OPTION, DOUGHNUT_OPTION, INIDICATOR_ITEMS} from './chart-models';
import {CHART_TEXT_COLOR, MAT_DEEP_ORANGE, MAT_LIGHT_BLUE} from '../../utils/colors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routerAnimation]
})
export class HomeComponent implements OnInit , OnDestroy {
  // Add router animation
  @HostBinding('@routerAnimation') routerAnimation = true;
  // Chart instances used for resizing after layout changes
  chartInstances = [];
  // Subscription for resizing events
  resizeSubscription;
  // Are chart model
  areaChartOption;
  // Are chart with line model
  areaChartWithLineOption;
  // Menu options
  menuItems = [
    {text: 'Refresh'},
    {text: 'Settings'},
    {text: 'Help'}
  ];
  // Model for doughnut chart
  doughnutOption;
  // Project list items

  quickActions = [
    'Crear Usuario',
    'Crear Propietario',
    'Crear Inmueble',
    'Crear Arrendatario'
  ];

  simpleBarChartOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Bar 1', 'Bar 2'],
      bottom: 0,
      textStyle: {
        color: CHART_TEXT_COLOR
      }
    },
    toolbox: {
      show: true,
      feature: {
        magicType: {
          show: true,
          type: ['line', 'bar'],
          title: {
            line: 'Line',
            bar: 'Bar',
            textStyle: {
              color: CHART_TEXT_COLOR
            }
          }
        },
        saveAsImage: {
          show: true,
          title: 'Save',
          textStyle: {
            color: CHART_TEXT_COLOR
          }
        }
      }
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        axisLabel: {
          textStyle: {
            color: CHART_TEXT_COLOR
          }
        },
        axisTicks: {
          lineStyle: {
            color: CHART_TEXT_COLOR
          }
        },
        axisLine: {
          lineStyle: {
            color: CHART_TEXT_COLOR
          }
        }
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          textStyle: {
            color: CHART_TEXT_COLOR
          }
        },
        axisTicks: {
          lineStyle: {
            color: CHART_TEXT_COLOR
          }
        },
        axisLine: {
          lineStyle: {
            color: CHART_TEXT_COLOR
          }
        }
      }
    ],
    series: [
      {
        name: 'Bar 1',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        markPoint: {
          data: [
            {type: 'max', name: 'Max'},
            {type: 'min', name: 'Min'}
          ]
        },
        markLine: {
          data: [
            {type: 'average', name: 'Average'}
          ]
        },
        itemStyle: {
          normal: {
            color: MAT_LIGHT_BLUE._500
          }
        }
      },
      {
        name: 'Bar 2',
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        markPoint: {
          data: [
            {name: 'Mark 1', value: 182.2, xAxis: 7, yAxis: 183},
            {name: 'Mark 2', value: 2.3, xAxis: 11, yAxis: 3}
          ]
        },
        markLine: {
          data: [
            {type: 'average', name: '平均值'}
          ]
        },
        itemStyle: {
          normal: {
            color: MAT_DEEP_ORANGE._500
          }
        }
      }
    ]
  };

  arrendatariosDeudores = [
      {
          id: Math.floor((Math.random() * 1000) + 1),
          nombre: 'Jonathan Anaya',
          fecha: '2017-09-21'
      },
      {
          id: Math.floor((Math.random() * 1000) + 1),
          nombre: 'John Doe',
          fecha: '2017-09-20'
      },
      {
          id: Math.floor((Math.random() * 1000) + 1),
          nombre: 'John Doe',
          fecha: '2017-09-20'
      },  {
            id: Math.floor((Math.random() * 1000) + 1),
            nombre: 'John Doe',
            fecha: '2017-09-20'
        },  {
              id: Math.floor((Math.random() * 1000) + 1),
              nombre: 'John Doe',
              fecha: '2017-09-20'
          },
  ];

  // Items for card with linecharts
  indicatorItems = [];
  // Rating list items
  ratingItems = [
    {
      avatar: '/assets/avatars-img/4040.png',
      name: 'Marian Cannon',
      tag: '@mariancannon',
      value: 81.48
    },
    {
      avatar: '/assets/avatars-img/4040.png',
      name: 'John Lynch',
      tag: '@johnlynch',
      value: 68
    },
    {
      avatar: '/assets/avatars-img/4040.png',
      name: 'Isabella Watts',
      tag: '@isabellawatts',
      value: 36
    }
  ];
  // To do items
  todoItems = [
    {
      title: 'Sections 1.10.32',
      text: 'It is a long established fact',
      done: false
    },
    {
      title: 'It has roots',
      text: 'Many desktop publishing ',
      done: false
    },
    {
      title: 'Richard McClintock',
      text: 'Aldus PageMaker',
      done: false
    }
  ];
  doneItems = [
    {
      title: 'The first line of Lorem Ipsum',
      text: 'It has survived not only five centuries',
      done: true
    }
  ];

  constructor(private dataTableService: TdDataTableService, private resizeService: ResizeService) {
    this.resizeSubscription = resizeService.resizeInformer$.subscribe(
      () => this.chartInstances.forEach((chart) => chart.resize())
    );
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.areaChartOption = AREA_CHART_OPTION;
      this.areaChartWithLineOption = AREA_CHART_WITH_LINE_OPTION;
      this.doughnutOption = DOUGHNUT_OPTION;
      this.indicatorItems = INIDICATOR_ITEMS;
    }, 0);
  }

  ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
  }

  getAnimatedBarData() {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }
    return data;
  }
}
