/**
 * My chatt client
 */

//chatt code websocket wrapper.
function Chatt(text, status, protocol) {
    this.text = text;
    this.status = status;
    this.protocol = protocol || 'broadcast-protocol';
}
Chatt.prototype.disconnect = function(code, desc) {
    console.log('disconnect');
    this.websocket.close(code, desc);
    this.websocket = null;
};
Chatt.prototype.connect = function(url) {
    this.url = url;
    console.log('connect');
    this.websocket = new WebSocket(this.url, this.protocol);
};

//make a usable function of it
window.mychatt = (function() {
    var chatt, connect, disconnect, regevent, regevent_init, output, url, status, send, logg;
    chatt = new Chatt('#textwindow', '#status', 'broadcast-protocol');
    connect = function(curl) {
        if (!status()) {
            url = curl || 'ws://nodejs1.student.bth.se:8004/';
            chatt.connect(url);
        }

    };
    regevent = function(onmessage_func, onclose_func) {
        chatt.websocket.onopen = function() {
            logg("connected to " + url);
            console.log('onopen');
        };
        chatt.websocket.onmessage = function(event) {
            var myobj;
            eval("myobj =" + event.data);

            var nick = myobj['sendernick'] || null;
            var msg = myobj['msg'] || null;
            var pm = myobj['pm'] || false;
            var server = myobj['server'] || null;

            if (server !== null) {
                output("<i style='color:red'>" + server + "</i>");
            } else if (pm !== false) {
                var retnick = myobj['retrivernick'] || null;

                if (retnick !== null) {
                    output("<span style='color:green'>Till: <b>" + retnick + ":</b> " + msg + "</span>");
                } else {
                    output("<span style='color:green'>Från: <b>" + nick + ":</b></u> " + msg + "</span>");
                }
            } else if (msg !== null) {
                output("<b>" + nick + ":</b> " + msg);
            }

            onmessage_func();
        };
        chatt.websocket.onclose = function() {
            logg("disconnected from " + url);
            onclose_func();
        };
    };
    regevent_init = function(onopen_func, onmessage_func, onclose_func) {
        chatt.websocket.onopen = function() {
            logg("connected to " + url);
            console.log('onopen');
            onopen_func();
        };
        chatt.websocket.onmessage = function(event) {
            logg("recieved: " + event.data);
            console.log('onmessage');
            onmessage_func(event);
        };
        chatt.websocket.onclose = function() {
            logg("disconnected from " + url);
            console.log('onclose');
            onclose_func();
        };
    };
    output = function(msg) {
        var now = new Date();
        $('#chatt')
                .append(now.toLocaleTimeString() + ' ' + msg + '<br/>')
                .scrollTop($('#chatt')[0].scrollHeight);
    };
    logg = function(msg) {
        var now = new Date();
        $('#output')
                .append(now.toLocaleTimeString() + ' ' + msg + '<br/>')
                .scrollTop($(this).scrollHeight);
    };
    disconnect = function(code, desc) {
        chatt.disconnect(code, desc);
    };
    status = function() {
        if (!chatt.websocket || chatt.websocket.readyState === 3) {
            return false;
        }
        return true;
    };
    send = function(msg) {
        chatt.websocket.send(msg);
    };
    return {
        'connect': connect,
        'regevent': regevent,
        'regevent_init': regevent_init,
        'disconnect': disconnect,
        'output': output,
        'status': status,
        'send': send,
        'logg': logg
    };
}());

$(document).ready(function() {
    'use strict';
    $('#nick_').focus();

    //chat adress
    var url = 'ws://nodejs1.student.bth.se:8004/';

    // Send a message to the server
    $('#send_message').on('click', function(event) {
        var msg = $('#message').val();
        $('#message').val("");
        var to = parseInt($('#pm').val());
        var tomsg = "";
        if (!isNaN(to)) {
            tomsg = ",to:'" + to + "'";
        }
        if (msg != "") {
            if (mychatt.status()) {
                mychatt.send("object|msg:'" + msg + "'" + tomsg);
            } else {

                console.log('The websocket is not connected to a server.');
            }
        }
        //update userlist
        getusers();
        $('#message').focus();
    });

    //enter to send
    $('#message').keypress(function(e) {
        if (e.which === 13) {
            $('#send_message').click();
        }
    });


    // Close the connection to the server
    $('#close').on('click', function() {
        mychatt.disconnect(1000, '');
    });

    //connect on overlay
    $('#connect_').click(function() {
        //get nick
        var msg = $('#nick_').val();
        if (msg != "") {

            //connect to server
            $('#status_').text('Connecting.');
            mychatt.connect(url);

            //register initial event handlers
            mychatt.regevent_init(function() {
                // what to do on connection
                if (mychatt.status()) {
                    mychatt.send("object|nick:'" + msg + "',init:true");
                    $('#status_').text('Uppkopplad, registrerar namn.');
                } else {
                    $('#status_').text('Kan inte koppla upp på servern.');
                    console.log('The websocket is not connected to a server.');
                }
            }, function(event) {
                //whait for server response message
                var myobj;
                eval("myobj =" + event.data);
                var init = myobj['init'] || false;
                if (init) {
                    $('#status_').text('Namn registrerat, startar.');
                    getusers();

                    $('#overlay').fadeOut('fast');
                    $('#lightbox').fadeOut();
                    $('#message').focus();

                    mychatt.regevent(
                            function() {
                                getusers();
                            }, function() {
                        $('#status_').text('Nerkopplad');
                        $('#overlay').fadeIn('fast');
                        $('#lightbox').fadeIn();
                    });
                    //hide login
                } else {
                    var reason = myobj['reason'] || "error";
                    $('#status_').text(reason);
                    mychatt.disconnect(1000, "error");
                }

            }, function() {
                //additional disconnect functionality
                var text = $('#status_').text();
                $('#status_').html('Kan inte koppla upp på servern.<br>' + text);
                console.log('Websocket får inte kontakt med servern.');
            });
        } else {
            $('#status_').text('Skriv in ditt namn');
        }
    });

    //enter to send
    $('#nick_').keypress(function(e) {
        if (e.which === 13) {
            $('#connect_').click();
        }
    });
    //get all active users
    function getusers() {
        $.getJSON('http://nodejs1.student.bth.se:8004/nick', function(data) {
            $('#users').html("");
            var items = [], act;

            $.each(data, function(key, val) {
                act = "";
                if (key == $('#pm').val()) {
                    act = "activeli"
                }
                items.push('<li class="user_ ' + act + '" id="' + key + '">' + val + '</li>');
            });

            $('<ul/>', {html: items.join('')}).appendTo('#users');

            $('.user_').click(function(event) {
                console.log(this);
                $('#pm').val("");
                if (!$(this).hasClass("activeli")) {
                    $('.user_').removeClass('activeli');
                    $('#pm').val($(this).attr('id'));
                }
                $(this).toggleClass("activeli");

            });
        });
    }

    console.log('Everything is ready.');
});
