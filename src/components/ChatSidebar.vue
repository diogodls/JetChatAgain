<template>
  <div>
    <h3>Usuários online: </h3>
    <ul>
      <li v-for="user in userList" :key="user">{{user}} <span class="identifierSpan" v-if="user === userLogged">(você)</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
   userList: Array,
   userLogged: String,
  },
}
</script>

<style scoped>
  h3 {
    font-weight: 600;
  }

  .identifierSpan {
    font-size: 10px;
  }
</style>