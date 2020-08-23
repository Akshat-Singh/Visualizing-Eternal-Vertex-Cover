from flask import Flask, render_template, request, redirect

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True


@app.route('/', methods=["GET", "POST"])
def hello_world():
    return render_template("home.html")


@app.route('/graph_vis', methods=["GET", "POST"])
def visualize():
    global size, guards, player
    if request.method == "POST":
        size = (request.form.get("num_vertices"))
        guards = (request.form.get("total_guards"))
        player = str(request.form.get("path_submit"))
        print(f"{size}, {guards}, {player}")
        return render_template("graph_vis.html", this_size=size, this_guards=guards, this_player=player)

    if request.method == "GET":
        return render_template("graph_vis.html", this_size=size, this_guards=guards, this_player=player)


if __name__ == '__main__':
    app.run()