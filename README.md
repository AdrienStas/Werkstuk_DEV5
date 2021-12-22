# Werkstuk_DEV5

# CHALLENGES

## /challenges
- Geeft alle challenges in database (GET)
```
[
    {
        "id": 2,
        "naam": "Adrien",
        "email": "adrien.stas@student.ehb.be",
        "opdracht": "voetbal trucje",
        "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "type_id": 1
    },
    {
        "id": 3,
        "naam": "Adrien",
        "email": "adrien.stas@student.ehb.be",
        "opdracht": "voetbal trucje",
        "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "type_id": 1
    }
]
```
---

## /challenges:id
- Geeft challenge weer met gegeven id (GET)
```
{
        "id": 2,
        "naam": "Adrien",
        "email": "adrien.stas@student.ehb.be",
        "opdracht": "voetbal trucje",
        "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "type_id": 1
    }
```
---

## /challenges
- Insert de challenges in de database (POST)
```
{
    "naam": "Bert",
    "email": "bertje08@gmail.com",
    "opdracht": "voetbal trucje",
    "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "type_id": 1
},
```
---

## /challenges/:id
- Update de challenge met het meegegeven id (PUT)
```
{
    "naam": "Bert",
    "email": "bertje.08@hotmail.com",
    "opdracht": "voetbal trucje",
    "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "type_id": 1
}
```
---

## /challenges/:id
- Verwijderd de challenge gelinkt aan het id uit de database (DELETE)
```
{
   
}
```

---

# TYPES

## /types
- Geeft alle types in database (GET)
```
[
    {
        "id": 1,
        "name": "solo"
    },
    {
        "id": 2,
        "name": "duo"
    },
    {
        "id": 3,
        "name": "trio"
    }
]
```
---

## /types:id
- Geeft het type weer met gegeven id (GET)
```
{
    "id": 2,
    "name": "duo"
}
```
---

## /types
- Insert een type in de database (POST)
```
{
    "name": "team"
}
```
---

## /types:id
- Update het type met het meegegeven id (PUT)
```
{
    "name": "teamchallenge"
}
```
---

## /types/:id
- Verwijderd het type gelinkt aan het id uit de database (DELETE)
```
{
    
}
```
---