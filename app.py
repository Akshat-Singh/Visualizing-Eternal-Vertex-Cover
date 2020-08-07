from flask import Flask, render_template, request, redirect
from algorithms import PathGraph

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

graph = PathGraph(5, 3)
arr = [0 for i in range(5)]
attack_edge = [-1, -1]


@app.route('/', methods=["GET", "POST"])
def hello_world():
    global arr, attack_edge
    if request.method == "POST":
        arr = request.form.getlist('new_state[]')
        print(f"From Python: {arr}")
        attack_edge = list(graph.attackerAI(arr))
        print("Redirecting")
        return redirect('/')
        # return render_template('graph_vis.html', path_graph=arr, next_edge=attack_edge)
    else:
        print("In Get")
        print(f"Sending: {attack_edge}")
        return render_template('graph_vis.html', path_graph=arr)

    return 'OK'


if __name__ == '__main__':
    app.run()
