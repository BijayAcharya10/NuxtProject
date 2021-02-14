<template>
  <div>
    <!-- <v-divider></v-divider> -->
    <div class="container">
      <AppStatItem
        :type="type.total"
        :count="getCount"
        :src="image.imgTotal"
        :color="statColor.totalColor"
      />
      <AppStatItem
        :type="type.active"
        :count="getInactiveCount()"
        :src="image.imgActive"
        :color="statColor.activeColor"
      />
      <AppStatItem
        :type="type.inactive"
        :count="getInactiveCount()"
        :src="image.imgInactive"
        :color="statColor.inactiveColor"
      />
    </div>
    <v-card-title>
      <v-row>
        <v-col md="3" cols="12">
          <v-text-field
            dense
            label="Name"
            v-model="search"
            outlined
          ></v-text-field>
        </v-col>

        <v-col md="3" cols="12">
          <v-text-field dense label="Email" outlined></v-text-field>
        </v-col>

        <v-col md="3" cols="12">
          <v-text-field dense label="Mobile" outlined></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-autocomplete
            outlined
            v-model="status"
            :items="status"
            item-text="text"
            item-value="value"
            dense
            label="Status"
            :allow-overflow="false"
            :clearable="true"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table
      :items-per-page="10"
      :headers="headers"
      :search="search"
      no-data-text="Users not found"
      :items="getAllUsers"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="headline">Users</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>

          <v-spacer />
          <v-btn
            small
            dark
            class="primary mr-2"
            icon
            @click.stop="onAddButtonClick"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>

          <v-btn small dark class="success mr-2" icon>
            <v-icon>mdi-refresh</v-icon>
          </v-btn>

          <v-btn small dark class="warning mr-2" icon>
            <v-icon>mdi-printer</v-icon>
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:[`item.action`]="{ item }">
        <v-btn outlined small dark icon color="primary">
          <v-icon small>mdi-eye-outline</v-icon>
        </v-btn>
        <v-btn
          outlined
          small
          dark
          icon
          color="success"
          @click="onEditButtonClick(item, $event)"
        >
          <v-icon small>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn
          outlined
          small
          dark
          icon
          color="error"
          @click="onDeleteButtonClick(item, $event)"
        >
          <v-icon small>mdi-delete-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card>
        <v-card-title class="headline">
          User

          <v-spacer />

          <v-btn icon @click.stop="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider />

        <v-card-text>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="form.name"
                  outlined
                  label="Name"
                  append-icon="mdi-account-circle-outline"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  v-model="form.email"
                  outlined
                  append-icon="mdi-email-outline"
                  label="Email"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  v-model="form.mobile"
                  outlined
                  append-icon="mdi-phone-outline"
                  label="Mobile"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  v-model="form.password"
                  outlined
                  label="Password"
                  type="password"
                  append-icon="mdi-eye-outline"
                  counter
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  outlined
                  v-model="form.confirm_password"
                  label="Confirm Password"
                  append-icon="mdi-eye-outline"
                  type="password"
                  counter
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-switch
                  outlined
                  v-model="form.status"
                  label="Status"
                  color="info"
                  value="info"
                  hide-details
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="onSaveClick" :loading="loading">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar :timeout="2000" top color="success" v-model="snackbar"
      >Save Successfully</v-snackbar
    >
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import AppStatItem from "../components/AppStatItem.vue";

export default {
  components: {
    AppStatItem
  },
  data() {
    return {
      headers: [
        {
          text: "Id",
          value: "id"
        },
        {
          text: "Name",
          value: "name"
        },
        {
          text: "Email",
          value: "email"
        },
        {
          text: "Mobile",
          value: "mobile"
        },
        {
          text: "Status",
          value: "status"
        },
        {
          text: "Action",
          sortable: false,
          value: "action"
        }
      ],
      dialog: false,
      loading: false,
      snackbar: false,
      form: {},
      items: [],
      status: [
        { text: "Active", value: true },
        { text: "Inactive", value: false }
      ],
      search: "",
      type: {
        total: "Total",
        active: "Active",
        inactive: "Inactive"
      },
      image: {
        imgTotal: "study.svg",
        imgActive: "customer.svg",
        imgInactive: "cross.svg"
      },
      statColor: {
        totalColor: "light-blue",
        activeColor: "green",
        inactiveColor: "deep-orange"
      }
    };
  },
  computed: {
    ...mapGetters({
      getAllUsers: "users/getAll",
      getCount: "users/getCount"
    })
  },
  methods: {
    ...mapMutations({
      addUser: "users/saveUser",
      updateUser: "users/update",
      deleteUser: "users/deleteUser"
    }),
    getActiveCount() {
      let count = 0;
      let getUsers = this.getAllUsers;
      for (let i = 0; i < getUsers.length; i++) {
        if (getUsers[i].status === "Active") {
          count++;
        }
      }
      return count;
    },
    getInactiveCount() {
      let count = 0;
      let getUsers = this.getAllUsers;
      for (let i = 0; i < getUsers.length; i++) {
        if (getUsers[i].status === "Inactive") {
          count++;
        }
      }
      return count;
    },
    onAddButtonClick() {
      const me = this;
      me.dialog = true;
    },
    onSaveClick(e) {
      const me = this;
      me.loading = true;

      setTimeout(() => {
        me.loading = false;
        me.snackbar = true;
        me.dialog = false;

        if (!this.form.id) {
          this.addUser(this.form);
        } else {
          this.updateUser(this.form);
        }

        this.form = {};
      }, 2000);
    },
    onEditButtonClick(item, event) {
      const me = this;
      const user = Object.assign({}, this.getById(item.id));
      me.form = user;

      setTimeout(() => {
        me.dialog = true;
      }, 500);
    },
    onDeleteButtonClick(item, event) {
      if (confirm("Are you sure you want to delete this item?")) {
        setTimeout(() => {
          this.deleteUser(item.id);
        }, 500);
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
</style>
