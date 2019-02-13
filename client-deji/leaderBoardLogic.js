const games = [
  {
    "id": 1,
    "score": "50",
    "user_id": 1,
    "created_at": "2019-02-13T10:01:37.346Z",
    "updated_at": "2019-02-13T10:01:37.346Z"
  },
  {
    "id": 2,
    "score": "65",
    "user_id": 1,
    "created_at": "2019-02-13T10:01:55.165Z",
    "updated_at": "2019-02-13T10:01:55.165Z"
  },
  {
    "id": 3,
    "score": "12",
    "user_id": 2,
    "created_at": "2019-02-13T10:02:02.417Z",
    "updated_at": "2019-02-13T10:02:02.417Z"
  },
  {
    "id": 4,
    "score": "80",
    "user_id": 2,
    "created_at": "2019-02-13T10:02:06.518Z",
    "updated_at": "2019-02-13T10:02:06.518Z"
  },
  {
    "id": 5,
    "score": "0",
    "user_id": 3,
    "created_at": "2019-02-13T10:33:23.872Z",
    "updated_at": "2019-02-13T10:33:23.872Z"
  },
  {
    "id": 6,
    "score": "33.30000000000067",
    "user_id": 13,
    "created_at": "2019-02-13T14:30:06.905Z",
    "updated_at": "2019-02-13T14:30:06.905Z"
  },
  {
    "id": 7,
    "score": "24",
    "user_id": 14,
    "created_at": "2019-02-13T14:31:38.485Z",
    "updated_at": "2019-02-13T14:31:38.485Z"
  }
]
const users = [
  {
    "id": 1,
    "name": "Deji",
    "games": [
      {
        "user_id": 1,
        "id": 1,
        "score": "50"
      },
      {
        "user_id": 1,
        "id": 2,
        "score": "65"
      }
    ]
  },
  {
    "id": 2,
    "name": "Tim",
    "games": [
      {
        "user_id": 2,
        "id": 3,
        "score": "12"
      },
      {
        "user_id": 2,
        "id": 4,
        "score": "80"
      }
    ]
  },
  {
    "id": 3,
    "name": "Harry",
    "games": [
      {
        "user_id": 3,
        "id": 5,
        "score": "0"
      }
    ]
  },
  {
    "id": 4,
    "name": "Baby",
    "games": [

    ]
  },
  {
    "id": 5,
    "name": "Mr. Mike",
    "games": [

    ]
  },
  {
    "id": 6,
    "name": "G",
    "games": [

    ]
  },
  {
    "id": 7,
    "name": "G",
    "games": [

    ]
  },
  {
    "id": 8,
    "name": "G",
    "games": [

    ]
  },
  {
    "id": 9,
    "name": "G",
    "games": [

    ]
  },
  {
    "id": 10,
    "name": "TimmyT",
    "games": [

    ]
  },
  {
    "id": 11,
    "name": "W",
    "games": [

    ]
  },
  {
    "id": 12,
    "name": "W",
    "games": [

    ]
  },
  {
    "id": 13,
    "name": "John",
    "games": [
      {
        "user_id": 13,
        "id": 6,
        "score": "33.30000000000067"
      }
    ]
  },
  {
    "id": 14,
    "name": "hhh",
    "games": [
      {
        "user_id": 14,
        "id": 7,
        "score": "24"
      }
    ]
  }
]
const gamesDesc  = games.sort(function(a, b){return b.score - a.score})
let newA = []
let objs = {}

function top5Scores() {
	for (let i = 0; i < gamesDesc.length; i++) {
	   if (objs[gamesDesc[i].user_id]) {
     } else {
	   objs[gamesDesc[i].user_id] = 'done'
	    newA.push(gamesDesc[i])
    }
  }
return newA.slice(0,5)
}

const top5Names = (array) => {
  return array.map(game => {
    console.log(game)
    return users.find(user => user.id === game.user_id )
  })
}
