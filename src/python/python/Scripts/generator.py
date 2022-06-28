from random import random
import requests
import json
import math

cats = []
i = 0
while i < 5:
    url = 'https://jservice.io/api/categories?offset='+str(math.ceil(random()*100))
    data = requests.get(url)
    categories = json.loads(data.text)
    if categories[0]['clues_count'] >=5: 
        cats.append(categories[0]['id'])
        i+=1

print(cats)
questions = [];
qURL = 'https://jservice.io/api/clues?category='
for i in range(5):
    qURLL = qURL + str(cats[i])
    data = json.loads(requests.get(qURLL).text)
    for i in range(5):
        questions.append(data[i])
print(questions)
dictArr = []
valeArr = [200,400,600,800,1000]
counter = 0
for item in questions:
    if counter%6==0:
        dictArr.append({'id':counter,'question':"CATEGORY",'answer': 'undefined','played':False,'price':'undefined','category':item['category']['title']})
        counter+=1
    dictArr.append({'id':counter,'question':item['question'],'answer':item['answer'],'played':False,'price':item['value'],'category':item['category']['title']})
    counter+=1
with open ("./jeopardy-app/src/components/sample.json","w") as outfile:  
    json.dump(dictArr, outfile, indent = 4)
