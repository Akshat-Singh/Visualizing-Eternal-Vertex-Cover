from flask import Flask, render_template, request, redirect
from algorithms import PathGraph

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

graph = PathGraph(5, 3)
arr = [0 for i in range(5)]
attack_edge = [-1, -1]


@app.route('/', methods=["GET", "POST"])
def hello_world():
    return render_template("home.html")


@app.route('/graph_vis')
def visualize():
    size = int(input("Number of vertices: "))
    guards = int(input("Number of guards: "))
    return render_template("graph_vis.html", this_size=size, this_guards=guards)


if __name__ == '__main__':
    app.run()
