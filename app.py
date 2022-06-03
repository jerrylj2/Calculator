from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def default():
    return render_template(
        "calculator.html",
    )
