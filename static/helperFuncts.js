/* Handling the submission of a particular graph state */
function submitTurn() {
    unhighlightPrevious(attack_edge[0], attack_edge[1]);

    let length = graph.length;
    let finalState = [];
    let i;
    for (i = 1; i <= length; i++) {
        let currNode = nodes.get(i);
        if (currNode.color === colors[1]) {
            finalState.push(1);
        } else {
            finalState.push(0);
        }
    }
    alert(finalState);
    attack_edge = datStruct.attackerAI(finalState);
    alert(attack_edge);
    pointToEdge(attack_edge[0], attack_edge[1]);
    document.getElementById("attack_bar").innerText = "Attacked Edge: " + attack_edge;
}
/* ==================================================== */


/* Helper function to point to a particular edge on the graph */
function pointToEdge(node1, node2) {
    let assocEdge = edges.get(node1.toString() + "," + node2.toString());
    assocEdge.color = {color: "#ff0000"};
    assocEdge.width = 5;
    edges.update(assocEdge);
}
/* =========================================================== */


/* Helper function to undo the highlight made by the previous function after the attack is ceased */
function unhighlightPrevious(node1, node2) {
    alert(node1.toString() + "," + node2.toString());
    let prevEdge = edges.get(node1.toString() + "," + node2.toString());
    prevEdge.color = {color: "#000000"};
    prevEdge.width = 1;
    edges.update(prevEdge);
}
/* =============================================================================================== */