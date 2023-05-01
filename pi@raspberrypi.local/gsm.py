import serial
from gpiozero import OutputDevice
from time import sleep

power = OutputDevice(16)
gsm = serial.Serial('/dev/ttyAMA3', 9600, timeout=1)
def send_message(to, msg):
    power.on()
    sleep(1)
    power.off()
    sleep(5)
    gsm.write(b(f"AT+CMGS={to}\r\n"))
    response = gsm.read(100)
    print(response)
    gsm.write(b(msg+ '\x1A'))
    response = gsm.read(100)
    print(response)
    power.on()
    sleep(1)
    power.off()
    sleep(5)
    gsm.close()