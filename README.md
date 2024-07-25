This repository contains the code for the betacrew-assignment to develop  a node client application capable of requesting and receiving stock ticker data from the BetaCrew exchange server. The goal of this node client is to generate a JSON file as output.

Prerequistes:

Please ensure that you have Node.js version 16.17.0 or higher installed on your system

Steps to run the code:

1) git clone https://github.com/Rayleigh33/betacrew-assignment.git
2) cd betacrew_exchange_server
3) node main.js
4) open another terminal and also run command cd betacrew_exchange_server
5) the run node client.js

This will produce a json file as an output of the code which will contain an array of objects, where each object represents a packet of data with increasing sequences.

For stopping the server just press ctrl+c
