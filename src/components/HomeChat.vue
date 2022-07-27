<template>
  <div class="chat">
    <chat-sidebar :userList="userList" class="sidebar" />
    
    <section class="chatSection">
      <ul class="messagesList">
        <li v-for="message in messages" :key="message.id">
          <span class="messageSpan" :style="{justifyContent: [message.user == user ? 'flex-end' : 'flex-start']}">{{ message.user }} : {{ message.message }}</span>
        </li>
      </ul>
      <textarea class="messageInput" name="" v-model="message" @keyup.enter="createMessage"/>
    </section>
  </div>
</template>

<script>
import io from 'socket.io-client';
import ChatSidebar from './ChatSidebar.vue';
import { mapState } from "vuex";

const socket = io('127.0.0.1:3000');

export default {
  components: { ChatSidebar },
  name: 'HomeChat',
  data() {
    return {
      userList: ['dioguin', 'junin AKA trovao'],
      messages: [],
      message: ''
    }
  },

  mounted() {
    socket.on('messageReceived', (msg) => {
      this.messages = this.messages.concat(msg);
    });
    socket.on('userList', (userList) => {
      this.userList = this.userList.push(userList);
    })
  },

  computed:{
    ...mapState(["user"])
  },

  methods: {
    createMessage() {
      const message = {
        id: Math.floor(Date.now() * Math.random()).toString(36),
        user: this.$store.state.user,
        message: this.message,
      }

      this.messages = this.messages.concat(message);
      socket.emit('message', message);
      this.message = '';
    }
  }
}
</script>

<style>
.chat {
  height: 100vh;
  width: 100%;
  background: #131516;
  color: #d8d4cf;
  display: flex;
}

.sidebar {
  width: 220px;
  background: #4F5559;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.chatSection {
  width: 100%;
}

.messagesList {
  width: 100%;
  list-style: none;
}

.messageSpan {
  display: flex;
  padding: .5rem 1rem;
}

.messageInput {
  width: 100%;
  position: absolute;
  bottom: 0;
  resize: none;
  border: 1px solid #736b5e;
  background: #3B3B3B;
  color: #d8d4cf;
}

.messageInput:focus-visible {
  outline: none;
}
</style>