<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png">
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <div>
      <a-button type="primary">Primary</a-button>
      <a-button>Default</a-button>
      <a-button type="dashed">Dashed</a-button>
      <a-button type="danger">Danger</a-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { Button } from 'ant-design-vue';
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    // HelloWorld
    // 'a-button': Button
  }
};
</script>
