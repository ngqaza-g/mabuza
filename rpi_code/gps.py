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

    def update_coords(self, license_plate_number):
        last_print = time.time()
        last_update = time.time()
        while True:
            self.gps.update()
            current_print = time.time()

            if current_print - last_print > 1:
                if not self.gps.has_fix:
                    print("GPS waiting for fix")
                    continue

                self.longitude = self.gps.longitude
                self.latitude = self.gps.latitude
                current_update = time.time()

                if(current_update - last_update > 30):
                    self.mqttClient.publish(f"location/{license_plate_number}", json.dumps({"coords": {"longitude": self.longitude, "latitude": self.latitude}, "license_plate_number":license_plate_number}))
                    
                last_update = current_update
                last_print = current_print

    def get_coords(self):
        return {"longitude": self.longitude, "latitude": self.latitude}


