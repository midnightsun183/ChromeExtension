
app.config.backupSettings.priorityOnly['twitter'] = false;

app.config.backupSettings.depthOptions.priorityOnly['twitter'] = true;

app.config.backupSettings.sortBy['twitter'] = [
	{ verified: 'verified' }
];

app.config.backupSettings.depthOptions.binding['twitter'] = {
    name: 'friends_all',
    collect: 'friends',
};

app.config.backupSettings.depthOptions.priority['twitter'] = [
    'home',
    'profile',
    'following',
    'followers',
    'with_replies',
    'media'
];

app.config.backupSettings.priority['twitter'] = [
    'profile',
    'following',
    'followers',
    'with_replies',
    'media',
    'home',
];

//update bind settings
app.config.bindSettings['twitter'] = {
    //bind collection with
    bindWith: 'userId',
    bindValue: '',
    bindDefault: 'me',
	bindings: {
	    userId: {
	        value: '',
	        query: '.nav img',
	        using: 'data-userId',
	        regex: '',
	        binds: '{user_id}',
	        avoid: '{}',
	        format: ''
	    },
	    userName: {
	        value: '',
	        query: '.nav a.DashUserDropdown-userInfoLink',
	        using: 'href',
	        regex: 'twitter.com/{user_name}',
	        binds: '{user_name}',
	        avoid: '{}',
	        format: ''
	    },
	    fullName: {
	        value: '',
	        query: '.nav a.DashUserDropdown-userInfoLink b.fullname',
	        using: 'innerText',
	        regex: '',
	        binds: '{full_name}',
	        avoid: '',
	        format: ''
	    },
	    firstName: {
	        value: '',
	        query: '.nav a.DashUserDropdown-userInfoLink b.fullname',
	        using: 'innerText',
	        regex: '',
	        binds: '{first_name}',
	        avoid: '{}',
	        format: 'split= ,index=0'
	    },
	    profileImage: {
	        value: '',
	        query: '.nav #user-dropdown-toggle img',
	        using: 'src',
	        regex: '',
	        binds: '{profile_image}',
	        avoid: '{}',
	        format: ''
	    }
	}
};

app.config.requireSettings['twitter'] = {
    //require settings
    bindSettings: {
        userId: true,
        userName: true,
        firstName: true,
    },
    //require settings
    searchCollections: {
        key: true,
        value: true,
        userId: true,
        userName: true,
        firstName: true,
        profileImage: true,
        videoId: true,
    },
};

