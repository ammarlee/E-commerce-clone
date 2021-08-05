<template>
        <v-autocomplete
        class="d-none d-sm-inline"
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        clearable
        hide-details
        hide-selected
        item-text="name"
        item-value="category"
        label="Search "
        solo
        dense
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title>
              Search for your favorite
              <strong>Products</strong>
            </v-list-item-title>
          </v-list-item>
        </template>
        <template v-slot:selection="{ attr, on, item, selected }">
          <v-chip
            v-bind="attr"
            :input-value="selected"
            color="blue-grey"
            class="white--text"
            v-on="on"
          >
            <v-icon left>
              mdi-bitcoin
            </v-icon>
            <span v-text="item.name"></span>
          </v-chip>
        </template>
        <template v-slot:item="{ item }">
          <v-list-item-avatar
            color="indigo"
            class="headline font-weight-light white--text"
          >
          <v-avatar>

          <v-img :src="item.img[0]"></v-img>
          </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content @click="details(item.id)">
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle v-text="item.category"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-bitcoin</v-icon>
          </v-list-item-action>
        </template>
         </v-autocomplete>

</template>

<script>
import Functions from '../../../server/api';
    export default {
        data() {
            return {
            isLoading: false,
            items: [],
            model: null,
            search: null,
            tab: null,
            }
        },
        methods: {
    details(id){
      if (this.$route.name ==='Home') {
        console.log('its the home page ');
          this.$router.push('/details/'+id)
        
      }else{
          this.$router.push('/').then(()=>{
          this.$router.push('/details/'+id)
          })
      }
        }
        },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
       
      model (val) {
        if (val != null) this.tab = 0
        else this.tab = null
      },
      search (val) {
        // Items have already been loaded
        if (this.isLoading) return
        this.isLoading = true

        Functions.searchingbar({name:val}).then(res => {
          console.log(res.data);
            this.items = res.data
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },
    
    },
        
    }
</script>

<style lang="scss" scoped>

</style>