<template>
  <div>
    <h3>Usuários online: </h3>
    <ul>
      <li v-for="user in userList" :key="user">{{user}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
   userList: {
     type: Array,
     required: true,
   }
  }
}
</script>

<style scoped>
h3 {
  font-weight: 600; 
}
</style>