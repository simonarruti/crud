<template>
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-content">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <router-link to="/" class="navbar-brand">Crud VueJS / Laravel</router-link>
            </div>

            <div class="collapse navbar-collapse" id="nav-content">
                <ul class="nav navbar-nav navbar-right">
                    <li><router-link to="/categories">Catégories</router-link></li>
                    <li><router-link to="/posts/manage">Posts</router-link></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style>
    .navbar {
        border-radius: 0;
    }
</style>
