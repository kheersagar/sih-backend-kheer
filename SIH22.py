import io
import sys
from urllib.request import urlopen
import segno
import base64
qrcode = segno.make(sys.argv[1], error='h')
qrcode.to_artistic(background= sys.argv[2], target='SIH221.JPG', scale=10, dark='darkred')
with open("SIH221.JPG", "rb") as image2string:
    converted_string = base64.b64encode(image2string.read()).decode('ascii')
    image_data = 'data:image/png;base64,{}'.format(converted_string)
print(image_data)
# print("result with hello")
