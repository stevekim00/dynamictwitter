var users = {
    user1: {
        userName: '@elonmusk',
        displayName: 'Elon Musk',
        joinedDate: 'June 2009',
        followingCount: 103,
        followerCount: 47900000,
        avatarURL: 'assets/elonmusk.jpg',
        coverPhotoURL: 'assets/elonmusk-cover.jpeg',
        tweets: [
            {
                text: 'I admit to judging books by their cover',
                timestamp: '2/10/2021 00:01:20'
            },
            {
                text: 'Starship to the moon',
                timestamp: '2/09/2021 18:37:12'
            },
            {
                text: 'Out on launch pad, engine swap underway',
                timestamp: '2/09/2021 12:11:51'
            }
        ]
    },
    user2: {
        userName: '@BillGates',
        displayName: 'Bill Gates',
        joinedDate: 'June 2009',
        followingCount: 274,
        followerCount: 53800000,
        avatarURL: 'assets/billgates.jpg',
        coverPhotoURL: 'assets/billgates-cover.jpeg',
        tweets: [
            {
                text: 'Everybody asks, how is the next Windows coming along? But nobody asks how is Bill? :/',
                timestamp: '2/10/2021 00:01:20'
            },
            {
                text: 'Should I start tweeting memes? Let me know in a comment.',
                timestamp: '2/09/2021 18:37:12'
            },
            {
                text: 'In 2020, I read a book every hour.',
                timestamp: '2/09/2021 12:11:51'
            }
        ]
    }
}

const urlParams = new URLSearchParams(window.location.search);

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

var user = users[getUrlParameter('user')];

$("#header").html(`
    <h3 class="display-name" id="header-display-name">${user.displayName}</h3>
    <img id="verified-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/240px-Twitter_Verified_Badge.svg.png">
`);

$("#cover").css({backgroundImage: `url(${user.coverPhotoURL})`, backgroundSize:`contain`, height:`199.33px`, backgroundRepeat:`no-repeat`});

function nFormatter(num, digits) {
    var si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "G" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "P" },
      { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }

var formattedFollowingCount = nFormatter(user.followingCount, 3);
var formattedFollowerCount = nFormatter(user.followerCount, 3);

$("#profile").html(`
    <div id="profile-image-main-container">
        <img id="profile-image-main" src="${user.avatarURL}">
    </div>
    <div class="display-name-container">
        <h3 class="display-name" id="profile-display-name">${user.displayName}</h3>
        <img id="verified-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/240px-Twitter_Verified_Badge.svg.png">
    </div>
    <p id="profile-username">${user.userName}</p>
    <p id="joined-date">Joined ${user.joinedDate}</p>
    <div id="follow-counts">
        <p id="following-count"><span class="count">${formattedFollowingCount}</span> Following</p>
        <p id="followers-count"><span class="count">${formattedFollowerCount}</span> Followers</p>
    </div>
`);

$("#contents").html(`
    </div class="contents-container">
        <div class="contents-links" id="contents-tweets"><h4>Tweets</h4></div>
    </div>
    </div class="contents-container">
        <div class="contents-links" id="contents-tweets-and-replies"><h4>Tweets & replies</h4></div>
    </div>
    </div class="contents-container">
        <div class="contents-links" id="contents-media"><h4>Media</h4></div>
    </div>
    </div class="contents-container">
        <div class="contents-links" id="contents-likes"><h4>Likes</h4></div>
    </div>
`);

user.tweets.forEach(function(tweet, i) {
    let tweetDate = new Date(tweet.timestamp);
    let currentDate = new Date();
    let differenceInTime = currentDate.getTime() - tweetDate.getTime();
    let differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    $("#tweet-log").append(`
        <div class="tweet">
            <div class="left-section">
                <img class="tweet-profile-photo" src=${user.avatarURL}>
            </div>
            <div class="middle-section">
                <div class="tweet-profile-info">
                    <h4 class="tweet-display-name">${user.displayName}</h4>
                    <img id="verified-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/240px-Twitter_Verified_Badge.svg.png">
                    <p class="tweet-username-and-timestamp"><span id="username">${user.userName}<span> · ${differenceInDays}d</p>
                </div>
                <div class="tweet-text-container">
                    <p class="tweet-text">${tweet.text}</p>
                </div>
            </div>
        </div>
    `);
})