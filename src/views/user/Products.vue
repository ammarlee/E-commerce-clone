<template>
<div>
 
  <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  <v-container>
    <div class="dial">
     
     <v-dialog
      v-model="dialog"
      persistent
      max-width="900px"
    >
      <template v-slot:activator>
       
      </template>
        <v-card>
         <v-card-title>
          <span class="headline"> add new product</span>
         </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12" sm='6' md='6'>
               <v-text-field
                  label="name"
                  type="text"
                  required
                  v-model="product.name"
                   ></v-text-field>
              </v-col>
              <v-col cols="12" sm='6' md='6'>
        
             <!-- category  -->
                <v-select
                  v-model="product.category"
                  :items="states"
                  menu-props="auto"
                  label="Select"
                  hide-details
                  prepend-icon="mdi-map"
                  single-line>
                </v-select>
              </v-col>
              <v-col cols="12" sm='6' md='6'>
               <v-text-field
                  label="quantity"
                  type="number"
                  required
                  v-model="product.quantity"
                   ></v-text-field>
              </v-col>
              
              <v-col cols="12" sm='6' md='6'>
               <v-text-field
                 label="price"
                    type="number"
                    required
                    v-model="product.price"
                   ></v-text-field>
              </v-col>
              <v-col cols="12">
               <input type="file"  @change="uploadFile" multiple>
              </v-col>
              <v-col cols="12">
                   <vue-editor v-model="product.description"></vue-editor>
              </v-col>
           
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            v-if="!editmode"
            color="green darken-1"
            text
            type="sumbit"
            @click="handleSubmit"
          >
            Save
          </v-btn>
          <v-btn
            v-if="editmode"
            color="green darken-1"
            text
            type="sumbit"
            @click="editIt"
            
          >
            edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>


<div class="add-product text-center text-capitalize ">
  <h1 class="font-weight-bold">admin page
  </h1>
  <div class="mt-15">

  <v-btn 
  @click="addItem" class="text-button green mr-4 white--text mt-4 text-capitalize  " >
    <v-icon>mdi-plus</v-icon>
    add product</v-btn>
  <v-btn 
  @click="newcategory=!newcategory" class="text-button mr-4 mt-4 green white--text text-capitalize  " >
    <v-icon>mdi-plus</v-icon>
    add category</v-btn>
  </div>


</div>


<!-- add new category -->
<transition
    enter-active-class="animate__animated animate__bounceInLeft"
    leave-active-class="animate__animated animate__bounceOutRight">

    <div v-if='newcategory' 
    class="green mt-4 white--text text-capitalize pr-10 pt-10 pl-10 pb-10" style="max-width:600px ;margin:5px auto">
    <h2>categoryis</h2>
      <add-Category-component></add-Category-component>
    </div>
</transition>

  <v-simple-table class="mt-15" >
    <template v-slot:default>
      <thead>
        <tr class="text-capitalize red--text">
          <th class="text-left  text-h6 red--text">
            Name
          </th>
          <th class="text-left text-h6 red--text">
            price
          </th>
          <th class="text-left text-h6 red--text">
            quantity
          </th>
          <th class="text-left text-h6 red--text">
            action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in desserts"
          class="text-h6 text-capitalize"
          :key="item.name"
        >
          <td class="text-h6" @click.prevent="details(item._id)"
          >{{ item.name }}</td>
          <td class="red--text font-weight-bold "> {{ item.price }}</td>
          <td>{{ item.quantity }}</td>
          <td><v-icon
        
        class="mr-2 green--text " 
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        
        class="red--text"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-container>
</div>

</template>
<script>
import axios from 'axios'
import Functions from '../../../server/api'
import AddCategory from './AddCategory'
import { VueEditor } from "vue2-editor";
  export default {
     components: {
    'add-Category-component': AddCategory,
    VueEditor

  },
    data () {
      return {
        overlay:false,
         content: "<h1>Some initial content</h1>",
        desserts:[],
        product:{
                    name:'ammarlee',
                    img:[],
                    price:null,
                    description:'it will be amazing  ',
                    quantity:null,
                    checked:false,
                    files:null,
                    category:'sports'
      },
         e1: 'sports',
        items: [ { text: 'State 1' }, ],
        dialog:false,
        files: null,
        errors:null,
        pics:[],
        editmode:false,
        id:null,
        catName:null,
        newcategory:false,
        testing:[],
        images:null,
        
        
      }
    },
   async mounted() {
     this.overlay = true
     try {
    const res = await Functions.fetchProducts()
     this.overlay = false
       this.desserts = res.data.posts
       
     } catch (error) {
     this.overlay = false
       this.errors=error
     }
      
      
    },
    computed: {
    user(){
      return this.$store.getters.getUser
    },
   states (){
      return this.$store.getters.getCategory.map(p=>{
        return p.name
      })

    },
   
  },
    methods: {
      onchangePhoto(e){
        const input = e.target.files 
            var reader = new FileReader();
              reader.readAsDataURL(input[0]);
              reader.onload = ()=>{
                    this.testing.push(reader.result)
                };
      },
      uploadFile(e){
      this.images =e.target.files 

    },
   
      details(productId){
      this.$router.push('/details/'+productId)
    },
      editItem(item){
        this.dialog= true
        this.editmode =true
        this.id = item._id
        this.product={
                    name:item.name,
                    img:item.img,
                    price:item.price,
                    category:item.category,
                    description:item.description,
                    quantity:item.quantity,
                    checked:item.checked,
                    files:item.files,
      }


      },
      editIt(){
        console.log('edit');
        this.overlay = true
          const formData = new FormData();
          console.log(this.product.img);
        if(!this.images){
          console.log('111');

       for (const i of Object.keys(this.product.img)) {
             formData.append('files', this.product.img[i])
          }
        } else {

          console.log('222');
          for (const i of Object.keys(this.images)) {
             formData.append('files', this.images[i])
          }
        }
        console.log(this.product);
             formData.append('product',JSON.stringify(this.product))
             formData.append('id',JSON.stringify(this.id))
             formData.append('user',JSON.stringify(this.user))
      Functions.editProduct(formData)
        .then(()=>{
           this.overlay = false
           this.dialog= false
        this.editmode =false
        }).catch((err)=>{
          console.log(err.response);
          this.overlay = false
            this.alertDisplay('error',err.response.data.msg,3000)

        })

      },
      addItem(){
        this.dialog= true
      },
    async  deleteItem(item){
        var r= confirm('are you sure')
        try {
           if (r) {
          this.overlay = true
        const res = await Functions.deleteProduct(item._id)
          this.overlay = false
          console.log(res.data.product);
         this.desserts = this.desserts.filter(p=>{
           return p._id !==item._id
        })
        // this.$store.dispatch('removeProduct',item._id)
           this.alertDisplay('success',res.data.msg,2000)
       
        }
        } catch (error) {
          this.overlay = false
           this.alertDisplay('error','not valid',2000)
           this.errors = error
        }
       

      },
      handleSubmit() {
       this.overlay = true
          const formData = new FormData();
          for (const i of Object.keys(this.images)) {
             formData.append('files', this.images[i])
          }
             formData.append('data',JSON.stringify(this.product))
             formData.append('user',JSON.stringify(this.user))
             console.log('add new product');
         axios.post('https://full-meven-stack.herokuapp.com/file-upload',formData,{
          }).then((res) => {
            this.desserts.push(res.data.products)
            this.dialog= false
            this.overlay = false
            this.alertDisplay('success','added new product',3000)
          }).catch(err=>{
            this.overlay = false
            this.errors = err
          })
          }
    },
           
  }
</script>