//single - append to existing object
app.config.searchCollections = app.add([
    {
        active: false,
        name: 'home',
        value: 'Home',
        route: [ '/' ],
        service: 'twitter',
        collect: {
            timeline: {
                items: {
                    query: '.stream .stream-items .stream-item',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                fullName: {
                    query: '.stream-item-header .account-group .FullNameGroup .fullname',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '{}',
                    format: ''
                },
                userId: {
                    query: '.stream-item-header .account-group',
                    using: 'data-userId',
                    regex: '',
                    binds: '',
                    avoid: 'undefined',
                    format: ''
                },
                userName: {
                    query: '.stream-item-header .account-group .username b',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
                tweetText: {
                    query: '.js-tweet-text-container .TweetTextSize',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                tweetLink: {
                    query: '.js-tweet-text-container .TweetTextSize a',
                    using: 'href',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
                replies:  {
                    query: '.ProfileTweet-action--reply .ProfileTweet-actionCountForPresentation',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'integer'
                },
                retweets:  {
                    query: '.ProfileTweet-action--retweet .ProfileTweet-actionCountForPresentation',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'integer'
                },
                favorite:  {
                    query: '.ProfileTweet-action--favorite .ProfileTweet-actionCountForPresentation',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'integer'
                },
                cardUrl: {
                    query: '.js-media-container .card-type-summary_large_image',
                    using: 'data-cardUrl',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                cardPublisherId: {
                    query: '.js-media-container .card-type-summary_large_image',
                    using: 'data-publisherId',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                avatar: {
                    query: '.stream-item-header .account-group img.avatar',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
                date:  {
                    query: '.stream-item-header .time a.tweet-timestamp',
                    using: 'title',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: 'string'
                },
                miliseconds:  {
                    query: '.stream-item-header .time a.tweet-timestamp span.js-short-timestamp',
                    using: 'data-timeMs',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: 'integer'
                },
                conversationId:  {
                    query: '.stream-item-header .time a.tweet-timestamp',
                    using: 'data-conversationId',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
            }
        }
    },
    {
        active: false,
        name: 'profile',
        value: 'Profile',
        route: [ '/{user_name}' ],
        service: 'twitter',
        collect: {
            details: {
                items: {
                    query: '.ProfileSidebar .ProfileHeaderCard',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                fullName: {
                    query: 'h1.ProfileHeaderCard-name',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '{}',
                    format: ''
                }, 
                screenName: {
                    query: 'h2.ProfileHeaderCard-screenname',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '{}',
                    format: ''
                }, 
                biography: {
                    query: 'p.ProfileHeaderCard-bio',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                }, 
                location: {
                    query: '.ProfileHeaderCard-locationText a',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                }, 
                placeId: {
                    query: '.ProfileHeaderCard-locationText a',
                    using: 'data-placeId',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                }, 
                websiteUrl: {
                    query: '.ProfileHeaderCard-url a.u-textUserColor',
                    using: 'title',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                }, 
                joinDate: {
                    query: '.ProfileHeaderCard-joinDateText',
                    using: 'title',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
                birthday: {
                    query: '.ProfileHeaderCard-birthdateText',
                    using: 'title',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
            },
            canopy: {
                items: {
                    query: '.ProfileCanopy .ProfileCanopy-inner',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                avatarImage: {
                    query: 'a.profile-picture img',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: '{}',
                    format: ''
                }, 
                avatarAlt: {
                    query: 'a.profile-picture img',
                    using: 'alt',
                    regex: '',
                    binds: '',
                    avoid: '{}',
                    format: ''
                }, 
                headerBackground: {
                    query: '.ProfileCanopy-headerBg img',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: '{}',
                    format: ''
                },
                tweetsCount: {
                    query: '.ProfileNav-list .ProfileNav-item--tweets a .ProfileNav-value',
                    using: 'data-count',
                    regex: '',
                    binds: '',
                    avoid: '{}',
                    format: 'integer'
                },
                followingCount: {
                    query: '.ProfileNav-list .ProfileNav-item--following a .ProfileNav-value',
                    using: 'data-count',
                    regex: '',
                    binds: '',
                    avoid: '{}',
                    format: 'integer'
                },
                listsCount: {
                    query: '.ProfileNav-list .ProfileNav-item--lists a .ProfileNav-value',
                    using: 'data-count',
                    regex: '',
                    binds: '',
                    avoid: '{}',
                    format: 'integer'
                },
                momentsCount: {
                    query: '.ProfileNav-list .ProfileNav-item--moments a .ProfileNav-value',
                    using: 'data-count',
                    regex: '',
                    binds: '',
                    avoid: '{}',
                    format: 'integer'
                }
            },
            timeline: {
                items: {
                    query: '.stream .stream-items .stream-item',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                fullName: {
                    query: '.stream-item-header .account-group .FullNameGroup .fullname',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '{}',
                    format: ''
                },
                userId: {
                    query: '.stream-item-header .account-group',
                    using: 'data-userId',
                    regex: '',
                    binds: '',
                    avoid: 'undefined',
                    format: ''
                },
                userName: {
                    query: '.stream-item-header .account-group .username b',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
                tweetText: {
                    query: '.js-tweet-text-container .TweetTextSize',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                tweetLink: {
                    query: '.js-tweet-text-container .TweetTextSize a',
                    using: 'href',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
                replies:  {
                    query: '.ProfileTweet-action--reply .ProfileTweet-actionCountForPresentation',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'integer'
                },
                retweets:  {
                    query: '.ProfileTweet-action--retweet .ProfileTweet-actionCountForPresentation',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'integer'
                },
                favorite:  {
                    query: '.ProfileTweet-action--favorite .ProfileTweet-actionCountForPresentation',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'integer'
                },
                cardUrl: {
                    query: '.js-media-container .card-type-summary_large_image',
                    using: 'data-cardUrl',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                cardPublisherId: {
                    query: '.js-media-container .card-type-summary_large_image',
                    using: 'data-publisherId',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                avatar: {
                    query: '.stream-item-header .account-group img.avatar',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
                date:  {
                    query: '.stream-item-header .time a.tweet-timestamp',
                    using: 'title',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: 'string'
                },
                miliseconds:  {
                    query: '.stream-item-header .time a.tweet-timestamp span.js-short-timestamp',
                    using: 'data-timeMs',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: 'integer'
                },
                conversationId:  {
                    query: '.stream-item-header .time a.tweet-timestamp',
                    using: 'data-conversationId',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
            },
        }
    },
    {
        active: false,
        name: 'following',
        value: 'Following',
        route: [ '/following', '/{user_name}/following' ],
        service: 'twitter',
        collect: {
            following: {
                items: {
                    query: '.GridTimeline .GridTimeline-items .Grid-cell',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                screenName: {
                    query: '.js-stream-item .ProfileCard',
                    using: 'data-screenName',
                    regex: '',
                    binds: '',
                    avoid: '{}',
                    format: ''
                },
                userId: {
                    query: '.js-stream-item .ProfileCard',
                    using: 'data-userId',
                    regex: '',
                    binds: '',
                    avoid: '{}',
                    format: ''
                },
                userName: {
                    query: '.js-stream-item .ProfileCard a.ProfileCard-bg',
                    using: 'href',
                    regex: 'twitter.com/{user_name}',
                    binds: '{user_name}',
                    avoid: '{}',
                    format: ''
                },
                headerBackground: {
                    query: '.js-stream-item .ProfileCard a.ProfileCard-bg',
                    using: 'style',
                    regex: 'url("{image_url}")',
                    binds: '{image_url}',
                    avoid: '',
                    format: ''
                },
                fullName: {
                    query: '.js-stream-item .ProfileCard .ProfileCard-content a.fullname',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: 'one-line'
                },
                link: {
                    query: '.js-stream-item .ProfileCard .ProfileCard-content .ProfileCard-avatarLink',
                    using: 'href',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
                avatarImage:  {
                    query: '.js-stream-item .ProfileCard .ProfileCard-content .ProfileCard-avatarImage',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
                verified:  {
                    query: '.js-stream-item .ProfileCard .ProfileCard-content .UserBadges .Icon--verified span',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'split= ,index=0'
                },
                biography:  {
                    query: '.js-stream-item .ProfileCard .ProfileCard-content .ProfileCard-userFields p.ProfileCard-bio',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            }
        }
    },
    {
        active: false,
        name: 'followers',
        value: 'Followers',
        route: [ '/followers', '/{user_name}/followers' ],
        service: 'twitter',
        collect: {
            following: {
                items: {
                    query: '.GridTimeline .GridTimeline-items .Grid-cell',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                screenName: {
                    query: '.js-stream-item .ProfileCard',
                    using: 'data-screenName',
                    regex: '',
                    binds: '',
                    avoid: '{}',
                    format: ''
                },
                userId: {
                    query: '.js-stream-item .ProfileCard',
                    using: 'data-userId',
                    regex: '',
                    binds: '',
                    avoid: '{}',
                    format: ''
                },
                userName: {
                    query: '.js-stream-item .ProfileCard a.ProfileCard-bg',
                    using: 'href',
                    regex: 'twitter.com/{user_name}',
                    binds: '{user_name}',
                    avoid: '{}',
                    format: ''
                },
                headerBackground: {
                    query: '.js-stream-item .ProfileCard a.ProfileCard-bg',
                    using: 'style',
                    regex: 'url("{image_url}")',
                    binds: '{image_url}',
                    avoid: '',
                    format: ''
                },
                fullName: {
                    query: '.js-stream-item .ProfileCard .ProfileCard-content a.fullname',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: 'one-line'
                },
                link: {
                    query: '.js-stream-item .ProfileCard .ProfileCard-content .ProfileCard-avatarLink',
                    using: 'href',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
                avatarImage:  {
                    query: '.js-stream-item .ProfileCard .ProfileCard-content .ProfileCard-avatarImage',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
                verified:  {
                    query: '.js-stream-item .ProfileCard .ProfileCard-content .UserBadges .Icon--verified span',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'split= ,index=0'
                },
                biography:  {
                    query: '.js-stream-item .ProfileCard .ProfileCard-content .ProfileCard-userFields p.ProfileCard-bio',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            }
        }
    },
    {
        active: false,
        name: 'with_replies',
        value: 'Tweets & Replies',
        route: [ '/{user_name}/with_replies' ],
        service: 'twitter',
        collect: {
            timeline: {
                items: {
                    query: '.stream .stream-items .stream-item',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                fullName: {
                    query: '.stream-item-header .account-group .FullNameGroup .fullname',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '{}',
                    format: ''
                },
                userId: {
                    query: '.stream-item-header .account-group',
                    using: 'data-userId',
                    regex: '',
                    binds: '',
                    avoid: 'undefined',
                    format: ''
                },
                userName: {
                    query: '.stream-item-header .account-group .username b',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
                tweetText: {
                    query: '.js-tweet-text-container .TweetTextSize',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                tweetLink: {
                    query: '.js-tweet-text-container .TweetTextSize a',
                    using: 'href',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
                replies:  {
                    query: '.ProfileTweet-action--reply .ProfileTweet-actionCountForPresentation',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'integer'
                },
                retweets:  {
                    query: '.ProfileTweet-action--retweet .ProfileTweet-actionCountForPresentation',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'integer'
                },
                favorite:  {
                    query: '.ProfileTweet-action--favorite .ProfileTweet-actionCountForPresentation',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'integer'
                },
                cardUrl: {
                    query: '.js-media-container .card-type-summary_large_image',
                    using: 'data-cardUrl',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                cardPublisherId: {
                    query: '.js-media-container .card-type-summary_large_image',
                    using: 'data-publisherId',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                avatar: {
                    query: '.stream-item-header .account-group img.avatar',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
                date:  {
                    query: '.stream-item-header .time a.tweet-timestamp',
                    using: 'title',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: 'string'
                },
                miliseconds:  {
                    query: '.stream-item-header .time a.tweet-timestamp span.js-short-timestamp',
                    using: 'data-timeMs',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: 'integer'
                },
                conversationId:  {
                    query: '.stream-item-header .time a.tweet-timestamp',
                    using: 'data-conversationId',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
            }
        }
    },
    {
        active: false,
        name: 'media',
        value: 'Media',
        route: [ '/{user_name}/media' ],
        service: 'twitter',
        collect: {
            timeline: {
                items: {
                    query: '.stream .stream-items .stream-item',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                fullName: {
                    query: '.stream-item-header .account-group .FullNameGroup .fullname',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '{}',
                    format: ''
                },
                userId: {
                    query: '.stream-item-header .account-group',
                    using: 'data-userId',
                    regex: '',
                    binds: '',
                    avoid: 'undefined',
                    format: ''
                },
                userName: {
                    query: '.stream-item-header .account-group .username b',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
                tweetText: {
                    query: '.js-tweet-text-container .TweetTextSize',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                tweetLink: {
                    query: '.js-tweet-text-container .TweetTextSize a',
                    using: 'href',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
                replies:  {
                    query: '.ProfileTweet-action--reply .ProfileTweet-actionCountForPresentation',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'integer'
                },
                retweets:  {
                    query: '.ProfileTweet-action--retweet .ProfileTweet-actionCountForPresentation',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'integer'
                },
                favorite:  {
                    query: '.ProfileTweet-action--favorite .ProfileTweet-actionCountForPresentation',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'integer'
                },
                cardUrl: {
                    query: '.js-media-container .card-type-summary_large_image',
                    using: 'data-cardUrl',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                cardPublisherId: {
                    query: '.js-media-container .card-type-summary_large_image',
                    using: 'data-publisherId',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                avatar: {
                    query: '.stream-item-header .account-group img.avatar',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
                date:  {
                    query: '.stream-item-header .time a.tweet-timestamp',
                    using: 'title',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: 'string'
                },
                miliseconds:  {
                    query: '.stream-item-header .time a.tweet-timestamp span.js-short-timestamp',
                    using: 'data-timeMs',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: 'integer'
                },
                conversationId:  {
                    query: '.stream-item-header .time a.tweet-timestamp',
                    using: 'data-conversationId',
                    regex: '',
                    binds: '',
                    avoid: 'undefined,{}',
                    format: ''
                },
            }
        }
    }, 
], app.config.searchCollections );


app.config.searchServices = app.add([
    {
        text: '',
        active: true,
        enable: true,
        name: 'twitter',
        icon: 'twitter',
        domain: 'twitter.com',
        url: 'https://www.twitter.com',
        clickButton: false,
        searchButton: '#sfdiv button[type="submit"]',
        searchForm: '#tsf',
        searchText: '#lst-ib,.gLFyf.gsfi',
        resultLink: '#rso div.srg div.g div.rc h3 a',
        resultDesc: '#rso div.srg div.g div.rc div.s div .st',
        pagifyLink: '#nav a.fl',
        otherTerms: '#brs div.card-section div.brs_col p a',
        repeatLink: '#ofr a',
        pageNumber: '&num=',
        pageStart: '&start=',
        spawnCount: 25,
        resultSize: 100,
        resultAdd: 0
    }
], app.config.searchServices );