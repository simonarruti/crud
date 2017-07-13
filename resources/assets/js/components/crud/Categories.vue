<template>
    <div>
        <div class="col-xs-12 col-sm-12 col-md-10 col-md-offset-1">
            <h2>Catégories</h2>
            <form method="post" action="#" class="form component-container">
                <div class="form-group">
                    <label class="control-label">Nom de la catégorie</label>
                    <input class="form-control" type="text" placeholder="Nom" v-model="newCategory.name">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary" @click.prevent="addCategory()">
                        <span class="glyphicon glyphicon-plus"></span>
                        Ajouter
                    </button>
                </div>
            </form>
            <p v-if="loading" class="loading-icon"><i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i></p>
            <div class="panel panel-primary" v-else>
                <div class="panel-heading">
                    <h3 class="panel-title">Liste des categories</h3>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead class="thead-inverse">
                            <tr>
                                <th class="hidden-xs">ID</th>
                                <th>Nom</th>
                                <th class="text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="category in categories">
                                <td class="hidden-xs">{{ category.id }}</td>
                                <td><p class="text-capitalize">{{ category.name }}</p></td>
                                <td>
                                    <div class="pull-right hidden-xs">
                                        <button type="button" class="btn btn-primary form-edit-toggle" @click.prevent="editCategory(category)" data-toggle="modal" data-target="#myModal">
                                            <span class="glyphicon glyphicon-pencil"></span>
                                            Editer
                                        </button>
                                        <button class="btn btn-warning" @click.prevent="deleteCategory(category.id, category.name)">
                                            <span class="glyphicon glyphicon-trash"></span>
                                            Supprimer
                                        </button>
                                    </div>
                                    <div class="pull-right visible-xs">
                                        <button type="button" class="btn btn-primary form-edit-toggle" @click.prevent="editCategory(category)" data-toggle="modal" data-target="#myModal">
                                            <span class="glyphicon glyphicon-pencil"></span>
                                        </button>
                                        <button class="btn btn-warning" @click.prevent="deleteCategory(category.id, category.name)">
                                            <span class="glyphicon glyphicon-remove"></span>
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
            <!-- Modal -->
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header bg-primary">
                            <h4 class="modal-title bg-primary" id="myModalLabel">Editer {{ actualCategory.name }}</h4>
                        </div>
                        <form action="#" method="post" class="form" id="form-category-edit">
                            <div class="modal-body">
                                <div class="form-group">
                                    <label class="control-label">Modifier le nom de la catégorie</label>
                                    <input type="text" placeholder="Nom" class="form-control" v-model="actualCategory.name">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Annuler</button>
                                <button type="submit" class="btn btn-primary" data-dismiss="modal" @click.prevent="updateCategory(actualCategory.id)">Valider</button>
                            </div>
                        </form>
                    </div>
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
                newCategory: {
                    name: ""
                },
                actualCategory: {
                    id: "",
                    name: ""
                },
                loading: false
            }
        },
        methods: {
            getCategories () {
                this.loading = true;
                    axios.get('/api/categories')
                        .then((res) => {
                            this.categories = res.data;
                            this.loading = false
                        })
                        .catch((error) => {
                            console.log(error)
                        })
            },
            addCategory () {
                axios.post('/api/categories', {
                    name: this.newCategory.name
                })
                    .then((res) => {
                        this.newCategory.name = "";

                        swal({
                            title: "Nouvelle categorie ajoutée !",
                            type: "success",
                            showConfirmButton: false
                        }).catch(swal.noop);

                        this.getCategories()
                    })
                    .catch((error) => {
                        swal({
                            title: "Erreur",
                            text: error.response.data.name,
                            type: "error",
                            showConfirmButton: false
                        }).catch(swal.noop)
                    })
            },
            deleteCategory (category_id, category_name) {
                swal({
                    title: "Supprimer " + category_name + " ?",
                    text: "Opération irréversible.",
                    type: "warning",
                    timer: null,
                    showCancelButton: true,
                    confirmButtonText: 'Oui',
                    cancelButtonText: 'Annuler',
                    reverseButtons: true,
                }).then(() => {
                    axios.delete('/api/categories/' + category_id)
                        .then((res) => {
                            swal({
                                title: "Catégorie supprimée.",
                                type: "success",
                                showConfirmButton: false
                            }).catch(swal.noop);

                            this.getCategories()
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }).catch(swal.noop)

            },
            editCategory (category) {
                this.actualCategory.id = category.id;
                this.actualCategory.name = category.name
            },
            updateCategory (category_id) {
                axios.put('/api/categories/' + category_id, {
                    name: this.actualCategory.name
                })
                    .then((res) => {
                        swal({
                            title: "La categorie " + '"' + this.actualCategory.name + '"' + " a été éditée avec succès !",
                            type: 'success',
                            showConfirmButton: false,
                            showLoaderOnConfirm: true
                        }).catch(swal.noop);

                        this.getCategories()
                    })
                    .catch((error) => {
                        swal({
                            title: "Erreur",
                            text: error.response.data.name,
                            type: "error",
                            showConfirmButton: false
                        }).catch(swal.noop)
                    })
            }
        },
        mounted () {
            this.getCategories()
        }
    }
</script>
