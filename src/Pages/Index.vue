<template>
    <div class="container is-fluid" style="padding: 0">
        <div class="columns wrapper">
            <div class="column has-background-success" style="margin: 0; padding: 0">
                <Intro />
            </div>
            <div class="column" style="margin: 0; padding: 0">
                <Converter />
            </div>
        </div>
    </div>
</template>

<script>
import Intro from "../components/intro"
import Converter from "../components/converter"
export default {
    name: 'Index',
    components: {
        Intro, Converter
    }
}
</script>

<style>
.wrapper{
    position: fixed;
    overflow: hidden;
    top: 0;
    bottom: 0;
}

@media only screen and (max-width: 600px) {
    .wrapper{
        position: relative !important;
    }
}
</style>
