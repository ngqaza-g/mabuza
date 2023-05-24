from db import DB
from gpiozero import Button
from time import sleep
from gsm import send_message
from camera import Camera
import adafruit_fingerprint
import os

class Car:
    def __init__(self, mqttClient, fingerprint, get_coords, license_plate_number):
        self.mqttClient = mqttClient
        self.fingerprint = fingerprint
        self.get_coords = get_coords
        self.license_plate_number = license_plate_number
        self.camera = Camera(mqttClient)
        self.seat_button = Button(17, hold_time=2)
        self.start_button = Button(27)
        self.panic_button = Button(22)
        self.seat_button.when_held = self.set_driver
        self.seat_button.when_released = self.reset_driver
        self.start_button.when_pressed = self.start_car
        self.panic_button.when_pressed = self.send_panic_msg
        self.isDriverSeated = False
        self.isEngineRunning = False
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
                        # self.camera.recognise_face(driver_id, self.license_plate_number)
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
                msg = "There is failed attempt to start your car with an identified fingerprint \n"
                msg += f"Here is your vehicle's location http://maps.google.com/maps?q={coords.latitude},{coords.longitude}"
                msg += f"\nLicence Plate: {self.licence_plate_number}"
                for phone_number in db.get_phone_numbers():
                    send_message(phone_number, msg)
                db.close()
                self.fingerprint_scan_tries = 0

    def start_car(self):
        if(self.isEngineRunning):
            print("Stopping the engine")
            self.isEngineRunning = False
            db = DB('fingerprits.db')
            driver = db.get_driver(self.driver_id)
            if(driver):
                name, username = driver
                self.mqttClient.publish(f'current_driver/{self.licence_plate_number}', json.dumps({"name": name, "username": username, state: "Parked"}))
                db.close()
            self.driver_id = None
            print("Engine Stopped")
            
        elif(self.isDriverSeated):
            print("Car Starting")
            if(self.biometric_authentication()):
                self.isEngineRunning = True
                db = DB('fingerprits.db')
                driver = db.get_driver(self.driver_id)
                if(driver):
                    name, username = driver
                    self.mqttClient.publish(f'current_driver/{self.licence_plate_number}', json.dumps({"name": name, "username": username, state: "Driving"}))
                db.close()
                print("Car Started")
        else:
            print("There is no driver on the seat")
    
    def set_driver(self,):
        print("Driver sat on the seat")
        self.isDriverSeated = True
    
    def reset_driver(self,):
        print("Driver off the seat")
        self.isDriverSeated = False

    def send_panic_msg(self,):
        coords = self.get_coords()
        msg = f"Help I am in an emergence.\nHere is my location http://maps.google.com/maps?q={coords.latitude},{coords.longitude}"
        msg += f"\nLicence Plate: {self.licence_plate_number}"
        db = DB('fingerprints.db');
        for phone_number in db.get_phone_numbers():
            send_message(phone_number, msg)
        db.close()

    def clear_fingerprint(self,):
        self.fingerprint.clear()
        os.remove('fingerprint.db')

    def begin(self,):
        while True: 
            self.camera.get_image(self.license_plate_number)
            sleep(120)