<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>
    <form ref="form" @submit.prevent="submit">
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>
        <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="email_input"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password

          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Forgot login password?</a
          >
        </div>

        <v-text-field
          v-model="pw_input"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-card class="mb-12" color="surface-variant" variant="tonal">
          <v-card-text class="text-medium-emphasis text-caption">
            Warning: After 3 consecutive failed login attempts, you account will
            be temporarily locked for three hours. If you must login now, you can
            also click "Forgot login password?" below to reset the login password.
          </v-card-text>
        </v-card>

        <v-btn block class="mb-8" color="blue" size="large" variant="tonal" type="submit">
          Log In
        </v-btn>

        <!-- <router-link to=/register> 
            <span class=“font-weight-bold” style="color: white; font-weight: bold; text-decoration: none;display: inline-block; border-bottom: none;">Sign up now</span> 
            </router-link>  -->
        <v-card-text class="text-center">
          <a
            class="text-blue text-decoration-none"
            href="/register"
            rel="noopener noreferrer"
          >
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </form>  
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: "LoginForm",
  data: () => ({
    visible: false,
    email_input: "ex@ex.com",
    pw_input: "P@ssword1",

  }),
  methods: {
    async submit() {
      let formData = new FormData();
      let email_input = this.email_input;
      let pw_input = this.pw_input;
      console.log("submit");
      formData.append("email", email_input);
      formData.append("password", pw_input);
      const inputs = Object.fromEntries(formData.entries());
      console.log("submit output")
      console.log(inputs)
      //we only want data of the response
      const {data} = await axios.post("/auth/login", inputs,{withCredentials: true});
      //console.log(response.data.access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.refresh_token}`;
      if (response.status === 200) {
        console.log("login status 200")
        await this.$router.push({ path: "/dashboard" });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },

};
</script>
