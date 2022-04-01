const fetch = require("node-fetch");

// // Create data to "user" table in Database

// fetch("http://localhost:3000/api/user/registeration",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             "User" : {
//                 "UserName" : "NMIXX",
//                 "UserProfileIMG" : "https://media-exp1.licdn.com/dms/image/C5603AQEo8t4ImDsWtQ/profile-displayphoto-shrink_800_800/0/1639392701850?e=1654128000&v=beta&t=VTSzs6cmppbyLKN05XA7TM51GTEob9V7mP9lfI1CDmY",
//                 "Email" : "nmixxjyp@gmail.com",
//                 "Password" : "oooooo"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/user/registeration",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             "User" : {
//                 "UserName" : "TWICE",
//                 "UserProfileIMG" : "https://media-exp1.licdn.com/dms/image/C5603AQEo8t4ImDsWtQ/profile-displayphoto-shrink_800_800/0/1639392701850?e=1654128000&v=beta&t=VTSzs6cmppbyLKN05XA7TM51GTEob9V7mP9lfI1CDmY",
//                 "Email" : "twicejyp@gmail.com",
//                 "Password" : "jeongyeonissocute"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/user/registeration",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             "User" : {
//                 "UserName" : "Mean",
//                 "UserProfileIMG" : "https://media-exp1.licdn.com/dms/image/C5603AQEo8t4ImDsWtQ/profile-displayphoto-shrink_800_800/0/1639392701850?e=1654128000&v=beta&t=VTSzs6cmppbyLKN05XA7TM51GTEob9V7mP9lfI1CDmY",
//                 "Email" : "mean@gmail.com",
//                 "Password" : "whyyouaresomean"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/user/registeration",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             "User" : {
//                 "UserName" : "Red velvet",
//                 "UserProfileIMG" : "https://media-exp1.licdn.com/dms/image/C5603AQEo8t4ImDsWtQ/profile-displayphoto-shrink_800_800/0/1639392701850?e=1654128000&v=beta&t=VTSzs6cmppbyLKN05XA7TM51GTEob9V7mP9lfI1CDmY",
//                 "Email" : "redvelvetsm@gmail.com",
//                 "Password" : "redvelvetgogo"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/user/registeration",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             "User" : {
//                 "UserName" : "Punch",
//                 "UserProfileIMG" : "https://media-exp1.licdn.com/dms/image/C5603AQEo8t4ImDsWtQ/profile-displayphoto-shrink_800_800/0/1639392701850?e=1654128000&v=beta&t=VTSzs6cmppbyLKN05XA7TM51GTEob9V7mP9lfI1CDmY",
//                 "Email" : "punch@gmail.com",
//                 "Password" : "punchy"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/user/registeration",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             "User" : {
//                 "UserName" : "Oil",
//                 "UserProfileIMG" : "https://scontent.fbkk28-1.fna.fbcdn.net/v/t1.6435-9/132279350_3691890110850036_2012086733869698872_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFmgHWZAMfAw7DqNSrQLsDoWOhLFdOQ1FxY6EsV05DUXFa5KdmAwAL_8lVvFa54YjfmyCPBidsVgFCrf9zTC0jO&_nc_ohc=JVUQIgh_jyMAX92Q6_1&_nc_ht=scontent.fbkk28-1.fna&oh=00_AT8OXQS5Fzf2fRQMH9OiiyiRKSml67hBY3sqazVYDYaI6g&oe=626B8816",
//                 "Email" : "OIJKL@CHATCHAIYADECHX.com",
//                 "Password" : "jask"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/user/registeration",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             "User" : {
//                 "UserName" : "Ming",
//                 "UserProfileIMG" : "https://media-exp1.licdn.com/dms/image/C5603AQEo8t4ImDsWtQ/profile-displayphoto-shrink_800_800/0/1639392701850?e=1654128000&v=beta&t=VTSzs6cmppbyLKN05XA7TM51GTEob9V7mP9lfI1CDmY",
//                 "Email" : "ming@gmail.com",
//                 "Password" : "mingmingming"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/user/registeration",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             "User" : {
//                 "UserName" : "Boat",
//                 "UserProfileIMG" : "https://media-exp1.licdn.com/dms/image/C5603AQG0GrNuUJ278A/profile-displayphoto-shrink_200_200/0/1610433346792?e=1654128000&v=beta&t=5RmQfxbj1nkeqwrqcKEF1sckqn5Ba51X20x6W8Fw350",
//                 "Email" : "boatphuri@hotmail.com",
//                 "Password" : "boatboatboat"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/user/registeration",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             "User" : {
//                 "UserName" : "Bam",
//                 "UserProfileIMG" : "https://media-exp1.licdn.com/dms/image/C5603AQEMU1c1w3NjDA/profile-displayphoto-shrink_200_200/0/1643870719904?e=1654128000&v=beta&t=lONH82iOq3ir4HHZB95V8M0Z_P2m_tAMie9aeFhxilE",
//                 "Email" : "bambam@gmail.com",
//                 "Password" : "bambambam"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/user/registeration",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             "User" : {
//                 "UserName" : "Noona",
//                 "UserProfileIMG" : "https://media-exp1.licdn.com/dms/image/C5603AQF6areWCJQlAg/profile-displayphoto-shrink_800_800/0/1641354524823?e=1654128000&v=beta&t=Szpl34_8Gybg2NgzwoNnlpTaYHsjaTY43xHoSo-eAZM",
//                 "Email" : "Noonana@gmail.com",
//                 "Password" : "nanananoonana"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/user/registeration",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             "User" : {
//                 "UserName" : "Meng",
//                 "UserProfileIMG" : "https://media-exp1.licdn.com/dms/image/C5603AQEe1D9TUfgUeA/profile-displayphoto-shrink_200_200/0/1637729518240?e=2147483647&v=beta&t=e7FaWkApGIz5UqfQvK6RG1nwUPlkVrHFIB_D5MOoN_c",
//                 "Email" : "meng@gmail.com",
//                 "Password" : "mengmeng"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/user/registeration",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             "User" : {
//                 "UserName" : "PreeToa",
//                 "UserProfileIMG" : "https://scontent.fkdt1-1.fna.fbcdn.net/v/t1.6435-9/128634617_106766231291717_397301443636698130_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=V-oy-2qYCCIAX_UG-lH&_nc_ht=scontent.fkdt1-1.fna&oh=00_AT85VhB0QgXz9rqOJ4ZJV1aVTDw_BR1vVotkBrIJnTFuaA&oe=626BBF67",
//                 "Email" : "ToaFullSilly@gmail.com",
//                 "Password" : "ToaNarak"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/user/registeration",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             "User" : {
//                 "UserName" : "Jeongyeon",
//                 "UserProfileIMG" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoTQZOeiXyaJzpemZZRcgDQ4S8sbLxkLKNfQ&usqp=CAU",
//                 "Email" : "jeongyeony@gmail.com",
//                 "Password" : "Jeong123"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/user/registeration",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             "User" : {
//                 "UserName" : "Yaya",
//                 "UserProfileIMG" : "https://pbs.twimg.com/profile_images/1254260244684984320/dMnx5TB3_400x400.jpg",
//                 "Email" : "YayaUras@gmail.com",
//                 "Password" : "Yayauras"
//             }})
//     }
// )

