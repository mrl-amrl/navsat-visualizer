var states = {
    'map': null,
    'marker': null,
    'ready': false,
}

function map_callback() {
    var mapProp = {
        center: new google.maps.LatLng(36.323643, 50.039436),
        disableDefaultUI: true,
        zoom: 20,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#ff4400"
                    },
                    {
                        "saturation": -68
                    },
                    {
                        "lightness": -4
                    },
                    {
                        "gamma": 0.72
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon"
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#0077ff"
                    },
                    {
                        "gamma": 3.1
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "hue": "#00ccff"
                    },
                    {
                        "gamma": 0.44
                    },
                    {
                        "saturation": -33
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "stylers": [
                    {
                        "hue": "#44ff00"
                    },
                    {
                        "saturation": -23
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "hue": "#007fff"
                    },
                    {
                        "gamma": 0.77
                    },
                    {
                        "saturation": 65
                    },
                    {
                        "lightness": 99
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "gamma": 0.11
                    },
                    {
                        "weight": 5.6
                    },
                    {
                        "saturation": 99
                    },
                    {
                        "hue": "#0091ff"
                    },
                    {
                        "lightness": -86
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": -48
                    },
                    {
                        "hue": "#ff5e00"
                    },
                    {
                        "gamma": 1.2
                    },
                    {
                        "saturation": -23
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "saturation": -64
                    },
                    {
                        "hue": "#ff9100"
                    },
                    {
                        "lightness": 16
                    },
                    {
                        "gamma": 0.47
                    },
                    {
                        "weight": 2.7
                    }
                ]
            }
        ],
    };
    var map = new google.maps.Map(document.getElementById("google_map"), mapProp);
    states.map = map;
    states.ready = true;
}

function set_marker() {
    if (!states.ready)
        return;
    var marker = new google.maps.Marker({
        position: { lat: 36.323643, lng: 50.039436 },        
    });
    marker.setMap(states.map);
}


var ros = new ROSLIB.Ros({
    url: 'ws://0.0.0.0:9090'
});

ros.on('connection', function () {
    console.log('Connected to websocket server.');
});

ros.on('error', function (error) {
    console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function () {
    console.log('Connection to websocket server closed.');
});

var listener = new ROSLIB.Topic({
    ros: ros,
    name: '/listener',
    messageType: 'std_msgs/String'
});

listener.subscribe(function (message) {
    console.log('Received message on ' + listener.name + ': ' + message.data);
    listener.unsubscribe();
});