<template>
  <div class="chat">
    <chat-sidebar :userList="userList" :user-logged="user" class="sidebar" />
    
    <section class="chatSection">
      <ul class="messagesList">
        <li v-for="message in messages" :key="message.id">
          <span class="messageSpan entryMessage" v-if="message.user === 'system'"> {{message.message}}</span>
          <span class="messageSpan" v-if="message.user !== 'system'">{{ message.user }} : {{ message.message }}</span>
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
      userList: [],
      messages: [],
      message: '',
    }
  },

  mounted() {
    socket.on('messageReceived', (msg) => {
      this.messages = msg;
    });
    socket.on('userList', (userList) => {
      this.userList = userList;
    });
    socket.on('updatedUserList', (userList) => {
      this.userList = userList;
    });
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
      };

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
  height: 100vh;
  overflow-y: auto;
}

.messagesList {
  width: 100%;
  list-style: none;
}

.messageSpan {
  display: flex;
  padding: .5rem 1rem;
}

.entryMessage{
  justify-content: center;
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