<template>
    <div class="loading-container">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script type="text/javascript">
    export default {
    	name: 'loading'
    }
</script>

<style scoped lang="scss">
    @keyframes loading1 {
        0%,60%,100% {transform: scale(1);}
        30% {transform: scale(2.5);}
    }

    .loading-container{
        position: absolute; left: 0; top: 0;
        width: 100%; height: 100%;
        background: rgba(0,0,0, .5);
        display: flex; align-items: center; justify-content: center;
        div{
            width: .5rem; height: .5rem;
            border-radius: 50%;
            background: #68b2ce;
            margin-right: .8rem;
            display: inline-block;

            animation: loading1 linear 1s infinite;

            &:nth-child(1){ animation-delay:0s; }
            &:nth-child(2){ animation-delay:0.15s; }
            &:nth-child(3){ animation-delay:0.3s; }
            &:nth-child(4){ animation-delay:0.45s; }
            &:nth-child(5){ animation-delay:0.6s; }
        }
    }
</style>