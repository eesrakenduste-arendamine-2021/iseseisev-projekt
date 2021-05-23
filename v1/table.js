function addservice(){
    document.getElementById("Form").style.display = "block";
}

$(document).ready(function() {
    $.getJSON("data.json", function(data) {
        var table_data = '';
        $.each(data, function(key, value) {
            table_data += '<tr>';
            table_data += '<td>'+value.service+'</td>';
            table_data += '<td>'+value.url+'</td>';
            table_data += '<td>'+value.platform+'</td>';
            table_data += '<td>'+value.version+'</td>';
            table_data += '<td>'+value.server+'</td>';
            table_data += '<td>'+value.location+'</td>';
            table_data += '<td>'+value.contact+'</td>';
            table_data += '<td>'+value.client+'</td>';
            table_data += '<td>'+value.comment+'</td>';
            table_data += '</tr>';
        });
        $('#table_table').append(table_data);
    });
});