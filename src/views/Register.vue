<template>
      <v-toolbar
        color="deep-purple-accent-4"
        cards
        dark
        flat
      >
        <v-btn icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-card-title class="text-h6 font-weight-regular">
          Sign up
        </v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form
        ref="form"
        v-model="isValid"
        class="pa-4 pt-6"
      >
        <v-text-field
          v-model="password"
          :rules="[rules.password, rules.length(6)]"
          variant="filled"
          color="deep-purple"
          counter="6"
          label="Password"
          style="min-height: 96px"
          type="password"
        ></v-text-field>
        <v-text-field
          v-model="phone"
          variant="filled"
          color="deep-purple"
          label="Phone number"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="[rules.email]"
          variant="filled"
          color="deep-purple"
          label="Email address"
          type="email"
        ></v-text-field>
        <v-textarea
          v-model="bio"
          auto-grow
          variant="filled"
          color="deep-purple"
          label="Bio"
          rows="1"
        ></v-textarea>
        <v-checkbox
          v-model="agreement"
          :rules="[rules.required]"
          color="deep-purple"
        >
          <template v-slot:label>
            I agree to the&nbsp;
            <a
              href="#"
              @click.stop.prevent="dialog = true"
            >Terms of Service</a>
            &nbsp;and&nbsp;
            <a
              href="#"
              @click.stop.prevent="dialog = true"
            >Privacy Policy</a>*
          </template>
        </v-checkbox>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          variant="text"
          @click="form.reset()"
        >
          Clear
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!isValid"
          :loading="isLoading"
          color="deep-purple-accent-4"
        >
          Submit
        </v-btn>
      </v-card-actions>
      <v-dialog
        v-model="dialog"
        max-width="400"
        persistent
      >
        <v-card>
          <v-card-title class="text-h5 bg-grey-lighten-3">
            Legal
          </v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              variant="text"
              @click="agreement = false, dialog = false"
            >
              No
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="deep-purple"
              variant="tonal"
              @click="agreement = true, dialog = false"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </template>
  
  <script>
    export default {
      data: () => ({
        visible: false,
      }),
    }
  </script>



<!-- <script>
import axios from 'axios';
export default {

    name: 'Register',
    setup() {
        const router = useRouter();

        const submit = async e => {
            const form = new FormData(e.target);
            const inputs = Object.fromEntries(form.entries());
            await axios.post('127.0.0.1:8000/auth/register', inputs);
            await router.push('/login');
        }

        return {
            submit
        }
    }

}
</script> -->