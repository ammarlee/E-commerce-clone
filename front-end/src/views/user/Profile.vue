<template>
  <v-container fluid>
  <v-card v-if="profile" class="mx-auto mt-15 pl-5 pb-15" style="width:500px"  >
      <v-row align="end" class="fill-height" >
        
        <v-col class="py-0" cols="11">
          <div class="theImg mb-10">
             <v-avatar class="profile rounded-circle d-block" style="margin:10px auto " color="grey" size="164" tile>
                <v-img class="" :src="profile.img"></v-img>
             </v-avatar>
          </div>
          <div>

              <div class="text-h4  text-center pr-10" >profile</div>
                    <v-btn
                      class="mx-2 d-inline"
                      v-if='editmode' @click="edit()"
                      fab
                      dark
                      large
                      color="cyan"
                    >
                      <v-icon dark>
                        mdi-pencil
                      </v-icon>
                     </v-btn>

               <v-row>
                 <v-col cols='8'> 
                   <input type="file" v-if="!editmode"  @change="uploadFile">
                   </v-col>
                
               </v-row>

              

                

               

           
            
          </div>
          
               <v-divider class="mb-10"></v-divider>
               <!-- <label >email</label> -->
               <v-text-field
                  label="email"
                  required
                  :disabled='editmode'
                  v-model="profile.email"
                  type="email"
                  outlined >
                </v-text-field>

                <!-- <label >name</label> -->
               <v-text-field

                  label="name"
                  required
                  :disabled='editmode'
                  v-model="profile.name"
                  type="text"
                  outlined >
                </v-text-field>

               <v-btn 
               class="d-inline" 
               @click="dialog= true" 
               v-if="!editmode">change password...
               </v-btn> 
               <div class="last mt-8">
                  <v-btn v-if="!editmode" @click="editmode =true" class="d-inline mr-2 red" >cancel</v-btn>
                <v-btn
                    v-if="!editmode" class=" green d-inline" @click="upload"
                    :loading="loading"
                    :disabled="loading"
                  >
                    save
                 </v-btn>

               </div>
               <!-- model -->
               <v-row justify="center">
                 <v-dialog
                          v-model="dialog"
                          persistent
                          max-width="600px"
                        >
                          <template v-slot:activator>
                          
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="headline">User Profile</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="12">
                                    <v-text-field
                                      label="old Password*"
                                      type="password"
                                      required
                                      v-model="oldPassword"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12">
                                    <v-text-field
                                      label="new Password*"
                                      type="password"
                                      v-model="newPassword"
                                      required
                                    ></v-text-field>
                                  </v-col>

                                </v-row>
                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="dialog = false"
                              >
                                Close
                              </v-btn>
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="savePassword"
                              >
                                Save
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                  </v-dialog>
                </v-row>
               <!-- model -->


        </v-col>
      </v-row>
  </v-card>
  </v-container>
</template>


<script>
import Functions from '../../../server/api'
import authanticationFunctions from '../../../server/Authantication-Api'


  export default {
   data(){
     return{
       editmode:true,
       profile:null,
       errors:null,
       dialog:false,
       oldPassword:null,
       newPassword:null,
       pic:[],
       user:null,
        loader: null,
        loading: false,
     }
   },
   mounted() {
    
     this.profile= this.$store.getters.getUser
    
   },
   
   methods: {
    async getsyncUser(){
      try {
        const res = await Functions.getUserData(this.profile._id)
        this.profile = res.data.data
        this.$store.commit('setUser',res.data.data)
        
      } catch (error) {
        this.errors = error;
        
      }

     },
      uploadFile(e){
      const input = e.target.files 
        var reader = new FileReader();
          reader.readAsDataURL(input[0]);
          reader.onload = ()=>{
                this.pic.push(reader.result)
            console.log(this.pic);
            };
    },
   async upload(){
      this.loader = 'loading'
      this.loading =true
      try {
        await Functions.updateUserData({pic:this.pic,profile:this.profile})
        this.editmode =true
        this.getsyncUser()
          this.dialogNotifySuccess('you have changed your data',)
        this.loading =false
          this.$router.push('/')
        
      } catch (err) {
        this.errors = err;
        this.loading =false
          this.dialogNotifyError(err.data.msg)
        
      }
    },
   async  savePassword(){
       try {
         await authanticationFunctions.updateUserPassword({
          id:this.profile._id,
          old:this.oldPassword,
          new:this.newPassword,
          email:this.profile.email
        })
          this.dialog = false
          this.dialogNotifySuccess('changd passwrod succesfully',)
           this.$store.dispatch('setUser',null)
            this.$router.push('/')
       } catch (err) {
          this.errors = err;
          this.dialogNotifyError("error  with change password")
         
       }

     },
     edit(){
       this.editmode =false
     },
   },
  }
</script>

<style lang="scss" >
  
</style>