// // Create data to "music" table in Database
// fetch("http://localhost:3000/api/music/add",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Music" : { 
//                 "UserID" : 1, 
//                 "MusicName" : "O.O",  
//                 "MusicFile" : "https://www.youtube.com/watch?v=3GWscde8rM8",
//                 "MusicIMG" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgMeT77YM7d5CMJrZIZDn2xseq0qGvB9a8zg&usqp=CAU"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/music/add",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Music" : { 
//                 "UserID" : 11, 
//                 "MusicName" : "Perfect World",  
//                 "MusicFile" : "https://www.youtube.com/watch?v=fmOEKOjyDxU",
//                 "MusicIMG" : "https://i.ytimg.com/vi/fmOEKOjyDxU/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDLnUz0HhvePFbYOloIiJ9PwLoBiw"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/music/add",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Music" : { 
//                 "UserID" : 11, 
//                 "MusicName" : "Fanfare",  
//                 "MusicFile" : "https://www.youtube.com/watch?v=kRT174IdxuM",
//                 "MusicIMG" : "https://i.ytimg.com/vi/kRT174IdxuM/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLC11UHrBEq9edXI1y6Z4-qww-f-wA"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/music/add",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Music" : { 
//                 "UserID" : 11, 
//                 "MusicName" : "I WANT YOU BACK",  
//                 "MusicFile" : "https://www.youtube.com/watch?v=X3H-4crGD6k",
//                 "MusicIMG" : "https://i.ytimg.com/an_webp/X3H-4crGD6k/mqdefault_6s.webp?du=3000&sqp=CPi-nJIG&rs=AOn4CLCdQWzr2cFyHQp92KSMpQLxrn7qfA"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/music/add",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Music" : { 
//                 "UserID" : 11, 
//                 "MusicName" : "The Feels",  
//                 "MusicFile" : "https://www.youtube.com/watch?v=f5_wn8mexmM",
//                 "MusicIMG" : "https://i.ytimg.com/vi/f5_wn8mexmM/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLC-tykU4D6qLBX-nq1pKpdhgUkOFw"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/music/add",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Music" : { 
//                 "UserID" : 21, 
//                 "MusicName" : "Rainy day",  
//                 "MusicFile" : "https://www.youtube.com/watch?v=hk9Eug4S5fM",
//                 "MusicIMG" : "https://i.ytimg.com/an_webp/hk9Eug4S5fM/mqdefault_6s.webp?du=3000&sqp=CMXPnJIG&rs=AOn4CLCzj_cZz2Jq5q60v5C5p8EfxzXEHQ"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/music/add",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Music" : { 
//                 "UserID" : 21, 
//                 "MusicName" : "So mean",  
//                 "MusicFile" : "https://www.youtube.com/watch?v=PKVWK6Kp5yk",
//                 "MusicIMG" : "https://i.ytimg.com/an_webp/PKVWK6Kp5yk/mqdefault_6s.webp?du=3000&sqp=CJ21nJIG&rs=AOn4CLCqmlmWfaZyOLQphB_3dKPhCz2hrw"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/music/add",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Music" : { 
//                 "UserID" : 21, 
//                 "MusicName" : "Viewer",  
//                 "MusicFile" : "https://www.youtube.com/watch?v=pZbZT6iFC4E",
//                 "MusicIMG" : "https://i.ytimg.com/an_webp/hWiJInqcj7U/mqdefault_6s.webp?du=3000&sqp=CN-6nJIG&rs=AOn4CLD1pUjtqkcQ6u3uVmSxXpLp1iB0Fw"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/music/add",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Music" : { 
//                 "UserID" : 21, 
//                 "MusicName" : "Not me",  
//                 "MusicFile" : "https://www.youtube.com/watch?v=5BnjY9nF1Uk",
//                 "MusicIMG" : "https://i.ytimg.com/an_webp/5BnjY9nF1Uk/mqdefault_6s.webp?du=3000&sqp=CMHCnJIG&rs=AOn4CLA56FqmeOyKC_l1XXvqNmve8bAEpw"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/music/add",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Music" : { 
//                 "UserID" : 31, 
//                 "MusicName" : "Feel My Rhythm",  
//                 "MusicFile" : "https://www.youtube.com/watch?v=R9At2ICm4LQ",
//                 "MusicIMG" : "https://i.ytimg.com/vi/R9At2ICm4LQ/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBjli8ilpqn3hjvkVnwFMZUWGajDQ"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/music/add",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Music" : { 
//                 "UserID" : 31, 
//                 "MusicName" : "Queendom",  
//                 "MusicFile" : "https://www.youtube.com/watch?v=c9RzZpV460k",
//                 "MusicIMG" : "https://i.ytimg.com/vi/c9RzZpV460k/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCslnbww-5PcblvIv_x37D-Nmz6mA"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/music/add",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Music" : { 
//                 "UserID" : 31, 
//                 "MusicName" : "Hello",  
//                 "MusicFile" : "https://www.youtube.com/watch?v=lNvBbh5jDcA",
//                 "MusicIMG" : "https://i.ytimg.com/vi/lNvBbh5jDcA/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDYLxZcPwgHEWdMGWWQVGyoV3h_ew"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/music/add",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Music" : { 
//                 "UserID" : 31, 
//                 "MusicName" : "Psycho",  
//                 "MusicFile" : "https://www.youtube.com/watch?v=uR8Mrt1IpXg",
//                 "MusicIMG" : "https://i.ytimg.com/vi/uR8Mrt1IpXg/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAnAsLcZaI1uWDB4nag1KnNotAUWw"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/music/add",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Music" : { 
//                 "UserID" : 41, 
//                 "MusicName" : "Say yes (Ft.Moon Byul)",  
//                 "MusicFile" : "https://www.youtube.com/watch?v=WpLkJD5jKrQ",
//                 "MusicIMG" : "https://i.ytimg.com/an_webp/WpLkJD5jKrQ/mqdefault_6s.webp?du=3000&sqp=CKS1nJIG&rs=AOn4CLA3q7xLqcdNdYxYAi5rIKs9Sv-qGg"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/music/add",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Music" : { 
//                 "UserID" : 41, 
//                 "MusicName" : "Say yes (Ft.LOCO)",  
//                 "MusicFile" : "https://www.youtube.com/watch?v=6GC8JF2FOgA",
//                 "MusicIMG" : "https://i.ytimg.com/an_webp/6GC8JF2FOgA/mqdefault_6s.webp?du=3000&sqp=CODRnJIG&rs=AOn4CLCjTV46Ze0dMepwaq0VNlf2atPmhQ"
//             }})
//     }
// )


