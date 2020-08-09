class PathGraph{
    constructor(size, initial_guards) {
        this.vertices = size
        this.edges = size - 1;
        this.guards = initial_guards;
        this.eternal_vertex_cover = this.vertices - 1;
        if (this.eternal_vertex_cover <= this.guards)
            this.winner = "defender";
        else
            this.winner = "";
    }

    oneStepWin(current_state){
        for (let i = 0; i < this.vertices; i++) {
            if (i > 0 && (current_state[i] === 0 && current_state[i - 1] === 0)) {
                this.winner = "attacker";
                alert(this.winner);
                return [i - 1, i];
            }
        }
        return [-1, -1];
    }

    attackerAI (current_state){
        status = this.oneStepWin(current_state);
        if (this.currWinner() !== "")
            return status;

        for (let i = 0; i < this.numVertices() - 1; i++) {
            if (current_state[i] === 1 && (current_state[i - 1] === 0 && current_state[i + 1] === 0))
                return [i, i + 1]
        }
        for (let i = 1; i < this.numVertices(); i++) {
            if (current_state[i] === 0)
                return [i - 1, i];
        }
        return [-1, -1];
    }

    numVertices() {
        return this.vertices;
    }

    currWinner() {
        return this.winner;
    }
}