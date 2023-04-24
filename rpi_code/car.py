from db import DB

class Car:
    def __init__(self, mqttClient, fingerprint):
        self.mqttClient = mqttClient
        self.fingerprint = fingerprint
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
         while True:
            input("Press Enter to start car")
            self.biometric_authentication()