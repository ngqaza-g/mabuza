from car import Car
from finger_print import Fingerprint
from gps import GPS
from db import DB
import paho.mqtt.client as mqtt
import concurrent.futures
import time
import serial
import json
import sys

FINGERPRINT_PORT ="/dev/ttyS0"
GPS_PORT='/dev/ttyAMA1'
GSM_PORT="/dev/ttyAMA2"
BROKER = "192.168.137.1"
# BROKER="127.0.0.1"
LICENSE_PLATE_NUMBER = "AVF1234"

try:   
    fingerprint = Fingerprint(FINGERPRINT_PORT)
except Exception as e:
    print("Fingerprint scanner failed to initialise");
    print(e)
    sys.exit()

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe(f"register_fingerprint/{LICENSE_PLATE_NUMBER}")


def on_message(client, userdata, msg):
    if(msg.topic == f"register_fingerprint/{LICENSE_PLATE_NUMBER}"):
        message = json.loads(msg.payload)
        driver_id = message["driver_id"]
        phone_number = message["phone_number"]
        name = message["name"]
        username = message["username"]
        location = fingerprint.enroll_finger()
        print(location)
        db = DB("fingerprints.db")
        db.add_fingerprint(name, username, driver_id, location, phone_number)
        db.close()
        client.publish('fingerprint_id', json.dumps({"fingerprint_id" : location, "driver_id": driver_id, "license_plate_number": LICENSE_PLATE_NUMBER}))

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect(BROKER, 1883, 60)
client.loop_start()


gps = GPS(GPS_PORT, client)
car = Car(mqttClient=client, fingerprint=fingerprint, get_coords=gps.get_coords, license_plate_number=LICENSE_PLATE_NUMBER)

with concurrent.futures.ThreadPoolExecutor() as executor:
    future1 = executor.submit(car.begin)
    future2 = executor.submit(gps.update_coords, LICENSE_PLATE_NUMBER)
    try:
        future1.result()
        future2.result()
    except KeyboardInterrupt as e:
       print("\nExiting Thread....")
    except Exception as e:
        print(e)
    finally:
        executor.shutdown(wait=False)


print("Exiting code.....")
client.loop_stop()