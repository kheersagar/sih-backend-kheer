import io
from urllib.request import urlopen
import segno
import base64
qrcode = segno.make('Nitesh Bharadwaj + 5, Mobile Number: +91-9765379248, Amount Paid: INR 120, Date of Payment: 20/03/2022, Date of Visit: 22/03/2022, Time: 09:00 AM to 05:00 PM, ', error='h')
qrcode.to_artistic(background='TJ2.jpg', target='SIH221.JPG', scale=10, dark='darkred')
with open("SIH221.JPG", "rb") as image2string:
    converted_string = base64.b64encode(image2string.read()).decode('ascii')
    image_data = 'data:image/png;base64,{}'.format(converted_string)
print(image_data)
# print("result with hello")
