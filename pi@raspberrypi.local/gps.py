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
            self.gps.update()
            current = time.monotonic()
            if current - last_print > 1:
                if not self.gps.has_fix:
                    print("GPS waiting for fix")
                    continue

                self.longitude = self.gps.longitude
                self.latitude = self.gps.latitude
                self.mqttClient.publish("location", json.dumps({"longitude": self.longitude, "latitude": self.latitude}))
                print("Longitude: {longitude} \nLatitude: {latitude}")

    def get_coords(self):
        return {"longitude": self.longitude, "latitude": self.latitude}


