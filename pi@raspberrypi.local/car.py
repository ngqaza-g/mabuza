from db import DB
from gpiozero import Button
from time import sleep
from gsm import send_message

class Car:
    def __init__(self, mqttClient, fingerprint, get_coords):
        self.mqttClient = mqttClient
        self.fingerprint = fingerprint
        self.get_coords = get_coords
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
                    # Face recognition stuff
                    return True
            else:
                self.fingerprint_scan_tries += 1
                print("Fingerprint not recognised try again")
                if(self.fingerprint_scan_tries > 2):
                    print("Send message to owner")
                    self.fingerprint_scan_tries = 0
            return False

    def start_car(self):

        if(self.isEngineRunning):
            print("Stopping the engine")
            self.isEngineRunning = False
        elif(self.isDriverSeated):
            print("Car Starting")
            self.isEngineRunning = False
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
        

    def begin(self,):
        while True:
            sleep(1)