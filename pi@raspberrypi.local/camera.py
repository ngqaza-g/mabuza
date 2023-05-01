from picamera2 import Picamera2
import cv2
import base64
import time 
import json

class Camera:

    def __init__(self, mqttClient):
        self.picam = Picamera2()
        self.picamera.preview_configuration.main.size = (640, 480)
        self.picam.preview_configuration.main.format = "RGB888"
        self.picam.preview_configuration.align()
        self.picam.configure("preview")
        self.picam.start()

        self.face_cascade = cv2.CascadeClassifier('cascades/haarcascade_frontalface_alt2.xml')

        self.mqttClient = mqttClient
    
    def recognise_face(self, driver_id):
        start_time = time.time()
        while True:
            im = self.picam.capture_array()
            image = im
            gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
            faces = self.face_cascade.detectMultiScale(gray)
            for (x, y, w, h) in faces:
                cv2.rectangle(im, (x, y), (x+w, y+h), (0, 255, 0), 2) 

            if len(faces) > 0:
                retval, buffer = cv2.imencode('.jpg', image)
                base64_image = base64.b64encode(buffer).decode('utf-8')
                self.mqttClient.publish('recognise_face',json.dumps({"image" : base64_image, "driver_id" : driver_id}))
                print(base64_image)

            if time.time() - start_time >= 20 and len(faces) <= 0:
                return False

            cv2.imshow("Camera", im)
            if cv2.waitKey(1) == ord('q'):
                break
        
        cv2.destroyAllWindows()


cam = Camera(None)

cam.recognise_face(None)