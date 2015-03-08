/**
 * Created by maayankeenan on 3/8/15.
 */

var ReportView = Backbone.View.extend({

    initialize : function() {
        var self = this;
        $('#search').on('click', function() {
           var id = $('#idBox').val();
            if(id != ''){
                $.get("http://localhost:8080/ReportService/api/getReportById/" + id, function (data) {
                    self.renderTable(JSON.parse(data));
                });
            }else {
                $('#error').text('אנא הזמן מספר ת.ז');
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
    }

});

