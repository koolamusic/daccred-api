# Mappers

Use the Entity Mappers to handle how the controllers response back the the user from the API,
This way we give services the flexibility to return whatever they want and just type and map, the response with Mapper Entities and also handle controller response messages.

This way we abstract the mapping of values the API responds, but also a Mapper returns a Type of DTO or contract to ensure Typesafety