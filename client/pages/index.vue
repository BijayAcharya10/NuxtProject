<template>
  <div>
    <v-app>
      <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
        <div>
          <v-tabs
            v-model="tab"
            show-arrows
            background-color="deep-purple accent-4"
            icons-and-text
            dark
            grow
          >
            <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <v-form ref="loginForm">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="loginEmail"
                          :rules="loginEmailRules"
                          label="E-mail"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="loginPassword"
                          name="input-10-1"
                          label="Password"
                          type="password"
                        ></v-text-field>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                      <p v-if="formError">{{ formError }}</p>
                      <v-spacer></v-spacer>

                      <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                        <v-btn
                          depressed
                          color="primary"
                          x-large
                          block
                          @click.enter="login"
                          :loading="loading"
                        >
                          Login
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </div>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
export default {
  layout: "loginLayout",
  name: "Login",
  data: () => ({
    formError: null,
    dialog: true,
    tab: 0,
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    emailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    rules: {
      required: value => !!value || "Required."
    },
    loading: false
  }),
  methods: {
    async login() {
      try {
        console.log({ email: this.loginEmail, password: this.loginPassword });
        this.loading = true;
        let response = await this.$auth.loginWith("laravelSanctum", {
          data: {
            email: this.loginEmail,
            password: this.loginPassword
          }
        });

        if (response.status === 200) {
          this.loading = false;
          this.$router.push("/home");
        }
      } catch (e) {
        this.loading = false;
        alert("Incorrect Credentials");
      }
    }
  }
};
</script>
<style scoped></style>
