from db import DB
form gpiozero import Button
from time import sleep

class Car:
    def __init__(self, mqttClient, fingerprint):
        self.mqttClient = mqttClient
        self.fingerprint = fingerprint
        self.seat_button = Button(17, hold_time=2)
        self.seat_button.when_held = self.set_driver
        self.seat_button.when_released = self.reset_driver
        self.isDriverSeated = False

        self.start_button = Button(27)
        self.start_button.when_pressed = start_car
        self.fingerprint_scan_tries = 0


    

    def biometric_authentication(self,):
            fingerprint_id = self.fingerprint.get_fingerprint()
            if(fingerprint_id):
                print(fingerprint_id)
                db = DB('fingerprints.db')
                driver_id = db.get_driver_id(fingerprint_id)
                db.close()
                if(driver_id):
                    print(f"User ID: {driver_id}")
                    self.fingerprint_scan_tries = 0
            else:
                self.fingerprint_scan_tries += 1
                print("Fingerprint not recognised try again")
                if(self.fingerprint_scan_tries > 2):
                    print("Send message to owner")
                    self.fingerprint_scan_tries = 0

    def start_car(self):
        if(self.isDriverSeated):
            print("Car Starting")
    
    def set_driver(self,):
        self.isDriverSeated = True
    
    def reset_driver(self,):
        self.isDriverSeated = False

    def begin(self,):
        while True:
            sleep(1)