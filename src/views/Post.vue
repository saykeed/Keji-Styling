<template>
    <div class="post">
        <h3>Upload Products</h3>

        <form class="uploadForm" ref="getForm" @submit.prevent="uploadProduct">
            <p>Product Title</p>
            <input type="text" name="title" >
            <p>Product Price</p>
            <input type="text" name="price" >
            <p class="imageP">Product Image</p>
            <div class="file">
                <input type="file" name="image" @change="uploadImage">
                <Spinner v-if="spinStatus" class="spin"/>
            </div>
            
            <p>Description</p>
            <textarea name="description" ></textarea>
            <button>Upload</button>
            
        </form>
    </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import { ref } from 'vue';
import { getStorage, uploadBytes, 
ref as storageRef, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getFirestore } from "firebase/firestore";

export default {
    components: { Spinner },
    setup() {

        // variables
        const storage = getStorage();
        const db = getFirestore();
        const getForm = ref(null)
        const spinStatus = ref(false)
        const photoUrl = ref('')
        

        // functions
        const uploadImage = () => {
            spinStatus.value = true
            const imageFile = getForm.value.image.files[0]
            const imageName = imageFile.name +'_' + new Date()
            const imageRef = storageRef(storage, imageName);
            // uploading the selected image file
            uploadBytes(imageRef, imageFile)
            .then(() => {
                console.log('Uploaded a blob or file!');
                // getting the image url 
                const pathReference = storageRef(storage, imageName);
                getDownloadURL(pathReference)
                .then((url) => {
                    photoUrl.value = url;
                    spinStatus.value = false;
                })
            })
            .catch( err => console.log(err, 'error now'))
        }

        const uploadProduct = () => {
            addDoc(collection(db, "Products"), {
                title: getForm.value.title.value,
                price: getForm.value.price.value,
                description: getForm.value.description.value,
                imgUrl: photoUrl.value
            })
            .then((snap) => {
                console.log('uploaded success')
                getForm.value.reset()
            })
            .catch(err => {
                console.log(err)
            })
        }



      return {uploadProduct, uploadImage, getForm, spinStatus }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";

    div.post{

        h3 {
            margin: 20px auto;
        }

        form.uploadForm{
            text-align: left;
            padding: 15px;

            p{
                color: $fadeBlack;
                font-size: 0.8rem;
                margin-bottom: 5px;

                .imageP{
                    display: flex;
                    align-items: center;

                    span{
                        margin-left: 20px;
                    }
                }
            }

            input{
                width: 100%;
                height: 40px;
                padding: 10px;
                border: 1px solid $lightShadow;
                border-radius: 5px;
                margin-bottom: 15px;

                &:focus{
                    outline: none;
                    border: none;
                    border-bottom: 2px solid green;
                }
            }

            div.file{
                height: fit-content;
                width: 100%;
                position: relative;

                .spin{
                    position: absolute;
                    right: 20px;
                }
            }

            textarea{
                width: 100%;
                height: 150px;
                padding: 10px;
                border: 1px solid $lightShadow;
                border-radius: 5px;
                margin-bottom: 20px;

                &:focus{
                    outline: none;
                    border-bottom: 2px solid green;
                }
            }

            button{
                padding: 10px 20px;
                width: 120px;
                border-radius: 20px;
                display: block;
                margin: 0 auto;
                background: green;
                color: white;
                border: none;
            }
        }
    }
</style>