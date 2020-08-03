from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def hello_world():
    arr = [1, 2, 3, 4, 5, 6, 7]
    return render_template('graph_vis.html', path_graph=arr)


if __name__ == '__main__':
    app.run()
