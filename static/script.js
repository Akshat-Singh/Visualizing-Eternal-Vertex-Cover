/*let nodes = new vis.DataSet([
    {id: 1, label: 1},
    {id: 2, label: 2},
    {id: 3, label: 3},
    {id: 4, label: 4},
    {id: 5, label: 5}
]);

let edges = new vis.DataSet([
    {from: 1, to: 2},
    {from: 2, to: 3},
    {from: 3, to: 4},
    {from: 4, to: 5},
]);

let tile = document.getElementById("network_area");

let data = {
    nodes: nodes,
    edges: edges
}

let network = new vis.Network(tile, data, {});

network.on("click", function(cNode) {
    let nodeId = cNode['nodes']['0'];
    if (nodeId) {
        let clickedNode = nodes.get(nodeId);
        clickedNode.color = {
            border: '#000000',
            background: '#ff0000'
        }
        nodes.update(clickedNode);
    }
}); */

