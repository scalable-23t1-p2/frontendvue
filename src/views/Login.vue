<!-- <template>
    <LoginForm />
  </template>

  <script lang="ts" setup>
    import LoginForm from '@/components/LoginForm.vue'
  </script> -->

  <template>
    <main class="form-signin">
      <form @submit.prevent="submit">
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <div class="form-floating">
          <input type="email" class="form-control" name="email" placeholder="name@example.com">
          <label>Email</label>
        </div>

        <div class="form-floating">
          <input type="password" class="form-control" name="password" placeholder="Password">
          <label>Password</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
      </form>
    </main>
  </template>

  <script>
  import {useRouter} from "vue-router";
  import axios from "axios";

  export default {
    name: "Login",
    data: () => ({
      visible: false,
    }),
    setup() {
      const router = useRouter();

      const submit = async e => {
        const form = new FormData(e.target);

        const inputs = Object.fromEntries(form.entries());

        //withCredentials: true is used in the axios.post request to send cookies along with the request.
        const {data} = await axios.post('/auth/login', inputs, {
          withCredentials: true
        });

        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;

        await router.push('/');
      }

      return {
        submit
      }
    }
  }
  </script>
