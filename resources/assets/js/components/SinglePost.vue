<template>
    <div>
        <div class="col-xs-12 col-sm-12 col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <button class="btn btn-default" @click.prevent="$router.back()">Retour</button>
                </div>
                <div class="panel-body">
                    <h2>{{ post.title }}</h2>
                    <p class="label label-primary">Publié {{ post.created_at | date }}</p>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-body">
                    <p class="lead">{{ post.content }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                post: Object
            }
        },
        props: ['id'],
        methods: {
            getPost () {
                axios.get('/api/posts/' + this.id)
                    .then((res) => {
                        this.post = res.data
                    })
                    .catch((error) => {
                        //console.log(error.response)
                        if (error.response) {
                            this.$router.push('/')
                        }
                    })
            }
        },
        mounted () {
            this.getPost()
        }
    }
</script>