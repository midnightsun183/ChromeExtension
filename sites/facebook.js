
app.config.backupSettings.priorityOnly['facebook'] = false;

app.config.backupSettings.depthOptions.priorityOnly['facebook'] = true;

app.config.backupSettings.sortBy['facebook'] = [];

app.config.backupSettings.depthOptions.binding['facebook'] = {
    name: 'friends_all',
    collect: 'friends',
};

app.config.backupSettings.depthOptions.priority['facebook'] = [
    'profile',
    'about_overview',
    'about_education',
    'about_living',
    'about_contact_info',
    'about_relationship',
    'about_bio',
    'about_life_events',
    'friends_all',
    'friends_recent',
    'friends_with_unseen_posts',
];

app.config.backupSettings.priority['facebook'] = [
    'home',
    'profile',
    'about_overview',
    'about_education',
    'about_living',
    'about_contact_info',
    'about_relationship',
    'about_bio',
    'about_life_events',
    'friends_all',
    'friends_recent',
    'friends_with_unseen_posts',
    'following',
    'photos_all',
    'photos_of',
    'photos_albums',
];

//update bind settings
app.config.bindSettings['facebook'] = {
    //bind collection with
    bindWith: 'userId',
    bindValue: '',
    bindDefault: 'me',
    bindings: {
        userId: {
            value: '',
            query: '#bluebarRoot div[role="banner"] div[role="navigation"] div[data-click="profile_icon"] a',
            using: 'data-hovercard',
            regex: 'user.php?id={user_id}&',
            binds: '{user_id}',
            avoid: '',
            format: 'integer'
        },
        userName: {
            value: '',
            query: '#bluebarRoot div[role="banner"] div[role="navigation"] div[data-click="profile_icon"] a',
            using: 'href',
            regex: 'facebook.com/{user_name}',
            binds: '{user_name}',
            avoid: '',
            format: ''
        },
        fullName: {
            value: '',
            query: '#userNav .sideNavItem > a > div[dir="ltr"].linkWrap',
            using: 'innerText',
            regex: '',
            binds: '{full_name}',
            avoid: '',
            format: ''
        },
        firstName: {
            value: '',
            query: '#bluebarRoot div[role="banner"] div[role="navigation"] div[data-click="profile_icon"] a span span',
            using: 'innerText',
            regex: '',
            binds: '{first_name}',
            avoid: '',
            format: ''
        },
        profileImage: {
            value: '',
            query: '#bluebarRoot div[role="banner"] div[role="navigation"] div[data-click="profile_icon"] a img',
            using: 'src',
            regex: '',
            binds: '{profile_image}',
            avoid: '',
            format: ''
        }
    }
};

