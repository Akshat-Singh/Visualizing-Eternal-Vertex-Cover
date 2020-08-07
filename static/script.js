class PathGraph{
    constuctor(size, initial_guards) {
        this.vertices = size
        this.edges = size - 1;
        this.guards = initial_guards;
        this.eternal_vertex_cover = this.vertices;
        if (this.eternal_vertex_cover >= this.vertices - 1)
            this.winner = "defender";
        else
            this.winner = "";
    }

    oneStepWin(current_state){
        for (let i = 0; i < this.vertices; i++) {
            if (i > 0 && (current_state[i] === 0 && current_state[i - 1] === 0)) {
                this.winner = "attacker";
                return [i - 1, i];
            }
        }
        return [-1, -1];
    }

    attackerAI (current_state){
        status = this.oneStepWin();
        if (this.winner !== "")
            return [0, 0];

        for (let i = 0; i < this.vertices - 1; i++) {
            if (current_state[i] === 1 && (current_state[i - 1] === 0 && current_state[i + 1] == 0))
                return [i, i + 1]
        }
        for (let i = 0; i < this.vertices; i++) {
            if (current_state[i] === 0)
                return [i - 1, i];
        }
        return [-1, -1];
    }
}