# xflix-be
Simple netflix like backend

# Project plan

# DB design


We need only one collection named videos - an arr of videos
Where the one video sample object will be like below:

 {
            "votes": {
                "upVotes": 0,
                "downVotes": 0
            },
            "previewImage": "https://i.ytimg.com/vi/nx2-4l4s4Nw/mqdefault.jpg",
            "viewCount": 83,
            "_id": "60331f421f1d093ab5424489",
            "videoLink": "youtube.com/embed/nx2-4l4s4Nw",
            "title": "Consumed by the Apocalypse",
            "genre": "Movies",
            "contentRating": "12+",
            "releaseDate": "18 Jan 2021"
}

we can have Video model and Votes model and votes data is optional and if not provided we will set the default value as 0 for both the up/down vote field

# Todo 

* Set up a basic express server with cors and common handlers

