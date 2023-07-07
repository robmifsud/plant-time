# Script to decrease moistureLevel percentage by 5% every 5 seconds
# Make sure to run this command in the terminal:
# pip install firebase-admin

import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials
import time
# Separate script with credential reference
import config as conf

cred = credentials.Certificate(conf.CRED)
firebase_admin.initialize_app(cred)

db = firestore.client()

# Store ids in list
ids = []
collection_get = db.collection('moistureSensors').get()
collection = db.collection('moistureSensors')
for doc in collection_get:
    ids.append(doc.id)


# Infinite loop, CTRL + C to exit 
loop = True
while loop:
    for id in ids:
        moistureLevel = collection.document(id).get().to_dict()

        temp = moistureLevel['moistureLevel']
        temp -= 5
        if temp < 0:
            temp = 0
        if temp > 100:
            temp = 100
        data = {
            'moistureLevel': temp
        }

        res = collection.document(id).update(data)
    time.sleep(5)
    print('Updated')
