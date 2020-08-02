class PathGraph:
    """ Basic class that will emulate a path graph using an single dimensional array """

    def __init__(self, size: int, initial_guards: int):
        """ Parameterized constructor that takes an integer as input, depicting the total nodes in the path graph """
        self.adjacency_matrix = [None] * size
        self.max_size = size
        self.eternal_vertex_cover_number = size - 1
        self.guards = initial_guards
        self.winner = None

    def oneStepWin(self, current_state: list) -> tuple:
        for itr in range(len(current_state)):
            if itr > 0 and (current_state[itr] == 0 and current_state[itr - 1] == 0):
                self.winner = "attacker"
                return itr - 1, itr

            if itr < len(current_state) - 1 and (current_state[itr] == 0 and current_state[itr + 1] == 0):
                self.winner = "attacker"
                return itr, itr + 1

        return -1, -1

    def attackerAI(self, current_state: list) -> tuple:
        """
            Attacker AI that accepts a list consisting of 1s and 0s
            1s - The Node has a guard positioned
            0s - The Node is unguarded
        """
        status = self.oneStepWin(current_state)
        if self.winner == "attacker":
            return status

        for i in range(1, len(current_state) - 1):
            if current_state[i] == 1 and (current_state[i - 1] == 0 and current_state[i + 1] == 0):
                return i, i + 1

        for i in range(1, len(current_state)):
            if current_state[i] == 0:
                return i - 1, i

        return -1, -1


graph = PathGraph(10, 5)

while graph.winner is None:
    new_state = [int(x) for x in input().split()]
    print(f"{graph.attackerAI(new_state)}")


print(f"{graph.winner}")

