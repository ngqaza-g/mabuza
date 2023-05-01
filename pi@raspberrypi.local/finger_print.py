import adafruit_fingerprint
import serial
import time                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

class Fingerprint:
    def __init__(self, PORT):  
        self.uart = serial.Serial(PORT, baudrate=57600, timeout=1)
        self.finger = adafruit_fingerprint.Adafruit_Fingerprint(uart)
    
                                                                                                                                                                                                          
    def get_location(self,):                     
        location = 1
        if self.finger.read_templates() != adafruit_fingerprint.OK:
            raise RuntimeError("Failed to read templates")
        if(len(self.finger.templates) > 0 ):
            location = self.finger.templates[len(self.finger.templates) -1] + 1
        return location                           

    def get_fingerprint(self,):                                                                                                                                                                                    
        """Get a finger print image, template it, and see if it matches!"""
        print("Waiting for image...")
        while self.finger.get_image() != adafruit_fingerprint.OK:
            pass
        print("Templating...")
        if self.finger.image_2_tz(1) != adafruit_fingerprint.OK:
            return False                                                                                                            
        print("Searching...")
        if self.finger.finger_search() != adafruit_fingerprint.OK:
            return False
        return self.finger.finger_id


    def enroll_finger(self,):
        """Take a 2 finger images and template it, then store in 'location'"""
        location = self.get_location()
        if(location > 127 & location < 1):
            print("Bad Location generated")
            return False
        for fingerimg in range(1, 3):
            if fingerimg == 1:
                print("Place finger on sensor...", end="")
            else:
                print("Place same finger again...", end="")

            while True:
                i = self.finger.get_image()
                if i == adafruit_fingerprint.OK:
                    print("Image taken")
                    break
                if i == adafruit_fingerprint.NOFINGER:
                    print(".", end="")
                elif i == adafruit_fingerprint.IMAGEFAIL:
                    print("Imaging error")
                    return False
                else:
                    print("Other error")
                    return False

            print("Templating...", end="")
            i = self.finger.image_2_tz(fingerimg)
            if i == adafruit_fingerprint.OK:
                print("Templated")
            else:
                if i == adafruit_fingerprint.IMAGEMESS:
                    print("Image too messy")
                elif i == adafruit_fingerprint.FEATUREFAIL:
                    print("Could not identify features")
                elif i == adafruit_fingerprint.INVALIDIMAGE:
                    print("Image invalid")
                else:
                    print("Other error")
                return False

            if fingerimg == 1:
                print("Remove finger")
                time.sleep(1)
                while i != adafruit_fingerprint.NOFINGER:
                    i = self.finger.get_image()

        print("Creating model...", end="")
        i = self.finger.create_model()
        if i == adafruit_fingerprint.OK:
            print("Created")
        else:
            if i == adafruit_fingerprint.ENROLLMISMATCH:
                print("Prints did not match")
            else:
                print("Other error")
            return False

        print("Storing model #%d..." % location, end="")
        i = self.finger.store_model(location)
        if i == adafruit_fingerprint.OK:
            print("Stored")
        else:
            if i == adafruit_fingerprint.BADLOCATION:
                print("Bad storage location")
            elif i == adafruit_fingerprint.FLASHERR:
                print("Flash storage error")
            else:
                print("Other error")
            return False

        return location

    def clear(self,):
        if self.finger.read_templates() != adafruit_fingerprint.OK:
            raise RuntimeError("Failed to read templates")
        if(len(self.finger.templates) > 0 ):
            for location in self.finger.templates:
                if self.finger.delete_model(location) == adafruit_fingerprint.OK:
                    print(f"Deleted template number ${location}")