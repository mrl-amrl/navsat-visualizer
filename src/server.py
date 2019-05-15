#!/usr/bin/env python
from websocket_server import WebsocketServer
from sensor_msgs.msg import NavSatFix
import rospy
import threading
import json


class Controller:
    def __init__(self, topic=''):
        self.server = WebsocketServer(9001)
        self.t = threading.Thread(target=self.server.run_forever)
        self.t.daemon = True
        self.t.start()

        self.subscriber = rospy.Subscriber(
            topic,
            NavSatFix,
            self.callback,
        )

    def callback(self, msg):
        lat = msg.latitude
        lng = msg.longitude
        self.server.send_message_to_all(json.dumps({
            'lat': lat,
            'lng': lng,
        }))

    def spin(self):
        rospy.spin()


if __name__ == "__main__":
    rospy.init_node('navsat_visualizer')
    controller = Controller(topic='/piksi/navsatfix_spp')
    controller.spin()
