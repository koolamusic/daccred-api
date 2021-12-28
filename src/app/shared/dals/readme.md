# DAL, DTO Wires Cables Plugs

People call it several things, at the core they are just `response & request` but there are conventions adopted to help make sense of it.

- DTOs: Data Transfer objects
- Args: Arguments
- Query: Queries or inputs
- DAL: Data Access Layer/Logic
- DAO: Data Access Object

See this for naming conventions: <https://cassiomolin.com/2016/02/11/give-better-names-to-your-dtos>

Depending on how you choose to refer to, it here we try to be a :) wee bit original with the concept of Wires, which refer to the transportation or currents, thus we have

> Requests over the wire can be referred to as: plugs.
> Response can be sockets.

We can also keep things simple and just say, response and request. And possibly even combine them with `mapper` for domain logic.
