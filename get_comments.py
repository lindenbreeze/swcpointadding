"""
INSTRUCTIONS

Download this file and run it on your device. 
You'll need to install python3, the python 
requests module, and a python IDE (for something 
like this where you're just running code, I 
recommend IDLE3, it's pretty straightforward). 

The program will ask you for the ID of a recently 
added comment. You can get this from the spreadsheet.

Once you enter that, it will get all the comments 
from after that was commented. It will create a 
file called pointaddingcomments.txt on your computer. 
Open up pointaddingcomments.txt and copy-paste that 
into the textbox on the website.

Depending on your operating system and IDE, you may need
to delete pointaddingcomments.txt from your computer
before running the program again.
"""

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
