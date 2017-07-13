<template>
    <div>
        <div class="jumbotron">
            <h1>Accueil</h1>
            <p>Nobis quos repudiandae voluptatum? Consectetur eveniet excepturi fuga illum iste minima nihil numquam placeat possimus quis quod repudiandae sunt tenetur, ullam veritatis.</p>
        </div>
        <section class="posts-container col-xs-12 col-sm-12 col-md-10 col-md-offset-1">
            <article v-for="post in posts">
                <div class="panel panel-default ">
                    <div class="panel-heading">
                        <h3>{{ post.title }}</h3>
                        <p class="label label-primary">Publié {{ post.created_at | date }}</p>
                    </div>
                    <div class="panel-body">
                        <p class="lead">{{ post.content }}</p>
                        <p class="pull-right"><router-link :to="'/posts/' + post.id" class="btn btn-default">Lire le post</router-link></p>
                    </div>
                </div>

            </article>
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                posts: []
            }
        },
        methods: {
            getPosts () {
                axios.get('/api/posts')
                    .then((res) => {
                        this.posts = res.data
                    })
                    .catch((res) => {
                        //
                    })
            }
        },
        mounted () {
            this.getPosts()
        }
    }
</script>