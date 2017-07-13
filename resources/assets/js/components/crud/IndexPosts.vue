<template>
    <div>
        <div class="col-xs-12 col-sm-12 col-md-10 col-md-offset-1">
            <h2>Posts</h2>
            <div class="form-group">
                <button @click.prevent="$router.push('/posts/manage/create')" class="btn btn-primary">
                    <span class="glyphicon glyphicon-plus"></span>
                    Créer un post
                </button>
            </div>
            <p v-if="loading" class="loading-icon"><i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i></p>
            <div class="panel panel-primary" v-else>
                <div class="panel-heading">
                    <h3 class="panel-title">Liste des posts</h3>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                            <tr>
                                <th class="hidden-xs">ID</th>
                                <th>Titre</th>
                                <th>Date de publication</th>
                                <th class="text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="post in posts">
                                <td class="hidden-xs">{{ post.id }}</td>
                                <td><p class="text-capitalize"><router-link :to="'/posts/' + post.id">{{ post.title }}</router-link></p></td>
                                <td><p class="text-capitalize">{{ post.created_at | date }}</p></td>
                                <td>
                                    <div class="pull-right hidden-xs">
                                        <button @click.prevent="editPost(post.id)" class="btn btn-primary">
                                            <span class="glyphicon glyphicon-pencil"></span>
                                            Editer
                                        </button>
                                        <button @click.prevent="deletePost(post.id, post.title)" class="btn btn-warning">
                                            <span class="glyphicon glyphicon-trash"></span>
                                            Supprimer
                                        </button>
                                    </div>
                                    <div class="pull-right visible-xs">
                                        <button @click.prevent="editPost(post.id)" class="btn btn-primary">
                                            <span class="glyphicon glyphicon-pencil"></span>
                                        </button>
                                        <button @click.prevent="deletePost(post.id, post.title)" class="btn btn-warning">
                                            <span class="glyphicon glyphicon-trash"></span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="panel-footer"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                posts: [],
                loading: false
            }
        },
        methods: {
            getPosts () {
                this.loading = true
                axios.get('/api/posts')
                    .then((res) => {
                        this.posts = res.data
                        this.loading = false
                    })
                    .catch((res) => {
                        //
                    })
            },
            deletePost (post_id, post_title) {
                swal({
                    title: "Supprimer " + post_title + " ?",
                    text: "Opération irréversible.",
                    type: "warning",
                    timer: null,
                    showCancelButton: true,
                    confirmButtonText: 'Oui',
                    cancelButtonText: 'Annuler',
                    reverseButtons: true
                }).then(() => {
                    axios.delete('/api/posts/' + post_id)
                        .then((res) => {
                            swal({
                                title: "Post supprimé.",
                                type: "success",
                                showConfirmButton: false
                            }).catch(swal.noop)

                            this.getPosts()
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }).catch(swal.noop)
            },
            editPost (post_id) {
                this.$router.push('/posts/manage/edit/' + post_id)
            }
        },
        mounted () {
            this.getPosts()
        }
    }
</script>

<style>

</style>