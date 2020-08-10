/* Handling the submission of a particular graph state */
function submitTurn() {

    /* Iterate over the entire graph to compute the final state */
    let length = 5;
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

    let validity = "Valid Configuration";

    if (JSON.stringify(previous_state) !== JSON.stringify([0, 0, 0, 0, 0]) || JSON.stringify([0, 0]) !== JSON.stringify(attack_edge))
        validity = datStruct.isValidTransition(previous_state, final_state, attack_edge);
    alert(validity);

    if (validity !== "Valid Configuration") {
        alert(validity);
        return;
    }

    /* Un-highlight the previously highlighted edge */
    unhighlightPrevious(attack_edge[0], attack_edge[1]);

    previous_state = final_state;
    /* Call the attackerAI on the final state to see which edge will be next */
    attack_edge = datStruct.attackerAI(final_state);
    alert("Attacking" + attack_edge);


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
    alert("Unhighlight Entered");
    alert(node1 + " " + node2);
    if (node1 === node2)
        return;
    let prevEdge = edges.get(node1.toString() + "," + node2.toString());

    /* Reset the color, width of the edge */
    prevEdge.color = {color: "#000000"};
    prevEdge.width = 1;

    /*Update the edge by plugging it back into the network */
    edges.update(prevEdge);
}
/* =============================================================================================== */