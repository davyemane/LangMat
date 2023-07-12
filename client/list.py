import requests 
from getpass import getpass
endpoint = 'http://127.0.0.1:8000/formation/auth'
username = input('entrer votre username:\n')
password = getpass('Entrer le mot de passe:\n ')
auth_response= requests.post(endpoint, json={'username':username, 'password':password})
print(auth_response.json())


if auth_response.status_code==200:
        
    endpoint = "http://localhost:8000/formation/Niveau/Champ/" #permet de rendre a httpbin.org
    headres ={
        'Authorization':'Token 4a3b7f230cd4d758baec0bf410adc99871dc3995'
    }
    response = requests.get(endpoint, headers=headres) #params={'abc':124},  json={'query':'hi'}) # recupere les données , param permet d'envoyer les donnee par l'url post permet d'envoyer les données dans la bd
    print(response.json())  
    print(response.status_code)
