let num_guards = 3;
let guards_onboard = 0;

let attack_edge = [1, 2];
let colors = ["#70ca09", "#0ab2dd"];
let graph = [0, 0, 0, 0, 0]

let node_data = [];
let edge_data = [];

let datStruct = new PathGraph(5, 3);

for (let i = 1; i <= graph.length; i++) {
    node_data.push({id: i, label: i.toString()});
    if (i === 1)
        continue;
    edge_data.push({id: (i - 1).toString() + "," + i.toString(), from: i - 1, to: i});
}
let nodes = new vis.DataSet(node_data);

let edges = new vis.DataSet(edge_data);

let tile = document.getElementById("network_area");

let data = {
    nodes: nodes,
    edges: edges
}

/* JSON object containing configuration parameters for nodes and edges of the network */
let config = {
    nodes: {
        color: {
            border: "#000000",
            background: colors[0]
        }
    },
    edges: {
        color: {
            highlight: colors[1],
            color: "#000000"
        }
    }
}
/* ====================================================================================== */

let network = new vis.Network(tile, data, config);


/* What the network does when a node is clicked */
network.on("click", function (cNode) {

    let nodeId = cNode['nodes']['0'];
    if (nodeId) {

        let clickedNode = nodes.get(nodeId);

        if (clickedNode.color === colors[1]) {
            guards_onboard = guards_onboard - 1;
            alert(guards_onboard);
            clickedNode.color = colors[0];
        } else {
            guards_onboard = guards_onboard + 1;
            if (guards_onboard > num_guards) {
                alert("You have more guards than you requested!!");
                guards_onboard = guards_onboard - 1;
            } else
                clickedNode.color = colors[1];
        }
        nodes.update(clickedNode);

        let status_bar = document.getElementById("status_bar");
        status_bar.innerText = "Total Guards: " + num_guards + " | Guards On Board: " + guards_onboard;
    }
});