<template>
    <div class="star" :class="starType">
        <span v-for="item in itemClasses" :key="item" :class="item" class="star-item"></span>
    </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'bg-image_on';
const CLS_HALF = 'bg-image_half';
const CLS_OFF = 'bg-image_off';

export default {
    props:{
        size:{
            type: Number
        },
        score:{
            type: Number
        }
    },
    computed:{
        starType(){
            return 'star-'+this.size;
        },
        itemClasses(){
                let result = [];
                let score = Math.floor(this.score * 2) / 2;
                let hasDecimal = score % 1 !== 0;
                let integer = Math.floor(score);
                for (let i = 0; i < integer; i++) {
                    result.push(CLS_ON + '_' + this.size);
                }
                if (hasDecimal) {
                    result.push(CLS_HALF + '_' + this.size);
                }
                while (result.length < LENGTH) {
                    result.push(CLS_OFF + '_' + this.size);
                }
                return result;
         }
    },
    data() {
        return {
        }
    },
}
</script>

<style scoped lang="scss">
.star{
    font-size: 0;

    .star-item{
        display: inline-block;
        background-repeat: no-repeat;
            
        }
}
.star-48{
           .star-item{
               width: 20px;
               height: 20px;
               margin-right: 22px;
               background-size: 20px 20px;
           } 
           .star-item:last-child{
               margin-right: 0;
           }
        }
    .star-36{
            .star-item{
               width: 15px;
               height: 15px;
               margin-right: 16px;
               background-size: 15px 15px;
           } 
           .star-item:last-child{
               margin-right: 0;
           }
        }
    .star-24{
            .star-item{
               width: 10px;
               height: 10px;
               margin-right: 3px;
               background-size: 10px 10px;
           } 
           .star-item:last-child{
               margin-right: 0;
           }
        }
</style>