<template>
    <div>

        <h1>Hello, {{name}}</h1>

    </div>
    
</template>
<script>
export default {

    name: 'Greeter',

    props: {
        name: {type: String}
    },

    data(){
        return {
            
        }
    },


    methods:{

    },
    computed:{

    }    
}
</script>

