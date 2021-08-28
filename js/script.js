Vue.config.devtools = true;
dayjs.extend(dayjs_plugin_customParseFormat);

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
    activeChatIndex: 0,
    writingStatus: `Ultimo accesso oggi alle ${dayjs().format("HH:mm")}`,
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
      this.activeChatIndex = index;
    },
    sendMessage() {
      this.contacts[this.activeChatIndex].messages.push({
        date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
        message: this.messageToSend,
        status: "sent",
      });
      this.messageToSend = "";
      this.writingStatus = "Sta scrivendo...";
      setTimeout(() => {
        this.contacts[this.activeChatIndex].messages.push({
          date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
          message: "Ok",
          status: "received",
        });
        this.writingStatus = `Ultimo accesso oggi alle ${dayjs().format(
          "HH:mm"
        )}`;
      }, 1000);
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
