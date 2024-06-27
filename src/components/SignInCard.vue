<template>
  <div>
    <v-card class="mx-auto" width="350" max-width="350">
      <v-card-text>
        <div>E-COMMERCE</div>
        <p class="text-h4 text--primary">SIGN IN</p>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="Username"
              rules="required|max:10"
            >
              <v-text-field
                v-model="username"
                :counter="10"
                :error-messages="errors"
                label="Username"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Password"
              rules="required"
            >
              <v-text-field
                :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="isShowPassword ? 'text' : 'password'"
                v-model="password"
                :error-messages="errors"
                label="Password"
                @click:append="isShowPassword = !isShowPassword"
                required
              ></v-text-field>
            </validation-provider>

            <v-container class="d-flex justify-end"
              ><span class="pe-2">Create an account</span
              ><router-link to="/sign-up">Sign up</router-link></v-container
            >

            <v-btn class="mr-4 primary" type="submit" :disabled="invalid">
              submit
            </v-btn>
            <v-btn @click="clear"> clear </v-btn>
          </form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable */

import { required, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

export default {
  name: "SignInCard",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    username: "",
    password: "",
    isShowPassword: false,
  }),

  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;

      const { username, password } = this.$data;

      this?.$store?.dispatch("loginAction", {
        username,
        password,
      });
    },
    clear() {
      this.username = "";
      this.password = "";
      this.$refs.observer.reset();
    },
  },
};
</script>
