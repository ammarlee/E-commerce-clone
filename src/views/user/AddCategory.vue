<template>
    <div>
        <form @submit.prevent="addCategory">
        <h2>add category</h2>
        <v-row>
          <v-col cols='12' sm='6' md='10'  class="d-block">
            <v-text-field type="text"   label="name" solo v-model="catName">
            </v-text-field>

          </v-col>
          <v-col cols='12' sm='6' md='6'>
            <label for="">upload image</label>
            <input type="file" label="image" @change="uploadFile" multiple>
          </v-col>
        </v-row>

          <v-btn type="submit" class="text-button mt-4 info  text-capitalize  " >
          save</v-btn>
          <hr>
          <v-simple-table class="mt-15" >
    <template v-slot:default>
      <thead>
        <tr class="text-capitalize red--text">
          <th class="text-left  text-h6 red--text">
            Name
          </th>
          <th class="text-left text-h6 red--text">
            action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in category"
          class="text-h6 text-capitalize"
          :key="item._id"
        >
          <td class="text-h6" @click.prevent="details(item._id)"
          >{{ item.name }}</td>
          <td>
            <v-icon
              class="red--text"
              @click="deleteCategory(item._id)"
            >
              mdi-delete
            </v-icon>
      
      </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
      </form>

    </div>
</template>

<script>
import Functions from '../../../server/api';
    export default {
        name:'addCategory',
        data() {
            return {
                files:[],
                catName:null
            }
        },
        computed:{
           category(){
      return this.$store.getters.getCategory
    }
        },
    methods: {
      async deleteCategory(id){
        let agree = confirm('are you agree')
        if(agree){

        try {
         const res= Functions.deleteCategory(id)
         console.log(res);
       this.alertDisplay('success','deleted ',2000)

         
       } catch (error) {
        //  this.errors = errors
         console.log(error);
       this.alertDisplay('success',error.response,2000)

         
       }
        }

      },
     uploadFile(e){
      const input = e.target.files 
            var reader = new FileReader();
              reader.readAsDataURL(input[0]);
              reader.onload = ()=>{
                    this.files.push(reader.result)
                };
    },
   async  addCategory(){
     
     try {
       const res = await Functions.createCategory(
         {pic:this.files[0],name:this.catName})
       this.alertDisplay('success',res.data.msg,2000)
       
     } catch (error) {
       this.alertDisplay('error','not valid',2000)
       this.errors = error
       
     }
       
      },
     
    },
    }
</script>

<style lang="scss" scoped>

</style>