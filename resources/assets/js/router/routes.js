export const routes = [
    {
        path: "/",
        component: require('../components/Home.vue')
    },
    {
        path: "/categories",
        component: require('../components/crud/Categories.vue')
    },
    {
        path: "/posts",
        component: require('../components/Posts.vue'),
        children: [
            {
                path: ":id(\\d+)",
                component: require('../components/SinglePost.vue'),
                props: true
            },
            {
                path: "manage",
                component: require('../components/crud/IndexPosts.vue'),

            },
            {
                path: "manage/create",
                component: require('../components/crud/CreatePosts.vue')
            },
            {
                path: "manage/edit/:id(\\d+)",
                component: require('../components/crud/EditPosts.vue'),
                props: true
            },
            {
                path: '*',
                component: require('../components/404.vue')
            }
        ]
    },
    {
        path: '*',
        component: require('../components/404.vue')
    }
]