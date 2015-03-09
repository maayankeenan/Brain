/**
 * Created by maayankeenan on 3/8/15.
 */

var ReportView = Backbone.View.extend({

    initialize : function() {
        var self = this;
        $('#search').on('click', function() {
           var id = $('#idBox').val();
            if(id != ''){
                $('#error').text('');
                $.get("http://localhost:8080/ReportService/api/getReportById/" + id, function (data) {
                    var dataObj = JSON.parse(data);
                    // build table
                    self.renderTable(dataObj);
                    //build graphs
                    self.renderGraph(dataObj);

                });
            }else {
                $('#error').text('אנא הזן מספר ת.ז');
            }
        });
    },

    renderTable : function(data) {
        $("#reportTable tbody").empty();
        console.log(data);

        data.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
        });

        for (var i = 0; i < data.length; i++) {
            $("#reportTable tbody").append(this.drawRow(data[i]));
        }
    },


    drawRow : function (rowData) {
        var row = $("<tr />")
        row.append($("<td>" + rowData.date + "</td>"));
        row.append($("<td>" + rowData.score + "</td>"));
        row.append($("<td>" + rowData.totalTime + "</td>"));

        return row;
    },

    renderGraph : function(data) {

        $('#scoreChart').empty();
        $('#timeChart').empty();

        var scoreColumns = [];
        var timeColumns = [];
        for (var i = 0; i < data.length; i++) {
            var currScore = [];
            var currTime = [];
            var num = i+1;
            currScore.push('שאלון ' + num);
            currTime.push('שאלון ' + num);

            var dataArray = data[i].data;

            // loop through all questions to collect score and time data
            for (var j = 0; j < dataArray.length; j++) {
                currScore.push(dataArray[j].score);
                currTime.push(dataArray[j].time);
            }

            scoreColumns.push(currScore);
            timeColumns.push(currTime);
        }


        var scoreChart = c3.generate({
            bindto: '#scoreChart',
            data: {
                columns: scoreColumns,
                type: 'bar'
            },
            axis: {
                x: {
                    label: 'מספר שאלה'
                },
                y: {
                    label: 'ציון'
                }
            }
        });

        var timeChart = c3.generate({
            bindto: '#timeChart',
            data: {
                columns: timeColumns
            },
            axis: {
                x: {
                    label: 'מספר שאלה'
                },
                y: {
                    label: 'מילישניות'
                }
            }
        });

        $('#graphContainer').css('visibility', 'visible');
    }

});

