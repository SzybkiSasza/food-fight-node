[![Build Status](https://travis-ci.org/SzybkiSasza/food-fight-node.svg?branch=master)](https://travis-ci.org/SzybkiSasza/food-fight-node)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/bfd36a1f0f0240dcaef6da08d7eef8ca)](https://www.codacy.com/app/SzybkiSasza/food-fight-node?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SzybkiSasza/food-fight-node&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/bfd36a1f0f0240dcaef6da08d7eef8ca)](https://www.codacy.com/app/SzybkiSasza/food-fight-node?utm_source=github.com&utm_medium=referral&utm_content=SzybkiSasza/food-fight-node&utm_campaign=Badge_Coverage)

# food-fight-node

A simple microservice library

## Motivation

We wanted to build simple to use, modern and stable library that will allow anyone to start their journey into Microservice world or build a big, scalable application in glance.

There are already many libraries out there, serving a lot of purposes - transport-independent, universal, with flexible configuration, tying to Express and other libraries.

The purpose of this library is to deliver simple, yet effective way of exchanging information between different business logic parts without worrying about underlying technology.

## Current state of the library

This library is still WIP (`Work In Progress`). Currently, only `Direct` transport is fully implemented. 

Each new release available on NPM should uncover new transport implementation and multiple performance fixes. Stay tuned!

## Microservices primer

Base idea between microservice architecture is to build an infrastructure that is loosely coupled, with possibility of separating responsibilities.

The communication should be reliable and standardized, in a way that every request is traceable understandable.

Each microservice (in a perfect world) represents one entity from the application - e.g. Users, Locations, Orders etc. and is responsible only for processing specific part of data.

Hence, each flow in a microservice architecture is a complicated chain (or, actually - a tree) of calls that get propagated after initial call was made.

To achieve such goal, we present architecture with two underlying (actually, three ;) ) transports:

- HTTP/Socket Transport - allows for fast exchange of data, works both ways and guarantees small latencies
- Queue Transport - does not guarantee delivery, but allows for high throughput and queueing of messages

Each microservice may expose or consume any combination of transports, using both "fast" and "queued" transports when needed.

## Technological stack

Library is written as a standalone NodeJS lib, supporting both older and newer versions of Node (preferred LTS).

We use following back-ends for our transports:

- `RabbitMQ` for queue transport. Allows for scalability and high throughput processing of queued messages
- `Consult + Socket.io` for fast communication. Allows for service discovery + low-latency message exchange after initial sockets are established.

## Demos

Demos folder contains examples on how to use different transports. For more details, please refer to a [DEMOS README](demos/README.md).

## Prerequisites

As currently only Direct transport is supported, library may be used out-of-the box, without any additional Back End.

In the future, we recommend to start with default configurations of RabbitMQ and Consul (by using e.g. official Docker images).