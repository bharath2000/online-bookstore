import json
import requests
books = [] # your list with json objects (dicts)

with open('./books_data.json') as json_file:
   books = json.load(json_file)

numOfBooks = 0
for item in books:
    try:
        # print(item);
        res = requests.post("http://localhost:8000/books/create", json=item)
        print(res.status)
    except:
        print("error for item $1".format(item["_id"]))
    
    numOfBooks +=1
    if(numOfBooks > 100):
        break

    