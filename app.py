from flask import Flask, render_template, request
from algorithms import PathGraph

app = Flask(__name__)
graph = PathGraph(5, 3)
arr = [0 for i in range(5)]
attack_edge = (-1, -1)


@app.route('/', methods=["GET", "POST"])
def hello_world():
    global arr
    if request.method == "POST":
        arr = request.form.getlist('new_state[]')
        print(f"From Python: {arr}")

    else:
        return render_template('graph_vis.html', path_graph=arr, point_to_edge=attack_edge)

    return 'OK'


if __name__ == '__main__':
    app.run()
