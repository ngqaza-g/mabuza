import adafruit_gps
import serial
import time
import json

class GPS:
    def __init__(self, UART_PORT, mqttClient):
        self.uart = serial.Serial(UART_PORT, baudrate=9600, timeout=10)
        self.gps = adafruit_gps.GPS(self.uart, debug=False)
        self.mqttClient = mqttClient
        self.latitude = 0
        self.longitude = 0

    def update_coords(self):
        last_print = time.monotonic()
        while True:
            gps.update()
            current = time.monotonic()
            if current - last_time > 1:
                if not gps.has_fix:
                    print("GPS waiting for fix")
                    continue

                self.longitude = gps.longitude
                self.latitude = gps.latitude
                self.mqttClient.publish("location", json.dumps({"longitude": slef.longitude, "latitude": self.latitude}))
                print("Longitude: {longitude} \nLatitude: {latitude}")

    def get_coords(self):
        return {"longitude": slef.longitude, "latitude": self.latitude}


