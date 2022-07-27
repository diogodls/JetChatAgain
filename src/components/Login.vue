<template>
  <div class="loginPage">
    <div class="menu">
      <h2 class="title">JetChat (again)</h2>

      <p class="error">
        {{ errors }}
      </p>

      <label class="label" for="login">Nickname: </label>
      <input class="input" name="login" type="text" v-model="nickname">
      <input class="button is-success mt-5" type="submit" value="Entrar" @click.prevent="login">
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io('127.0.0.1:3000');

export default {
  name: "myLogin",
  data() {
    return {
      nickname: '',
      errors: null,
    }
  },
  methods: {
    login() {
      socket.emit('userLogin', this.nickname);
      this.$store.commit("changeUser", this.nickname);

      socket.on('rejectedNickname', msg => {
        this.errors = msg;
        console.log(this.errors);
      })

      if (!this.errors){
        this.$router.push({name: 'HomeChat'});
      }
    }
  }
}

</script>

<style scoped>
.loginPage {
  height: 100vh;
  width: 100%;
  background: rgb(2,0,36);
  background: linear-gradient(146deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(38,7,146,1) 47%, rgba(164,0,255,1) 100%);
}

.menu {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  width: 320px;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-flow: column;
}

.title {
  font-size: 1.5rem;
  text-align: center;
}

.error {
  font-size: 14px;
}
</style>