// // //Create data to "playlist" table in Database
// fetch("http://localhost:3000/api/playlist/create",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Playlist" : { 
//                 "PlaylistCreator" : "1", 
//                 "PlaylistName" : "The new of NMIXX",  
//                 "PlaylistIMG" : "https://6.viki.io/image/a8f228c8f7934a078d5a25161c98ac49/dummy.jpeg?s=900x600&e=t"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/playlist/create",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Playlist" : { 
//                 "PlaylistCreator" : 11, 
//                 "PlaylistName" : "I luv Twice",  
//                 "PlaylistIMG" : "https://pbs.twimg.com/media/FLzvztFagAE3y4F.jpg:large"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/playlist/create",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Playlist" : { 
//                 "PlaylistCreator" : 21, 
//                 "PlaylistName" : "What do you MEAN?",  
//                 "PlaylistIMG" : "https://cms.thaiticketmajor.com/imgUpload/imgeditor/9K3Wd57MOIq5vEaSHnUb1U4TurYfYfzNrw7r-0yX4mq9uXB6G8XKVK7FdhAkZKtlPujucYncYrBaFB3OVcc3eoD8zqEMDZJTTqvj6eG6UA.jpg"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/playlist/create",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Playlist" : { 
//                 "PlaylistCreator" : 31, 
//                 "PlaylistName" : "Red Velvet!!!",  
//                 "PlaylistIMG" : "https://thestandom.com/wp-content/uploads/2019/08/20190605-red-velvet.jpg"
//             }})
//     }
// )

// fetch("http://localhost:3000/api/playlist/create",
//     {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ 
//             "Playlist" : { 
//                 "PlaylistCreator" : 41, 
//                 "PlaylistName" : "Say yes, say yes!",  
//                 "PlaylistIMG" : "https://musicnook.co/wp-content/uploads/2020/05/Punch-Say-Hello.jpg"
//             }})
//     }
// )

fetch("http://localhost:3000/api/user_follow",
    {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            ""
        })
    }
)
