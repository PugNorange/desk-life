
// var total_money= ['100','150','120','460','700','660','890','900','890','950','1300','1123']
//
// /// Eye blink data
// var members = ['40','60','100','95','180','190','196','220','211','205','215','240']


/// Distance between face and PC (inches) //
var distance = ['0','0','0','0','0','0','0','0','15','16',
'13','11','12','0','9','7','5','0','0','0',
'0','0','0','0']

/// Eye blink data
var eye_blink = ['0','0','0','0','0','0',
    '0','0','11','15','9','5','4',
    '0','11','5','0','0','0','0','0','0'
]

var time_label = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00',
'07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00',
'16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']

var barChartData = {
    labels: time_label,
    datasets: [
        {
            type: 'line',
            label: 'Distance between face and PC (inches)',
            data: distance,
            borderColor : "rgba(254,97,132,0.8)",
            backgroundColor : "rgba(254,97,132,0.5)",
        },
        {
            type:'bar',
            label: 'Number of eye blinks per minute',
            data: eye_blink,
            borderColor : "rgba(54,164,235,0.8)",
            backgroundColor : "rgba(54,164,235,0.5)",
        },
    ],
};


window.onload = function() {
    ctx = document.getElementById("canvas").getContext("2d");

    window.myBar = new Chart(ctx, {
        type: 'bar', // ここは bar にする必要があります
        data: barChartData,
        options: complexChartOption
    });
};

var complexChartOption = {
    responsive: true,
};
