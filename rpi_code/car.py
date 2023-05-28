from db import DB
from gpiozero import Button, AngularServo, LED, OutputDevice
from time import sleep
from gsm import send_message
from camera import Camera
import adafruit_fingerprint
from rpi_lcd import LCD
import time
import os

class Car:
    def __init__(self, mqttClient, fingerprint, get_coords, licence_plate_number):
        self.lcd = LCD()
        self.engineLed = LED(20)
        self.driveLed = LED(21)
        self.driverSeatedLed = LED(25)
        self.buzzer = OutputDevice(26)
        self.mqttClient = mqttClient
        self.fingerprint = fingerprint
        self.get_coords = get_coords
        self.licence_plate_number = licence_plate_number
        self.camera = Camera(mqttClient)
        self.seat_button = Button(17, hold_time=2)
        self.start_button = Button(27)
        self.panic_button = Button(22)
#         self.servo = AngularServo(18, min_pulse_width=0.0006, max_pulse_width=0.0023)
#         self.servo.angle = -90
        self.seat_button.when_held = self.set_driver
        self.seat_button.when_released = self.reset_driver
        self.start_button.when_pressed = self.start_car
        self.panic_button.when_pressed = self.send_panic_msg
        self.isDriverSeated = False
        self.isEngineRunning = False
        self.driveModeOn = False
        self.fingerprint_scan_tries = 0
        self.driver_id = None

    def biometric_authentication(self,):
            while self.fingerprint_scan_tries <= 1:
                fingerprint_id = self.fingerprint.get_fingerprint()
                if(fingerprint_id):
                    print(fingerprint_id)
                    db = DB('fingerprints.db')
                    driver_id = db.get_driver_id(fingerprint_id)
                    db.close()
                    if(driver_id):
                        print(f"User ID: {driver_id}")
                        self.fingerprint_scan_tries = 0
                        # self.camera.recognise_face(driver_id, self.licence_plate_number)
                        return True
      
                print("Fingerprint Scan failed try again")
                self.fingerprint_scan_tries += 1
                time.sleep(1)
                i = None
                while i != adafruit_fingerprint.NOFINGER:
                    i = self.fingerprint.finger.get_image()
            
    
            
            if(self.fingerprint_scan_tries > 1):
                db = DB('fingerprints.db');
                coords = self.get_coords()
                latitude = coords["latitude"]
                longitude = coords["longitude"]
                msg = "There is failed attempt to start your car with an identified fingerprint \n"
                msg += f"Here is your vehicle's location http://maps.google.com/maps?q={latitude},{longitude}"
                msg += f"\nLicence Plate: {self.licence_plate_number}"
                self.buzzer.on()
                sleep(1)
                self.buzzer.off()
#                 for phone_number in db.get_phone_numbers():
#                     send_message(phone_number, msg)
#                 db.close()
                self.fingerprint_scan_tries = 0

    def start_car(self):
        if(self.isEngineRunning):
            print("Stopping the engine")
            self.lcd.clear()
            self.lcd.text("Stopping the", 1)
            self.lcd.text("Engine", 2)
            self.isEngineRunning = False
            self.driveModeOn = False
            self.driveLed.off()
            self.engineLed.off()
            db = DB('fingerprits.db')
            driver = db.get_driver(self.driver_id)
            if(driver):
                name, username = driver
                self.mqttClient.publish(f'current_driver/{self.licence_plate_number}', json.dumps({"name": name, "username": username, state: "Parked"}))
                db.close()
            self.driver_id = None
            print("Engine Stopped")
#             self.servo.angle = -90
            self.lcd.clear()
            self.lcd.text("Engine ", 1)
            self.lcd.text("Stopped", 2)
            
        elif(self.isDriverSeated):
            print("Car Starting")
            if(self.biometric_authentication()):
                self.isEngineRunning = True
                self.engineLed.on()
                self.driveLed.on()
                self.driveModeOn = True
                db = DB('fingerprits.db')
                driver = db.get_driver(self.driver_id)
                if(driver):
                    name, username = driver
                    self.mqttClient.publish(f'current_driver/{self.licence_plate_number}', json.dumps({"name": name, "username": username, state: "Driving"}))
                db.close()
                print("Car Started")
#                 self.servo.angle = 90
                self.lcd.clear()
                self.lcd.text("Car Started", 1)
        else:
            print("There is no driver on the seat")
    
    def set_driver(self,):
        print("Driver sat on the seat")
        self.isDriverSeated = True
        self.driverSeatedLed.on()
        if self.isEngineRunning:
            if(self.biometric_authentication()):
                self.driveModeOn = True
                self.driveLed.on()
            
    
    def reset_driver(self,):
        print("Driver off the seat")
        self.isDriverSeated = False
        self.driverSeatedLed.off()
        if self.isEngineRunning:
            self.driveModeOn = False
            self.driveLed.off()
    
    def send_panic_msg(self,):
        coords = self.get_coords()
        latitude = coords["latitude"]
        longitude = coords["longitude"]
        msg = f"Help I am in an emergence.\nHere is my location http://maps.google.com/maps?q={latitude},{longitude}"
        msg += f"\nLicence Plate: {self.licence_plate_number}"
#         db = DB('fingerprints.db');
#         for phone_number in db.get_phone_numbers():
#             send_message(phone_number, msg)
#         db.close()

    def clear_fingerprint(self,):
        self.fingerprint.clear()
        os.remove('fingerprint.db')

    def begin(self,):
        while True:
            if self.isEngineRunning and self.isDriverSeated:
                self.camera.get_image(self.licence_plate_number)
            sleep(10)