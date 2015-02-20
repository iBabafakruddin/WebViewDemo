/**
 * Created by baba on 2/18/15.
 */
var app = angular.module('app',[]);
app.controller('ChatController',function($scope,socket)
{
    $scope.messages = [];

    socket.on('message',function(message){
        $scope.messages.push(message);
        //alert(message);
        //console.log(message);
    });

    $scope.sendMessage = function()
    {
        socket.emit('message',$scope.message);

    }

});

app.factory('socket', function ($rootScope) {
    var socket = io.connect();
    socket.on('connect', function(){
        console.log('socket connected.');
    });
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});


