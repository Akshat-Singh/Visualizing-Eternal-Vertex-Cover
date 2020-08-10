/* Handling the submission of a particular graph state */
function submitTurn() {
    /* Un-highlight the previously highlighted edge */
    unhighlightPrevious(attack_edge[0], attack_edge[1]);

    /* Iterate over the entire graph to compute the final state */
    let length = graph.length;
    let final_state = [];
    let i;
    for (i = 1; i <= length; i++) {
        let currNode = nodes.get(i);
        if (currNode.color === colors[1])
            final_state.push(1);
        else
            final_state.push(0);

    }
    alert(final_state);

    /* Call the attackerAI on the final state to see which edge will be next */
    attack_edge = datStruct.attackerAI(final_state);
    alert(attack_edge);

    /* Highlight that edge */
    pointToEdge(attack_edge[0], attack_edge[1]);

    /* Update the status bar */
    document.getElementById("attack_bar").innerText = "Attacked Edge: " + attack_edge;
}
/* ==================================================== */


/* Helper function to point to a particular edge on the graph */
function pointToEdge(node1, node2) {
    /* Get the edge by serializing the associated node IDs */
    let assocEdge = edges.get(node1.toString() + "," + node2.toString());

    /* Change the color, width of the edge */
    assocEdge.color = {color: "#ff0000"};
    assocEdge.width = 5;

    /* Update the edge by plugging it back to the network */
    edges.update(assocEdge);
}
/* =========================================================== */


/* Helper function to undo the highlight made by the previous function after the attack is ceased */
function unhighlightPrevious(node1, node2) {
    /* Get the edge by serializing the associated node IDs */
    let prevEdge = edges.get(node1.toString() + "," + node2.toString());

    /* Reset the color, width of the edge */
    prevEdge.color = {color: "#000000"};
    prevEdge.width = 1;

    /*Update the edge by plugging it back into the network */
    edges.update(prevEdge);
}
/* =============================================================================================== */