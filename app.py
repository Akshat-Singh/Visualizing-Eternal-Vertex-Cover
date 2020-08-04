from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/', methods=["GET", "POST"])
def hello_world():
    if request.method == "POST":
        new_arr = request.form.getlist('new_state[]')
        print(f"From Python: {new_arr}")

    else:
        arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
        return render_template('graph_vis.html', path_graph=arr)


if __name__ == '__main__':
    app.run()
