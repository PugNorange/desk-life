console.log("DATA >>> ", dataForChart);
// Create list of time labels for x-axis
// Timezone issue needs to be solved later.
var xAxisTimeLabel = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00",
"08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00",
"16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00",];
// function getXAxisLabels(dataForChart) {
//     for (var i = 0; i < dataForChart.length; i++) {
//         console.log("SEE >> ", dataForChart[i]["start_time"]);
//         var modifyTimeStamp = dataForChart[i]["start_time"].split("T");
//         var reformat = modifyTimeStamp[1].split(":");
//         var xAxisTimes = reformat[0]+":"+reformat[1];
//         xAxisTimeLabel[i] = xAxisTimes;
//         console.log("CHECK time >> ", xAxisTimes);
//     }
// };




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


var barChartData = {
    labels: xAxisTimeLabel,
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


window.onload = function() {
    ctx = document.getElementById("canvas").getContext("2d");

    // Get data for the chart
    // getXAxisLabels(dataForChart); // x-axis label
    getFaceDistanceData(dataForChart); // face distance data
    getEyeBlinkData(dataForChart); // Eye blink data
    window.myBar = new Chart(ctx, {
        type: 'bar', // ここは bar にする必要があります
        data: barChartData,
        options: complexChartOption
    });
};

var complexChartOption = {
    responsive: true,
};
