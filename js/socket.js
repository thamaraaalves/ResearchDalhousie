$(document).ready(function () {
    var connection = new WebSocket('ws://134.190.144.234:9001/');
    //var connection = new WebSocket('ws://192.168.0.3:9001/');
    // When the connection is open, send some data to the server
    var nickname = "Notification";
    connection.onopen = function () {
        connection.send(nickname); // Send the message 'Ping' to the server
    };

    // Log errors
    connection.onerror = function (error) {
        console.log('WebSocket Error ' + error);
    };

    // Log messages from the server
    connection.onmessage = function (e) {
        console.log('Server: ' + e.data);
    };
});