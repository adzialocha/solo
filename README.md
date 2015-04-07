# channel-toggle-interface

Channel-Toggle Matrix Interface and editor for OSC (OpenSoundControl) based on [https://github.com/marmorkuchen-net/osc-js](osc-js) and [https://facebook.github.io/react/](React).

You need a running node environment with bower, grunt and npm installed.

### Installation

    git clone https://github.com/marmorkuchen-net/channel-toggle-interface
    cd channel-toggle-interface
    npm install && bower install
    grunt serve

Open the browser (tested on google chrome) and go to `localhost:8000`. The application should also run on your smartphone or tablet device.

### OSC-Bridge

For OSC-communication with another audio software like `Ableton` you need a websocket-udp bridge. Check the `bridge.py` file, you will need a python environment, [http://autobahn.ws/python/](autobahn) based on twisted.

    python bridge.py
