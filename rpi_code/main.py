from finger_print import Fingerprint
from db import DB
import paho.mqtt.client as mqtt
import time
import serial
import json
import sys

COM_PORT ="COM3"
BROKER = "127.0.0.1"
LICENSE_PLATE_NUMBER = "AVF1234"

try:
    uart = serial.Serial(COM_PORT, baudrate=57600, timeout=1)
    fingerprint = Fingerprint(uart)
except Exception as e:
    print("Fingerprint scanner failed to initialise");
    print(e)
    sys.exit()

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe(f"register_fingerprint/{LICENSE_PLATE_NUMBER}")


def on_message(client, userdata, msg):
    if(msg.topic == f"register_fingerprint/{LICENSE_PLATE_NUMBER}"):
        driver_id = json.loads(msg.payload)["driver_id"]
        location = fingerprint.enroll_finger()
        print(location)
        db = DB("fingerprints.db")
        db.add_fingerprint(driver_id, location)
        db.close()
        client.publish('fingerprint_id', json.dumps({"fingerprint_id" : location, "driver_id": driver_id, "license_plate_number": LICENSE_PLATE_NUMBER}))

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect(BROKER, 1883, 60)
client.loop_start()


fingerprint_scan_tries = 0
try:
    while True:
        c = input("Press Enter to Start: ")

        if(c == 'c'):
            fingerprint.clear()
        else:
            location = fingerprint.get_fingerprint()
            if(location):
                print(location)
                db = DB('fingerprints.db')
                driver_id = db.get_driver_id(location)
                db.close()
                if(user_id):
                    print(f"User ID: {driver_id}")
            else:
                fingerprint_scan_tries += 1
                print("Fingerprint not recognised try again")
                if(fingerprint_scan_tries > 2):
                    print("Send message to owner")

except KeyboardInterrupt as e:
    print(e)
    print("Exiting code.....")
    client.loop_stop()
    sys.exit()


    