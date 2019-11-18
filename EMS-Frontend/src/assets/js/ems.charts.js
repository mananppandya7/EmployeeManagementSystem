function bindCharts(chartData) {

  var Department = [];
  var EmployeeCount = [];

  chartData.forEach(x => {

    x.department = (x.department == "Information Technology") ? "IT" : (x.department == "Human Resource") ? "HR" : "Finance";

    Department.push(x.department);
    EmployeeCount.push(x.employeeCount);
  });


  // ------------------------------------------------------- //
  // Line Chart
  // ------------------------------------------------------ //

  new Chart('line_chart', {
    type: 'line',
    data: {
      labels: Department,
      datasets: [{
        data: EmployeeCount,
        backgroundColor: "red",
        borderColor: '#3cb371',
        lineTension: 1,
        pointRadius: 5,
        fill: false,
      }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true,
          ticks: {
            autoSkip: false,
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true,
          }
        }],
      }
    }
  });

  // ------------------------------------------------------- //
  // Bar Chart
  // ------------------------------------------------------ //

  new Chart('bar-chart', {
    type: 'bar',
    data: {
      labels: Department,
      datasets: [{
        data: EmployeeCount,
        borderColor: '#3cba9f',
        backgroundColor: [
          "#3cb371",
          "#0000FF",
          "#9966FF",
          "#4C4CFF",
          "#00FFFF",
          "#f990a7",
          "#aad2ed",
          "#FF00FF",
          "Blue",
          "Red",
          "Blue"
        ],
        fill: true
      }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true,
          ticks: {
            autoSkip: false,
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true,
          }
        }],
      }
    }
  });

  // ------------------------------------------------------- //
  // Pie Chart
  // ------------------------------------------------------ //

  new Chart('pie_chart', {
    type: 'pie',
    data: {
      labels: Department,
      datasets: [{
        data: EmployeeCount,
        borderColor: '#3cba9f',
        backgroundColor: [
          "#3cb371",
          "#0000FF",
          "#9966FF",
          "#4C4CFF",
          "#00FFFF",
          "#f990a7",
          "#aad2ed",
          "#FF00FF",
          "Blue",
          "Red",
          "Blue"
        ],
        fill: true
      }]
    },
    options: {
      legend: {
        display: true,
      }
    }
  });

  // ------------------------------------------------------- //
  // Polar Area Chart
  // ------------------------------------------------------ //

  new Chart('Polar_chart', {
    type: 'polarArea',
    data: {
      labels: Department,

      datasets: [{
        data: EmployeeCount,
        borderColor: '#3cb371',
        backgroundColor: [
          "#3cb371",
          "#0000FF",
          "#9966FF",
          "#4C4CFF",
          "#00FFFF",
          "#f990a7",
          "#aad2ed",
          "#FF00FF",
          "Blue",
          "Red",
          "Blue"
        ],
      }],
    },
    options: {
      legend: {
        display: true,
      },
      ticks: {
        min: 0
      },
    }
  });
}
