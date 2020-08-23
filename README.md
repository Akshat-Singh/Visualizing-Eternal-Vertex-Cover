# Visualizing-Eternal-Vertex-Cover

## Introduction
The Eternal Vertex problem is a graph theory attack-defense strategy game introduced by Prof. William Klostermeyer. A fixed number of guards is placed on the vertices of the graph, the guards are free move from their original position to a neighbouring vertex (as long as it is not already occupied by another graph).  A sequence of attacks play out on the edges of the graph. The guards have to move across an edge (from one end-point vertex to the other) to defend the attack. In the meanwhile, guards situated on non-associated vertices may choose to move to a neighbouring vertex or remain stationed. If any sequence of attacks can be defended from a particular starting configuration, the configuration is called a defense strategy, and the number of guards is said to be the eternal vertex cover number. 

## Installation Instructions
1. Make sure flask is installed on your device (pip3 install flask)<br> 
2. Fork the repository on your device<br>
3. Open terminal/powershell in the folder, and run 'flask run' or 'python3 app.py'<br>
4. The server will run on 127.0.0.1:5000. Go to a browser, and visit 127.0.0.1:5000 to access locally<br>
