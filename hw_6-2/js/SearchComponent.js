Vue.component('search', {
    props: ['search',],
    data: function () {
        return { userSearch: this.search}
    },
    template: `
        <form action="#" class="search-form">
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit" v-on:click="$parent.filter(userSearch)">
                    <i class="fas fa-search"></i>
                </button>
            </form>`,

});

