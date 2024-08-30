# Prerequisites

> Docker
> 
> Environment variables

---

# How to run this project

### 1. Insert Environment Variables

Navigate to `deploy/tools/env` and create file named `backend.dev.env` and insert environment variables inside.

### 2. That's it

Yes! That's it, you can now start this project by running following in the root project folder:

``docker compose up --build``

---

# Project Description

### Database Structure

    There are 3 entities:
    
    - Player
    - Tournament
    - TournamentPlayer
    
    Player entity represents an user that would have an account, join tournaments and place bets.
    
    Tournament entity represent tournament itself that would be hosted with specified prize pool.
    
    TournamentPlayer entity represents players that joined specific tournaments with their bets and positions in that tournament.
    
    Also there exists a stored procedure that acts as a function triggered when tournament ends.
    
    Function will take tournament id as a parameter and it would find 3 best bets and reward those users with 50%, 30% and 20% prizes.

By adding column joinedAt we have eliminated an edge case where 2 Players would have same bets, then we would look for earliest one to join _( or in real world there would be either sharing of prize or some different variable than joinedAt )_
```mysql
UPDATE Player p
JOIN (
  SELECT playerId, 
         RANK() OVER (ORDER BY bet DESC, joinedAt ASC) AS playerRank
  FROM TournamentPlayer
  WHERE tournamentId = tId
) AS rankedPlayers ON p.id = rankedPlayers.playerId
SET p.balance = CASE 
  WHEN rankedPlayers.playerRank = 1 THEN p.balance + firstPlacePrize
  WHEN rankedPlayers.playerRank = 2 THEN p.balance + secondPlaceprize
  WHEN rankedPlayers.playerRank = 3 THEN p.balance + thirdPlacePrize
  ELSE p.balance
END
WHERE rankedPlayers.playerRank <= 3;
```

## Power of CTEs and Functions

### CTE

CTEs are best used when we want to use complex data that is spread across multiple tables or when we want to do multiple actions.

### Functions

Functions would be best used when we have complex logic that is proven to work and is used on multiple places.

---