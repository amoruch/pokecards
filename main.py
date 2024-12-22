import os
from flask import *

app = Flask(__name__)

def is_page_valid(page):
    if page < 1 or page > 66:
        return 0
    return 1

@app.route('/<page>')
def main_page(page):
    try:
        if is_page_valid(int(page)):
            return render_template("index.html", page=page)
        return "Invalid page"
    except:
        return "something went wrong"

@app.route('/pokemon/<number>')
def pokecard(number):
    return render_template("pokecard.html", number=number)

if __name__ == '__main__':
    #port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=5000)

