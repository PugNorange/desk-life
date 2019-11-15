// Create list of time labels for x-axis
var xAxisTimeLabels = [];
function getXAxisLabels(dataForChart) {
    for (var i = 0; i < dataForChart.length; i++) {
        var modifyTimeStamp = dataForChart[i]["start_time"].split("T");
        var reformat = modifyTimeStamp[1].split(":");
        var xAxisTimes = reformat[0]+":"+reformat[1];
        xAxisTimeLabels[i] = xAxisTimes;
    }
};

var faceDistanceData = [];
function getFaceDistanceData(dataForChart) {
    for (var i = 0; i < dataForChart.length; i++) {
        faceDistanceData[i] = dataForChart[i]["face_distance"];
    }
};

var eyeBlinkData = [];
function getEyeBlinkData(dataForChart) {
    for (var i = 0; i < dataForChart.length; i++) {
        eyeBlinkData[i] = dataForChart[i]["eye_blink_count"];
    }
}


window.onload = function() {
    ctx = document.getElementById("canvas").getContext("2d");

    // Get data for the chart
    getXAxisLabels(dataForChart); // x-axis label
    getFaceDistanceData(dataForChart); // face distance data
    getEyeBlinkData(dataForChart); // Eye blink data
    window.myBar = new Chart(ctx, {
        type: 'bar', // ここは bar にする必要があります
        data: barChartData,
        options: complexChartOption
    });
};


/// x-axis labels ///
// ['0:00','1:00','2:00','3:00','4:00','5:00','5:00',
//         '6:00','7:00','8:00','9:00','10:00','11:00','12:00',
//         '13:00','14:00','15:00','16:00','17:00','18:00',
//         '19:00','20:00','21:00','22:00','23:00','24:00'
// ]

/// Distance between face and PC (inches) //
//['0','0','0','0','0','0','0','0','15','16',
// '13','11','12','0','9','7','5','0','0','0',
// '0','0','0','0',
// ]

/// Eye blink data
// ['0','0','0','0','0','0','0',
//     '0','0','11','15','9','5','0',
//     '12','11','5','0','0','0','0','0','0'
// ]

var barChartData = {
    labels: xAxisTimeLabels,
    datasets: [
        {
            type: 'line',
            label: 'Distance between face and PC (inches)',
            data: faceDistanceData,
            borderColor : "rgba(254,97,132,0.8)",
            backgroundColor : "rgba(254,97,132,0.5)",
        },
        {
            type:'bar',
            label: 'Number of eye blinks per minute',
            data: eyeBlinkData,
            borderColor : "rgba(54,164,235,0.8)",
            backgroundColor : "rgba(54,164,235,0.5)",
        },
    ],
};


var complexChartOption = {
    responsive: true,
};
