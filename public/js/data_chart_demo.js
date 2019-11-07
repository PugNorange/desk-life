window.onload = function() {
    ctx = document.getElementById("canvas").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar', // ここは bar にする必要があります
        data: barChartData,
        options: complexChartOption
    });
};


var barChartData = {
    labels: ['0:00','1:00','2:00','3:00','4:00','5:00','5:00',
            '6:00','7:00','8:00','9:00','10:00','11:00','12:00',
            '13:00','14:00','15:00','16:00','17:00','18:00',
            '19:00','20:00','21:00','22:00','23:00','24:00'
    ],
    datasets: [
        {
            type: 'line',
            label: 'Distance between face and PC (inches)',
            data: ['0','0','0','0','0','0','0','0','15','16',
            '13','11','12','0','9','7','5','0','0','0',
            '0','0','0','0',
            ],
            borderColor : "rgba(254,97,132,0.8)",
            backgroundColor : "rgba(254,97,132,0.5)",
        },
        {
            type:'bar',
            label: 'Number of eye blinks per minute',
            data: ['0','0','0','0','0','0','0',
                '0','0','11','15','9','5','0',
                '12','11','5','0','0','0','0','0','0'
            ],
            borderColor : "rgba(54,164,235,0.8)",
            backgroundColor : "rgba(54,164,235,0.5)",
        },
    ],
};


var complexChartOption = {
    responsive: true,
};
