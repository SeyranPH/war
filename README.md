***Setup***

Requirements: docker, docker-compose

Create local .env in root directory. See .env.sample for an example

```
docker-compose build
docker-compose up
```

For request examples use **postman_collection.json**

***Task Description***

**Stack:**

- JavaScript (TypeScript opt.) 
- NodeJS 
- Npm 
- Git 
- Database (SQL or NoSQL) 

**Descriptions:** 

There are two armies which are going to fight each other. We need an application that will decide who is the winner based on their resources. 
Each army has the following resources: 
- Soldier (S) 
- Gun (G) 
- Tank (T) 
Where resources are specified by client and each resource has health and attack points which are configurable. 

**Requirements:**

Write a RestAPI application which has the following endpoints 
- Create game 
- Client should be send two armies data, ex: 
data = { firstArmy: ['S', 'G', 'G'], secondArmy: ['S', 'T', 'S'] } 
- Execute game 
- The logic of game execution should be realistic and is up to you 
- Should be return the winner 
- Get all games with pagination 
Every game should be stored in a database. 
Every game result should be stored in a database.

**Game Logic**
- Every tank needs 4 people to be useful
- Every gun need 1 man to be useful
- Tanks should be stronger then 4 man with guns
- The winner is the one with more cumulative attack and health points