<template>
    <div>
        <div class="col-xs-12 col-sm-12 col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading"></div>
                <div class="panel-body">
                    <h2>Edition de "{{ post.title }}"</h2>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-body">
                    <form action="#" method="post" class="form">
                        <div class="from-group">
                            <label class="control-label">Titre</label>
                            <input type="text" class="form-control" placeholder="Titre" v-model="post.title">
                        </div>
                        <div class="form-group">
                            <label class="control-label">Contenu</label>
                            <textarea class="form-control" placeholder="Contenu" v-model="post.content"></textarea>
                        </div>
                        <div class="form-group">
                            <select id="select-edit-post" class="form-control" v-model="catID">
                                <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                            </select>
                        </div>
                        <div class="pull-right">
                            <button @click.prevent="updatePost(post.id)" type="submit" class="btn btn-primary">Valider</button>
                            <button @click.prevent="$router.back()" class="btn btn-default">Annuler</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                post: [],
                categories: [],
                postCategory: []
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
                        if (error.response) {
                            this.$router.push('/posts/manage')
                        }
                    })
            },
            getCategories () {
                axios.get('/api/categories')
                    .then((res) => {
                        this.categories = res.data
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            updatePost (post_id) {
                axios.put('/api/posts/' + post_id, {
                    title: this.post.title,
                    content: this.post.content,
                    category_id: $('#select-edit-post').val()
                })
                    .then((res) => {
                        swal({
                            title: "Le post " + '"' + this.post.title + '"' + " a été édité avec succès !",
                            text: "Vous avez été redirigé",
                            type: 'success',
                            timer: 1200,
                            showConfirmButton: false
                        }).catch(swal.noop)

                        this.$router.push('/posts/manage')
                    })
                    .catch((error) => {
                        let errorMessage = error.response.data.title === undefined ?  error.response.data.content :  error.response.data.title

                        swal({
                            title: "Erreur",
                            text: errorMessage,
                            type: "error",
                            timer: 1500,
                            showConfirmButton: false
                        }).catch(swal.noop)
                    })
            }
        },
        computed: {
            catID () {
                return this.post.category_id
            }
        },
        mounted () {
            this.getPost()
            this.getCategories()
        }
    }
</script>