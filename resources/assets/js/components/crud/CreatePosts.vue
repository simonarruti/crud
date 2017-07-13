<template>
    <div>
        <div class="col-xs-12 col-sm-12 col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading"></div>
                <div class="panel-body">
                    <h2>Créer un post</h2>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-body">
                    <form action="#" method="post">
                        <div class="form-group">
                            <label class="control-label">Titre</label>
                            <input type="text" class="form-control" placeholder="Titre" v-model="newPost.title">
                        </div>
                        <div class="form-group">
                            <label class="control-label">Contenu</label>
                            <textarea class="form-control" placeholder="Contenu" v-model="newPost.content"></textarea>
                        </div>
                        <div class="form-group">
                            <label class="control-label">Categorie</label>
                            <select class="form-control" v-model="newPost.categoryId">
                                <option :value="0" disabled>Choisir une catégorie</option>
                                <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                            </select>
                        </div>
                        <div class="pull-right">
                            <button @click.prevent="addPost" type="submit" class="btn btn-primary">Créer</button>
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
                categories: [],
                newPost: {
                    title: "",
                    content: "",
                    categoryId: 0
                }
            }
        },
        methods: {
            addPost () {
                if (this.newPost.categoryId === 0) {
                    swal({
                        title: "Erreur",
                        text: "Vous devez sélectionner une catégorie.",
                        type: "error",
                        showConfirmButton: false
                    }).catch(swal.noop)

                    return
                }

                axios.post('/api/posts', {
                    title: this.newPost.title,
                    content: this.newPost.content,
                    category_id: this.newPost.categoryId
                })
                    .then((res) => {
                        swal({
                            title: 'Nouveau post ajouté !',
                            text: "Vous avez été redirigé.",
                            type: 'success',
                            showConfirmButton: false
                        }).catch(swal.noop)

                        this.$router.push('/posts/manage')
                    })
                    .catch((error) => {
                        let errorMessage = error.response.data.title === undefined ? error.response.data.content : error.response.data.title

                        swal({
                            title: "Erreur",
                            text: errorMessage,
                            type: "error",
                            showConfirmButton: false
                        }).catch(swal.noop)
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
            }
        },
        mounted () {
            this.getCategories()
        }
    }
</script>