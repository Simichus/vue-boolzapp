console.log(Vue);

Vue.config.devtools = true;

const app = new Vue({
  el: "#app",
  data: {
    user: user,
    contacts: contacts,
    messageToSend: "",
    filter: "",
    currentFiltered: contacts,
    activeChatName: "",
    activeChatAvatar: "",
  },
  methods: {
    chatsFiltered(filter) {
      if (!filter.trim()) {
        this.currentFiltered = this.contacts;
      } else {
        this.currentFiltered = [];
        this.contacts.forEach((contact) => {
          if (contact.name.contains(filter)) {
            this.currentFiltered.push(contact);
          }
        });
      }
    },
    activeChat(index) {
      this.contacts.forEach((contact) => {
        contact.visible = false;
      });
      this.contacts[index].visible = true;
      this.activeChatName = this.contacts[index].name;
      this.activeChatAvatar = this.contacts[index].avatar;
    },
  },
  created() {
    this.contacts.forEach((contact) => {
      contact.visible = false;
    });
    this.contacts[0].visible = true;
    this.activeChatName = this.contacts[0].name;
    this.activeChatAvatar = this.contacts[0].avatar;
  },
});
