function nodeClick(cNode) {
    let nodeId = cNode['nodes']['0'];
    if (nodeId) {
        let clickedNode = nodes.get(nodeId);

        if (clickedNode.color === colors[1]) {
            guards_onboard = guards_onboard - 1;
            clickedNode.color = colors[0];
            guard_set.push(parseInt(clickedNode.label));
            clickedNode.label = "";
        }
        else {
            guards_onboard = guards_onboard + 1;
            if (guards_onboard > num_guards) {
                document.getElementById("invattack_alert_message").innerText = "Invalid Transition! You have more guards than you requested";
                $("#invattack_alert").fadeIn(200);
                guards_onboard = guards_onboard - 1;
            }
            else {
                clickedNode.color = colors[1];
                clickedNode.label = "" + guard_set[guard_set.length - 1];
                guard_set.pop();
            }
        }
        nodes.update(clickedNode);

        let status_bar = document.getElementById("status_bar");
        status_bar.innerText = "Total Guards: " + num_guards + " | Guards On Board: " + guards_onboard;
    }
}

function nodeDoubleClick(cNode) {
    let nodeId = cNode['nodes']['0'];
    if (nodeId) {
        let clickedNode = nodes.get(nodeId); 
        clickedNode.color = colors[2]; 
        nodes.update(clickedNode); 
    }
}


function dragStartHandler(dragElement) {
    console.log(dragElement); 
    
    console.log("Length: " + dragElement['nodes'].length);
    if (dragElement['nodes'].length === 0) {
        return; 
    }
    let draggedNode = nodes.get(dragElement['nodes'][0]); 
    
    if(draggedNode.label === undefined) 
        alert("No guard here");
    else {
        alert("Dragging Guard: " + draggedNode.label);
         
    }
    return; 
}

function dragEndHandler(dropElement) {
    if (dropElement['nodes'].length === 0)
        return;
    
    let highlightEdge = edges.get(dropElement["edges"][0]); 
    highlightEdge.color = {color: "#ffff00"};
    
    let newOpts;
    if (parseInt(dropElement["edges"][0][0]) === parseInt(dropElement["nodes"][0]))
        newOpts = {layout: {hierarchial : {direction: "RL", sortMethod: "directed"}}};
    else   
        newOpts = {layout: {hierarchial : {direction: "LR", sortMethod: "directed"}}};
    
    edges.set
    alert(dropElement["nodes"][0]); 
}

function edgeClick(cEdge) {
    let edgeId = cEdge['edges']['0'];
    if (edgeId) {
        alert("Clicked Edge: " + edgeId);
        /*
        let clickedEdge = edges.get(edgeId);

        if (clickedEdge.color === colors[1]) {
            clickedEdge.color = colors[0];
            guard_set.push(parseInt(clickedNode.label));
            clickedNode.label = "";
        }
        else {
            guards_onboard = guards_onboard + 1;
            if (guards_onboard > num_guards) {
                document.getElementById("invattack_alert_message").innerText = "Invalid Transition! You have more guards than you requested";
                $("#invattack_alert").fadeIn(200);
                guards_onboard = guards_onboard - 1;
            }
            else {
                clickedNode.color = colors[1];
                clickedNode.label = "" + guard_set[guard_set.length - 1];
                guard_set.pop();
            }
        }
        nodes.update(clickedNode);

        let status_bar = document.getElementById("status_bar");
        status_bar.innerText = "Total Guards: " + num_guards + " | Guards On Board: " + guards_onboard;
        */
    }
}



/* Handling the submission of a particular graph state */
function submitTurn() {

    /* Iterate over the entire graph to compute the final state */
    let length = graph_size;
    let final_state = [];
    let i;
    for (i = 1; i <= length; i++) {
        let currNode = nodes.get(i);
        if (currNode.color === colors[1])
            final_state.push(parseInt(currNode.label));
        else
            final_state.push(0);

    }

    let validity = "Valid Configuration";

    if (JSON.stringify(previous_state) !== JSON.stringify(Array.from(Array(graph_size), () => 0)) || JSON.stringify([0, 0]) !== JSON.stringify(attack_edge))
        validity = datStruct.isValidTransition(previous_state, final_state, attack_edge);

    if (validity !== "Valid Configuration") {
        document.getElementById("invattack_alert_message").innerText = "Invalid Transition! You cannot move from state " + previous_state + " to " + final_state;
        $("#invattack_alert").fadeIn();
        return;
    }
    /* Un-highlight the previously highlighted edge */
    unhighlightPrevious(attack_edge[0] + 1, attack_edge[1] + 1);

    clone_config = _.cloneDeep(config);
    clone_data = _.cloneDeep(data);
    clone_network = new vis.Network(clone_tile, clone_data, clone_config);
    previous_state = final_state;
    /* Call the attackerAI on the final state to see which edge will be next */
    attack_edge = datStruct.attackerAI(final_state);
    /* Highlight that edge */
    pointToEdge(attack_edge[0] + 1, attack_edge[1] + 1);

    if (datStruct.winner !== "") {
        document.getElementById("winner_alert_message").innerHTML = "The attacker wins with an incontestable attack";
        $("#winner_alert").fadeIn();
        return;
    }

    /* Update the status bar */
    $("#attack_alert").fadeIn();
    document.getElementById("attack_bar").innerText = "Attacked Edge: " + (attack_edge[0] + 1) + " " + (attack_edge[1] + 1);
    document.getElementById("attack_alert_message").innerText = "New Attack on edge: (" + (attack_edge[0] + 1) + ", " + (attack_edge[1] + 1) + ")";
}

/* ==================================================== */


/* Helper function to point to a particular edge on the graph */
function pointToEdge(node1, node2) {
    /* Get the edge by serializing the associated node IDs */
    let assocEdge = edges.get(node1 + "," + node2);
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


/* Helper function to make a default map for guards */
function initialGuardSet(num) {
    let this_guard_set = []
    for (let i = num - 1; i >= 0; i--)
        this_guard_set.push(i + 1);
    return this_guard_set;
}
/* ================================================ */
