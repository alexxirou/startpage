
//fonction pour utiliser le men et choisr la ville pour meteo//
$(document).ready(function () {
    $("#reset").click(function (e) {
        $("#citySelect").val("Select")
        $("#message").html("")
    });

//fonction pour utiliser la selection et recuperer le meteo par openweathermap api//
    $("#Option").click(function (e) {
        var validate = Validate();
        $("#message").html(validate);
        if (validate.length == 0) {
            $.ajax({
                type: "POST",
                url: "http://api.openweathermap.org/data/2.5/weather?id=" + $("#citySelect").val() + "&appid=de6d52c2ebb7b1398526329875a49c57&units=metric", //utilisation de la ville selectionée et le clé api //
                dataType: "json",
                success: function (result, status, xhr) {
                    var table = $("<table><tr><th>Weather Description</th></tr>");
                    table.append("<tr><td>Current Temperature:</td><td>" + result["main"]["temp"] + "°C</td></tr>"); //ajouter le resultats dans un table//
                    table.append("<tr><td>Humidity:</td><td>" + result["main"]["humidity"] + "</td></tr>");
                    table.append("<tr><td>Weather:</td><td>" + result["weather"][0]["description"] + "</td></tr>");
                    $("#message").html(table);
                },
                error: function (xhr, status, error) {//si il a un erreur il presente l'erreur//
                    alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
                }
            });
        }
    });


    function Validate() { //fonction qui donne un erreur si on selectione pas une ville//
        var errorMessage = "";
        if ($("#citySelect").val() == "Select") {
            errorMessage += "► Select City";
        }
        return errorMessage;
    }
});