app.config.requireSettings['facebook'] = {
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
        route: [ '/', '/?ref=tn_tnmn' ],
        service: 'facebook',
        collect: {
            newsfeed: {
                items: {
                    query: 'div[role="feed"] .userContentWrapper',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                fullName: {
                    query: 'h5 .fcg a[data-hovercard-prefer-more-content-show="1"]',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '{}',
                    format: ''
                },
                userId: {
                    query: 'h5 .fcg a[data-hovercard-prefer-more-content-show="1"]',
                    using: 'data-hovercard',
                    regex: '.php?id={user_id}&',
                    binds: '{user_id}',
                    avoid: 'undefined',
                    format: ''
                },
                userName: {
                    query: 'h5 .fcg a[data-hovercard-prefer-more-content-show="1"]',
                    using: 'href',
                    regex: 'facebook.com/{user_name}?',
                    binds: '{user_name}',
                    avoid: "undefined,/,{}",
                    format: ''
                },
                groupName: {
                    query: 'h5 .fcg a[data-hovercard-prefer-more-content-show="1"]:nth-child(2n+1)',
                    using: 'outerText',
                    regex: '[\/groups\/].+\>(.)*\<',
                    //find values inside closing and opening arrow >[value]</
                    binds: '><',
                    //avoid match in username property
                    avoid: '[fullName],{}',
                    format: ''
                },
                groupId: {
                    query: 'h5 .fcg a[data-hovercard-prefer-more-content-show="1"]:nth-child(2n+1)',
                    using: 'href',
                    regex: '/groups/{group_id}/',
                    binds: '{group_id}',
                    avoid: 'https:,{}',
                    format: ''
                },
                likes:  {
                    query: '.commentable_item a > span:last-child span[data-hover="tooltip"]',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'integer'
                },
                image: {
                    query: 'a img[width="500"]',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image_alt: {
                    query: 'a img[width="500"]',
                    using: 'alt',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                video: {
                    query: 'div[data-testid="story-subtitle"] span span.fcg a.async_saving',
                    using: 'href',
                    regex: '{video_path}?',
                    binds: '{video_path}',
                    avoid: 'undefined,{}',
                    format: ''
                },
                views:  {
                    query: '.mts div .mtm > div:last-child > div.clearfix .lfloat',
                    using: 'innerText',
                    regex: '{count} ',
                    binds: '{count}',
                    avoid: 'undefined',
                    format: 'integer'
                },
                date:  {
                    query: 'div[data-testid="story-subtitle"] .fcg abbr',
                    using: 'title',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'date'
                },
                text:  {
                    query: '.userContent',
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
        name: 'profile',
        value: 'Profile',
        route: '/{user_name}',
        service: 'facebook',
        collect: {
            timeline: {
                items: {
                    query: '#timeline_story_column .userContentWrapper',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                fullName: {
                    query: 'h5 .fcg a',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                userId: {
                    query: 'h5 .fcg a',
                    using: 'data-hovercard',
                    regex: '.php?id={user_id}&',
                    binds: '{user_id}',
                    avoid: ''
                },
                userName: {
                    query: 'h5 .fcg a',
                    using: 'href',
                    regex: 'facebook.com/{user_name}?',
                    binds: '{user_name}',
                    avoid: "undefined,/",
                    format: ''
                },
                groupName: {
                    query: 'h5 .fcg a:nth-child(2n+1)',
                    using: 'outerText',
                    regex: '[\/groups\/].+\>(.)*\<',
                    //find values inside closing and opening arrow >[value]</
                    binds: '><',
                    //avoid match in username property
                    avoid: '[fullName]',
                    format: ''
                },
                groupId: {
                    query: 'h5 .fcg a:nth-child(2n+1)',
                    using: 'href',
                    regex: '/groups/{group_id}/',
                    binds: '{group_id}',
                    avoid: 'https:',
                    format: ''
                },
                likes:  {
                    query: '.commentable_item a > span:last-child span[data-hover="tooltip"]',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'integer'
                },
                image: {
                    query: 'a img[width="516"]',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image_alt: {
                    query: 'a img[width="516"]',
                    using: 'alt',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                video: {
                    query: 'div[data-testid="story-subtitle"] span span.fcg a.async_saving',
                    using: 'href',
                    regex: '{video_path}?',
                    binds: '{video_path}',
                    avoid: 'undefined',
                    format: ''
                },
                views:  {
                    query: '.mts div .mtm > div:last-child > div.clearfix .lfloat',
                    using: 'innerText',
                    regex: '{count} ',
                    binds: '{count}',
                    avoid: 'undefined',
                    format: 'integer'
                },
                date:  {
                    query: 'div[data-testid="story-subtitle"] .fcg abbr',
                    using: 'title',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'date'
                },
                text:  {
                    query: '.userContent',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            intro: {
                items: {
                    query: '#profile_timeline_intro_card #intro_container_id > div > div > ul.uiList li .textContent',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                text:  {
                    query: 'div',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '[text]',
                    format: ''
                },
                link:  {
                    query: 'a',
                    using: 'href',
                    regex: '',
                    binds: '',
                    avoid: '[link]',
                    format: ''
                },
            },
            featured_photos: {
                items: {
                    query: '#profile_timeline_intro_card div div div a[rel="theater"]',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                image:  {
                    query: 'img',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image_alt:  {
                    query: 'img',
                    using: 'alt',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            photos: {
                items: {
                    query: '#profile_timeline_tiles_unit_pagelets div div div a[rel="theater"]',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                image:  {
                    query: 'img',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image_alt: {
                    query: 'img',
                    using: 'alt',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            friends: {
                items: {
                    query: '#profile_timeline_tiles_unit_pagelets_friends table tr td',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                fullName: {
                    query: 'a',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                userId: {
                    query: 'a',
                    using: 'data-hovercard',
                    regex: 'user.php?id={user_id}&',
                    binds: '{user_id}',
                    avoid: '',
                    format: 'integer'
                },
                userName: {
                    query: 'a',
                    using: 'href',
                    regex: 'facebook.com/{user_name}?',
                    binds: '{user_name}',
                    avoid: "undefined",
                    format: 'one-line'
                },
                profileImage:  {
                    query: 'a img',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            languages: {
                items: {
                    query: '#pagelet_rhc_footer .uiContextualLayerParent .fcg span:first-child, #pagelet_rhc_footer .uiContextualLayerParent .fcg a',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                text:  {
                    query: '',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                link: {
                    query: '',
                    using: 'href',
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
        name: 'friends_all',
        value: 'All Friends',
        route: [ '/{user_name}/friends_all', '/{user_name}/friends?lst='],
        service: 'facebook',
        collect: {
            friends: {
                items: {
                    query: '#pagelet_timeline_medley_friends ul.uiList li',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                fullName: {
                    query: 'div[data-testid="friend_list_item"] > div .uiProfileBlockContent .fcb > a',
                    using: 'innerText',
                    regex: '',
                    binds: '{full_name}',
                    avoid: '',
                    format: ''
                },
                userId: {
                    query: 'div[data-testid="friend_list_item"] > div .uiProfileBlockContent .fcb > a',
                    using: 'data-hovercard',
                    regex: 'user.php?id={user_id}&',
                    binds: '{user_id}',
                    avoid: '',
                    format: 'integer'
                },
                userName: {
                    query: 'div[data-testid="friend_list_item"] > div .uiProfileBlockContent .fcb > a',
                    using: 'href',
                    regex: 'facebook.com/{user_name}?',
                    binds: '{user_name}',
                    avoid: "undefined",
                    format: 'one-line'
                },
                headline: {
                    query: 'div[data-testid="friend_list_item"] > div .uiProfileBlockContent .uiList li span.fwn',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: "undefined",
                    format: ''
                },
                profileImage:  {
                    query: 'div[data-testid="friend_list_item"] > a > img',
                    using: 'src',
                    regex: '',
                    binds: '{profile_image}',
                    avoid: '',
                    format: ''
                },
                totalFriends:  {
                    query: 'div[data-testid="friend_list_item"] > div .uiProfileBlockContent .fcb + a',
                    using: 'innerText',
                    regex: '{count} friends',
                    binds: '{count}',
                    avoid: 'undefined',
                    format: 'integer'
                },
            },
        }
    },
    {
        active: false,
        name: 'friends_recent',
        value: 'Recently Added Friends',
        route: '/{user_name}/friends_recent',
        service: 'facebook',
        collect: {
            friends: {
                items: {
                    query: '#pagelet_timeline_medley_friends ul.uiList li',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                fullName: {
                    query: 'div[data-testid="friend_list_item"] > div .uiProfileBlockContent .fcb > a',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                userId: {
                    query: 'div[data-testid="friend_list_item"] > div .uiProfileBlockContent .fcb > a',
                    using: 'data-hovercard',
                    regex: 'user.php?id={user_id}&',
                    binds: '{user_id}',
                    avoid: '',
                    format: 'integer'
                },
                userName: {
                    query: 'div[data-testid="friend_list_item"] > div .uiProfileBlockContent .fcb > a',
                    using: 'href',
                    regex: 'facebook.com/{user_name}?',
                    binds: '{user_name}',
                    avoid: "undefined",
                    format: 'one-line'
                },
                headline: {
                    query: 'div[data-testid="friend_list_item"] > div .uiProfileBlockContent .uiList li span.fwn',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: "undefined",
                    format: ''
                },
                profileImage:  {
                    query: 'div[data-testid="friend_list_item"] > a > img',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                totalFriends:  {
                    query: 'div[data-testid="friend_list_item"] > div .uiProfileBlockContent .fcb + a',
                    using: 'innerText',
                    regex: '{count} friends',
                    binds: '{count}',
                    avoid: 'undefined',
                    format: 'integer'
                },
            },
        }
    },
    {
        active: false,
        name: 'friends_with_unseen_posts',
        value: 'Friends With New Posts',
        route: '/{user_name}/friends_with_unseen_posts',
        service: 'facebook',
        collect: {
            friends: {
                items: {
                    query: '#pagelet_timeline_medley_friends ul.uiList li',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                fullName: {
                    query: 'div[data-testid="friend_list_item"] > div .uiProfileBlockContent .fcb > a',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                userId: {
                    query: 'div[data-testid="friend_list_item"] > div .uiProfileBlockContent .fcb > a',
                    using: 'data-hovercard',
                    regex: 'user.php?id={user_id}&',
                    binds: '{user_id}',
                    avoid: '',
                    format: 'integer'
                },
                userName: {
                    query: 'div[data-testid="friend_list_item"] > div .uiProfileBlockContent .fcb > a',
                    using: 'href',
                    regex: 'facebook.com/{user_name}?',
                    binds: '{user_name}',
                    avoid: "undefined",
                    format: 'one-line'
                },
                headline: {
                    query: 'div[data-testid="friend_list_item"] > div .uiProfileBlockContent .uiList li span.fwn',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: "undefined",
                    format: ''
                },
                profileImage:  {
                    query: 'div[data-testid="friend_list_item"] > a > img',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                totalPosts:  {
                    query: 'div[data-testid="friend_list_item"] > div .uiProfileBlockContent .fcb + span',
                    using: 'innerText',
                    regex: '{count} new posts',
                    binds: '{count}',
                    avoid: 'undefined',
                    format: 'integer'
                },
            },
        }
    },
    {
        active: false,
        name: 'following',
        value: 'Following',
        route: '/{user_name}/following',
        service: 'facebook',
        collect: {
            following: {
                items: {
                    query: '#pagelet_collections_following .standardLayout ul.uiList li',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                fullName: {
                    query: 'div[data-testid="friend_list_item"] > div .fsl > a',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                userId: {
                    query: 'div[data-testid="friend_list_item"] > div .fsl > a',
                    using: 'data-hovercard',
                    regex: 'user.php?id={user_id}&',
                    binds: '{user_id}',
                    avoid: '',
                    format: 'integer'
                },
                userName: {
                    query: 'div[data-testid="friend_list_item"] > div .fsl > a',
                    using: 'href',
                    regex: 'facebook.com/{user_name}?',
                    binds: '{user_name}',
                    avoid: "undefined",
                    format: 'one-line'
                },
                headline: {
                    query: 'div[data-testid="friend_list_item"] > div .uiList li span.fsm',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: 'undefined',
                    format: ''
                },
                profileImage:  {
                    query: 'div[data-testid="friend_list_item"] > a > img',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                followersCount:  {
                    query: 'div[data-testid="friend_list_item"] > div .fsl + .fcg span:last-child',
                    using: 'innerText',
                    regex: '{count} follower',
                    binds: '{count}',
                    avoid: 'undefined',
                    format: 'integer'
                },
            },
        }
    },
    {
        active: false,
        name: 'about_overview',
        value: 'About Overview',
        route: [ '/{user_name}/about?section=overview', '/{user_name}/about?lst={any}&section=overview' ],
        service: 'facebook',
        collect: {
            overview: {
                items: {
                    query: '#pagelet_timeline_medley_about div:last-child > div > ul.uiList > li > div > div:last-child ul.uiList li > div:first-child ',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                image:  {
                    query: 'a.lfloat img',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: 'a.lfloat + div > div > div',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            contact: {
                items: {
                    query: '#pagelet_timeline_medley_about div:last-child > div > ul.uiList > li > div > div:last-child ul.uiList li a, ul.uiList[data-overviewsection="contact_basic"] li > div',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                key: {
                    query: 'div > span > div:first-child',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                value:  {
                    query: 'div > span > div:last-child',
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
        name: 'about_education',
        value: 'About Education',
        route: [ '/{user_name}/about?section=education', '/{user_name}/about?lst={any}&section=education' ],
        service: 'facebook',
        collect: {
            experience: {
                items: {
                    query: '#pagelet_eduwork .uiList li,.uiList li.fbEditProfileViewExperience',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                image:  {
                    query: 'a.lfloat img',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                title:  {
                    query: 'a.lfloat + div > div > div a',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                link:  {
                    query: 'a.lfloat + div > div > div a',
                    using: 'href',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: 'a.lfloat + div > div > div > div:last-child',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'one-line'
                },
            },
            skills: {
                items: {
                    query: '.fbProfileEditExperiences li a',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link:  {
                    query: '',
                    using: 'href',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
        }
    },
    {
        active: false,
        name: 'about_living',
        value: 'Places You Lived',
        route: [ '/{user_name}/about?section=living', '/{user_name}/about?lst={any}&section=living' ],
        service: 'facebook',
        collect: {
            places: {
                items: {
                    query: '#pagelet_hometown ul.uiList li',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                image:  {
                    query: 'div > div > div.clearfix > img',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                title:  {
                    query: 'div > div > div.clearfix > img + div span a',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                link:  {
                    query: 'div > div > div.clearfix > img + div span a',
                    using: 'href',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: 'div > div > div.clearfix > img + div span + div.fcg',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'one-line'
                },
            },
        }
    },
    {
        active: false,
        name: 'about_contact_info',
        value: 'Contact Information',
        route: [ '/{user_name}/about?section=contact-info', '/{user_name}/about?lst={any}&section=contact-info' ],
        service: 'facebook',
        collect: {
            contact: {
                items: {
                    query: 'ul.uiList li > div > div:last-child ul.uiList li',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                key: {
                    query: 'div.clearfix > div span[role="heading"]',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: 'Overview',
                    format: ''
                },
                value: {
                    query: 'div.clearfix > div:last-child',
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
        name: 'about_relationship',
        value: 'Relationships',
        route: [ '/{user_name}/about?section=relationship', '/{user_name}/about?lst={any}&section=relationship' ],
        service: 'facebook',
        collect: {
            relationship: {
                items: {
                    query: '#pagelet_timeline_medley_about div:last-child > div > ul.uiList li > div > div:last-child > div > div > div',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                key: {
                    query: 'div.clearfix span[role="heading"]',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: 'Overview',
                    format: ''
                },
                value: {
                    query: 'div.clearfix + ul li .lfloat + div div',
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
        name: 'about_bio',
        value: 'About You',
        route: [ '/{user_name}/about?section=bio', '/{user_name}/about?lst={any}&section=bio' ],
        service: 'facebook',
        collect: {
            about: {
                items: {
                    query: '#pagelet_timeline_medley_about div:last-child > div > ul.uiList li > div > div:last-child > div > div > div',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                key: {
                    query: 'div.clearfix span[role="heading"]',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: 'Overview',
                    format: ''
                },
                value: {
                    query: 'div.clearfix + ul li div div span',
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
        name: 'about_life_events',
        value: 'Life Events',
        route: [ '/{user_name}/about?section=year-overviews', '/{user_name}/about?lst={any}&section=year-overviews' ],
        service: 'facebook',
        collect: {
            events: {
                items: {
                    query: '#pagelet_timeline_medley_about div:last-child > div > ul.uiList li > div > div:last-child > div > div > ul > li',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                key: {
                    query: 'div.clearfix > div:first-child',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: 'integer'
                },
                value: {
                    query: 'div.clearfix > div:last-child',
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
        name: 'photos_all',
        value: 'All Photos',
        route: [ '/{user_name}/photos_all', '/{user_name}/photos?lst=' ],
        service: 'facebook',
        collect: {
            photos: {
                items: {
                    query: '#pagelet_timeline_medley_photos ul.fbStarGrid li',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                image: {
                    query: 'a.uiMediaThumb .tagWrapper i.uiMediaThumbImg',
                    using: 'style.backgroundImage',
                    regex: ' url({image_src})',
                    binds: '{image_src}',
                    avoid: 'url(,",)',
                    format: ''
                },
                link: {
                    query: 'a.uiMediaThumb',
                    using: 'href',
                    regex: '',
                    binds: ' ',
                    avoid: '',
                    format: ''
                },
                imageId: {
                    query: 'a.uiMediaThumb',
                    using: 'id',
                    regex: 'pic_{image_id}',
                    binds: '{image_id}',
                    avoid: '',
                    format: ''
                },
                imageAlt: {
                    query: 'a.uiMediaThumb ',
                    using: 'outerHTML',
                    regex: 'aria-label="{text}"',
                    binds: '{text}',
                    avoid: '',
                    format: ''
                },
            },
        }
    },
    {
        active: false,
        name: 'photos_of',
        value: 'Photos of You',
        route: '/{user_name}/photos_of',
        service: 'facebook',
        collect: {
            photos: {
                items: {
                    query: '#pagelet_timeline_medley_photos ul.fbStarGrid li',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                image: {
                    query: 'a.uiMediaThumb .tagWrapper i.uiMediaThumbImg',
                    using: 'style.backgroundImage',
                    regex: ' url({image_src})',
                    binds: '{image_src}',
                    avoid: 'url(,",)',
                    format: ''
                },
                link: {
                    query: 'a.uiMediaThumb',
                    using: 'href',
                    regex: '',
                    binds: ' ',
                    avoid: '',
                    format: ''
                },
                imageId: {
                    query: 'a.uiMediaThumb',
                    using: 'id',
                    regex: 'pic_{image_id}',
                    binds: '{image_id}',
                    avoid: '',
                    format: ''
                },
                imageAlt: {
                    query: 'a.uiMediaThumb ',
                    using: 'outerHTML',
                    regex: 'aria-label="{text}"',
                    binds: '{text}',
                    avoid: '',
                    format: ''
                },
            },
        }
    },
    {
        active: false,
        name: 'photos_albums',
        value: 'Photos Albumns',
        route: '/{user_name}/photos_albums',
        service: 'facebook',
        collect: {
            photos: {
                items: {
                    query: 'table.uiGrid tr:not(:first-child) td > div,table.uiGrid tr:first-child td:last-child > div',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                image: {
                    query: '.uiScaledImageContainer img',
                    using: 'src',
                    regex: ' url({image_src})',
                    binds: '{image_src}',
                    avoid: 'url(,",),{}',
                    format: ''
                },
                link: {
                    query: 'a',
                    using: 'href',
                    regex: '',
                    binds: ' ',
                    avoid: '',
                    format: ''
                },
                title: {
                    query: '.uiScaledImageContainer + div > div > div:first-child span',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                albumStats: {
                    query: '.uiScaledImageContainer + div > div > div:last-child span',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                imageAlt: {
                    query: '.uiScaledImageContainer img',
                    using: 'alt',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
        }
    },
    {
        active: false,
        name: 'groups',
        value: 'Groups',
        route: [ '/{user_name}/groups', '/{user_name}/groups_member?lst=' ],
        service: 'facebook',
        collect: {
            groups: {
                items: {
                    query: '#pagelet_timeline_medley_groups div:last-child ul.uiList li',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '.clearfix div:last-child .mtm .fwb a',
                    using: 'href',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                title:  {
                    query: '.clearfix div:last-child .mtm .fwb a',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                groupId: {
                    query: '.clearfix div:last-child .mtm .fwb a',
                    using: 'data-hovercard',
                    regex: '.php?id={user_id}&',
                    binds: '{user_id}',
                    avoid: '',
                    format: ''
                },
                membersCount: {
                    query: '.clearfix div.lfloat + div.clearfix .mtm .fcg',
                    using: 'innerText',
                    regex: '{count} member',
                    binds: '{count}',
                    avoid: 'member',
                    format: 'integer'
                },
                images:  {
                    query: '.clearfix div.lfloat img',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: '',
                    //multiple items
                    format: 'array'
                },
                headline:  {
                    query: '.clearfix div.lfloat + div.clearfix .mtm .fcg + span',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
        }
    },
    {
        active: false,
        name: 'videos',
        value: 'Videos',
        route: '/{user_name}/videos',
        service: 'facebook',
        collect: {
            videos: {
                items: {
                    query: '#pagelet_timeline_medley_videos > div:last-child > div > ul.fbStarGrid > li',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: 'a[rel="async"]',
                    using: 'href',
                    regex: '',
                    binds: ' ',
                    avoid: '',
                    format: ''
                },
                image: {
                    query: 'a[rel="async"] span div:first-child img',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                videoId: {
                    query: '',
                    using: 'data-fbid',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                label: {
                    query: 'a[rel="async"]',
                    using: 'outerHTML',
                    regex: 'aria-label="{text}"',
                    binds: '{text}',
                    avoid: '',
                    format: ''
                },
            },
        }
    },
/*
    {
        active: false,
        name: 'map',
        value: 'Check-ins',
        route: [ '/{user_name}/map?lst=', '/{user_name}/places_visited?lst=' ],
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'sports',
        value: 'Sports',
        route: [ '/{user_name}/sports?lst=', '/{user_name}/sports_teams?lst=' ],
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'music',
        value: 'Music',
        route: [ '/{user_name}/music?lst=', '/{user_name}/music_favs?lst=' ],
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'movies',
        value: 'Movies',
        route: [ '/{user_name}/movies?lst=', '/{user_name}/video_movies_watch?lst=' ],
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'tv',
        value: 'TV Shows',
        route: [ '/{user_name}/tv?lst=', '/{user_name}video_tv_shows_watch?lst=' ],
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'books',
        value: 'Books',
        route: [ '/{user_name}/books?lst=', '/{user_name}/books_read?lst=' ],
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'likes',
        value: 'Likes',
        route: [ '/{user_name}/likes?lst=', '/{user_name}/likes_all?lst=' ],
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'events',
        value: 'Events',
        route: [ '/{user_name}/events?lst=', '/{user_name}/past_events?lst=' ],
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'questions',
        value: 'Questions',
        route: '/{user_name}/did_you_know?lst=',
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'reviews',
        value: 'Reviews',
        route: '/{user_name}/reviews?lst=',
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'notes',
        value: 'Notes',
        route: '/{user_name}/notes?lst=',
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'find_friends',
        value: 'Find Friends',
        route: [ '/?sk=ff', '/find-friends/browser/' ],
        service: 'facebook',
        collect: {
            people: {
                items: {
                    query: '.friendBrowserCheckboxContentGrid ul li.friendBrowserListUnit',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                fullName: {
                    query: '.friendBrowserContentAlignMiddle .friendBrowserNameTitle a',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                userId: {
                    query: '.friendBrowserContentAlignMiddle .friendBrowserNameTitle a',
                    using: 'data-hovercard',
                    regex: '.php?id={user_id}&',
                    binds: '{user_id}',
                    avoid: '',
                    format: ''
                },
                userName: {
                    query: '.friendBrowserContentAlignMiddle .friendBrowserNameTitle a',
                    using: 'href',
                    regex: 'facebook.com/{user_name}?',
                    binds: '{user_name}',
                    avoid: "undefined,profile.php",
                    format: ''
                },
                headline: {
                    query: '.friendBrowserMarginTopMini .uiGrid tbody tr td .fsm span.fcg',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: "undefined",
                    format: ''
                },
                profileImage:  {
                    query: '.friendBrowserPhotoWrapper img.img',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
        }
    },
    {
        active: false,
        name: 'friend_requests',
        value: 'Friend Requests',
        route: [ '/friends/requests/', '/friends/requests/?split=1&fcref=ft' ],
        service: 'facebook',
        collect: {
            people: {
                items: {
                    query: '#globalContainer > div.fb_content > div.clearfix > div.lfloat > div:first-child div:last-child > div.clearfix',
                    using: 'scroll',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                fullName: {
                    query: 'a.lfloat + div.clearfix div:last-child div.fcg > div > a',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                userId: {
                    query: 'a.lfloat + div.clearfix div:last-child div.fcg > div > a',
                    using: 'data-hovercard',
                    regex: 'user.php?id={user_id}&',
                    binds: '{user_id}',
                    avoid: '',
                    format: 'integer'
                },
                userName: {
                    query: 'a.lfloat + div.clearfix div:last-child div.fcg > div > a',
                    using: 'href',
                    regex: 'facebook.com/{user_name}?',
                    binds: '{user_name}',
                    avoid: "undefined",
                    format: 'one-line'
                },
                headline: {
                    query: 'a.lfloat + div.clearfix div:last-child div.fcg .requestInfoContainer > div:first-child .uiGrid',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: "undefined",
                    format: ''
                },
                reference: {
                    query: 'a.lfloat + div.clearfix div:last-child div.fcg .requestInfoContainer > div:last-child span',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: "undefined",
                    format: ''
                },
                profileImage:  {
                    query: 'a.lfloat img.scaledImageFitWidth',
                    using: 'src',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
        }
    },
    {
        active: false,
        name: 'messages',
        value: 'Messages',
        route: '/messages/t/',
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '#globalContainer #content div > div > div > div:first-child ul[role="grid"] li',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: 'div[role="gridcell"] > a[role="link"] ',
                    using: 'data-href',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '#globalContainer #content > div > div > div > div:last-child div[role="region"] > div:nth-child(3)',
                    using: 'innerText',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'notifications',
        value: 'Notifications',
        route: '/notifications',
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'groups_invited',
        value: 'Groups Invited',
        route: '/groups/?category=invited',
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'your_groups',
        value: 'Your Groups',
        route: '/groups/?category=groups',
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'discover_groups',
        value: 'Discover Groups',
        route: '/groups/?category=discover',
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'activity',
        value: 'Activity',
        route: '/{user_name}/allactivity?privacy_source=activity_log&log_filter=all&category_key=all',
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'settings',
        value: 'Settings',
        route: '/settings',
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'settings_general',
        value: 'Account Settings',
        route: '/settings?tab=account',
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'security',
        value: 'Security Settings',
        route: '/settings?tab=security',
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'blocking',
        value: 'Blocking Settings',
        route: '/settings?tab=blocking',
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'language',
        value: 'Language Settings',
        route: '/settings?tab=language',
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
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
        name: 'mobile',
        value: 'Mobile Settings',
        route: '/settings?tab=mobile',
        service: 'facebook',
        collect: {
            list: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                link: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                user: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                image:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            },
            main: {
                items: {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                }, 
                date:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
                text:  {
                    query: '',
                    using: '',
                    regex: '',
                    binds: '',
                    avoid: '',
                    format: ''
                },
            }
        }
    },
*/
], app.config.searchCollections );


app.config.searchServices = app.add([
    {
        text: '',
        active: true,
        enable: true,
        name: 'facebook',
        icon: 'facebook',
        domain: 'facebook.com',
        url: 'https://www.facebook.com',
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
