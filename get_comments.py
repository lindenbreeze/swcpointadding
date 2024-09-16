import json, requests, time

projectId = "551261201"
owner = "chrysaIis"
url = "https://api.scratch.mit.edu/users/"+owner+"/projects/"+projectId+"/comments/?limit=40&offset="
lastComment = input("Enter the ID of a comment recently added from the spreadsheet: ")

comments = []
offset = 0
while True:
    request = requests.get(url+str(offset))
    request = request.content
    request = json.loads(request)
    for comment in request:
        comments.append(comment)
    if lastComment in str(request):
        break
    else:
        offset+=40
        print(offset)
    time.sleep(0.5)
print("done, updating file")

f = open("./pointaddingcomments.txt", "w")
f.write(str(json.dumps(comments)))
f.close()

print("updated file")
