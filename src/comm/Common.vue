<template>
    <div>
        <h1>member</h1>
    </div>
</template>

<script>
const AppKey = "cea89ae8de735b695191c219555e9ae7"
const QiangTaoKeKey = "JHEyPO7D"
const api = process.env.NODE_ENV === 'production' ?'/api':'http://kk6923.cn';
const qingtaoke = process.env.NODE_ENV === 'production' ?'/qingtaoke':'http://openapi.qingtaoke.com';
const jianshu = process.env.NODE_ENV === 'production' ?'/jianshu':'https://www.jianshu.com';
export default {
 
        AppKey,
        QiangTaoKeKey,
        api,
        qingtaoke,
        jianshu
    
}

</script>

<style scoped>

</style>