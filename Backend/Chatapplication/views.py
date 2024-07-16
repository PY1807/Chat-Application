from django.shortcuts import render
from .models import person,Login,Chatrooms
from .db_connection import db
from django.http import JsonResponse,HttpResponse
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password,check_password
import json
from datetime import datetime
import pytz

from django.conf import settings
import random


def index(request):
  return render(request,'index.html')

@api_view(['POST'])
def add(request): 
  # data = request.data
  data = json.loads(request.body)
  name=data['username']
  email=data['email']
  

  def is_valid_email_domain(email):
    # Extract domain from email address
    domain = email.split('@')[-1]

    # List of known valid domains
    valid_domains = [  'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'icloud.com',
    'mail.com',
    'zoho.com',
    'inbox.com',
    'live.com',
    'fastmail.com','gmail.co.uk',
    'hotmail.co.uk',
    'yahoo.co.uk',
    'sky.com','hotmail.fr','yahoo.co.jp',
    'hotmail.co.jp',
    'docomo.ne.jp','yahoo.com.au','yahoo.de',
    'hotmail.de','yahoo.co.za','hotmail.com.br',
    'gmail.com.br',
    'yahoo.com.br','yahoo.it',
    'hotmail.it','vodafone.it',
    'yahoo.com.mx',
    'hotmail.com.mx','gmail.com.mx',
    'yahoo.com.ar',
    'hotmail.com.ar',
    'live.com.ar', 'hotmail.com.co',
    'yahoo.com.co',
    'gmail.com.co',
    'outlook.com.co',
    'hotmail.es',
    'yahoo.es',
    'gmail.es','mail.com',
    'email.com','googlemail.com',
    'outlook.com',
    'live.com','office365.com',
    'outlook.co.uk', 'yahoo.com.ua',
    'yahoo.com.ru',
    'yahoo.com.cn',
    'yahoo.co.uk','yahoo.co.in','facebook.com',
    'twitter.com','instagram.com','x.com','whatsapp.com']  # Add more valid domains as needed

    # Check if the domain is in the list of valid domains
    return domain in valid_domains

# Example usage:


  if is_valid_email_domain(email)==False:
    message=f'Email was wrong, {name} could not Sign Up'
    
    return JsonResponse({"status": "unsuccessful", "message": "Wrong Email"})

  
  user = person.find_one({"username": name})
  
  if user:
     message=f'Person with same username already exists, {name} could not Sign Up'
     
     return JsonResponse({"status": "unsuccessful", "message": "A person with same username already exists"})
  hashed_password = make_password(data['password'])

  
  records={
     "username":data['username'],
    "firstname": data['firstName'],
    "lastname": data['lastName'],
    "email":data['email'],
    "password1":hashed_password,
  }
  # username=user['username']
  message=f'{name} Signed Up'
 
  person.insert_one(records)
  return HttpResponse("Yes")

@api_view(['POST'])
def login(request):
  # data = request.data
  data = json.loads(request.body)
  name=data['username']
  password=data['password']
  
  user = person.find_one({"username": name})
 
  utc_now = datetime.now(pytz.utc)

# Define the IST timezone
  ist_timezone = pytz.timezone('Asia/Kolkata')

# Convert the current time to IST
  ist_now = utc_now.astimezone(ist_timezone)

# Extract date and time separately
  current_date_ist = ist_now.date()
  current_time_ist = ist_now.time()
  current_date=current_date_ist.strftime('%Y-%m-%d')
  current_time=current_time_ist.strftime('%H:%M:%S')
  

  if user:
    if check_password(password, user['password1']):
     records={
    "username":name,
    "Date":current_date,
    "Time":current_time,
    "Status":"Logged-In"
    } 
     message=f'{name} Logged-In at {current_time} IST '
     
          
  
     Login.insert_one(records)
     return JsonResponse({"status": "success", "message": "Logged in successfully"})
    else:
       
        records={
                "username":name,
                "Date":current_date,
                "Time":current_time,
                "Status":"Login Failed"
                }
        message=f'{name} Login failed at {current_time} IST '
        
                            
        Login.insert_one(records)
        return JsonResponse({"status": "error", "message": "Wrong password"})
  else:
        records={
                "username":name,
                "Date":current_date,
                "Time":current_time,
                "Status":"Login Failed"
                }
        message=f'{name} Login failed at {current_time} IST '
        
                            
        Login.insert_one(records)
        return JsonResponse({"status": "error", "message": "Username does not exist"})

@api_view(['GET'])
def chatrooms(request):

  rooms=Chatrooms.find()
  
  room_list=[]
  for room in rooms:
     room_list.append(room['room_name'])
  # room_list = list(rooms.values('room_name'))  # Retrieve only 'room_name' field

  return JsonResponse({"room_list":room_list})


@api_view(['POST'])
def addroom(request):
   
   data = json.loads(request.body)
   
   name=data['roomName']

   roomcheck = Chatrooms.find_one({"room_name": name})
   if not roomcheck :
      Chatrooms.insert_one({"room_name":name})
   
   return JsonResponse({"status": "success",})

@api_view(['GET'])
def messages(request,id):
   
   if not id in db.list_collection_names():
        print(id)
        db.create_collection(id)
  
    # Get the collection
   new_col = db[id]
   chat1=new_col.find()
   print(chat1)
   print(type(chat1))
   chat=[]
   for mssg in chat1:
      print(mssg)
      chat.append(
         {
            'sender': mssg['sender'],
            'message': mssg['message']
            })

   print("MAde")
   return JsonResponse({"chat":chat})
@api_view(['POST'])
def newmessage(request):
   data = json.loads(request.body)
   name=data['username']
   newMessage=data['newMessage']
   room=data['id']
   collection=db[room]
   collection.insert_one({"sender":name,"message":newMessage})
   return JsonResponse({"status":"success"})

@api_view(['POST'])
def logout(request):
   data = json.loads(request.body)
   name=data['username']
  
   utc_now = datetime.now(pytz.utc)

# Define the IST timezone
   ist_timezone = pytz.timezone('Asia/Kolkata')

# Convert the current time to IST
   ist_now = utc_now.astimezone(ist_timezone)

# Extract date and time separately
   current_date_ist = ist_now.date()
   current_time_ist = ist_now.time()
   current_date=current_date_ist.strftime('%Y-%m-%d')
   current_time=current_time_ist.strftime('%H:%M:%S')

   records={
      
      "username":name,
      "Date":current_date,
      "Time":current_time,
      "Status":"Logged-Out"
         }
                            
   Login.insert_one(records)
   return JsonResponse({"status": "success", "message": "Collection deleted"})
   
   
@api_view(['POST'])
def deleteroom(request):
   data = json.loads(request.body)
   name=data['roomName']
   Chatrooms.delete_one({"room_name":name})
   
   if name in db.list_collection_names():
      na=db[name]
      na.drop()
      
  
   return JsonResponse({"status": "success", "message": "Collection deleted"})
  
   


