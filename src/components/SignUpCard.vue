<template>
  <div>
    <v-card class="mx-auto v-card-sign-up">
      <v-card-text>
        <div>E-COMMERCE</div>
        <p class="text-h4 text--primary">SIGN UP</p>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="First name"
                  rules="required|max:50"
                >
                  <v-text-field
                    v-model="first_name"
                    :counter="50"
                    :error-messages="errors"
                    label="First Name"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Last name"
                  rules="required|max:50"
                >
                  <v-text-field
                    v-model="last_name"
                    :counter="50"
                    :error-messages="errors"
                    label="Last Name"
                    required
                  ></v-text-field> </validation-provider
              ></v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="6">
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
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="email"
                    :error-messages="errors"
                    label="E-mail"
                    required
                  ></v-text-field> </validation-provider
              ></v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Age"
                  min="15"
                  rules="required|numeric|min_value:15"
                >
                  <v-text-field
                    type="number"
                    v-model="age"
                    :error-messages="errors"
                    label="Age"
                    required
                  ></v-text-field> </validation-provider
              ></v-col>
              <v-col cols="12" sm="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="select"
                  rules="required"
                >
                  <v-select
                    v-model="select"
                    :items="genders"
                    :error-messages="errors"
                    label="Select Gender"
                    data-vv-name="select"
                    required
                  ></v-select> </validation-provider
              ></v-col>
            </v-row>

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
            <validation-provider
              v-slot="{ errors }"
              name="Confirm Password"
              rules="required|confirmed:Password"
            >
              <v-text-field
                :append-icon="isShowConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="isShowConfirmPassword ? 'text' : 'password'"
                v-model="cf_password"
                :error-messages="errors"
                label="Confirm Password"
                @click:append="isShowConfirmPassword = !isShowConfirmPassword"
                required
              ></v-text-field>
            </validation-provider>
            <v-container class="d-flex justify-end"
              ><span class="pe-2">Have an account already? </span
              ><router-link to="/sign-in">Sign in</router-link></v-container
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

import {
  required,
  email,
  max,
  regex,
  min_value,
  numeric,
  confirmed,
} from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
setInteractionMode("eager");

extend("confirmed", {
  ...confirmed,
  message: "Password not match",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("min_value", {
  ...min_value,
  message: "{_field_} may not be less than {min}",
});

extend("numeric", {
  ...numeric,
  message: "{_field_} must be number",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  name: "SignUpCard",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    cf_password: "",
    age: 0,
    email: "",
    select: null,
    genders: ["Male", "Female", "Others"],
    isShowPassword: false,
    isShowConfirmPassword: false,
  }),

  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;

      const {
        username,
        first_name,
        last_name,
        password,
        cf_password,
        age,
        email,
        select,
      } = this.$data;

      console.log({
        username,
        first_name,
        last_name,
        password,
        cf_password,
        age,
        email,
        select,
      });
    },
    clear() {
      this.username = "";
      this.first_name = "";
      this.last_name = "";
      this.password = "";
      this.cf_password = "";
      this.age = 0;
      this.email = "";
      this.select = null;
      this.$refs.observer.reset();
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 600px) {
  .v-card-sign-up {
    width: 400px;
  }
}
@media screen and (min-width: 960px) {
  .v-card-sign-up {
    width: 800px;
  }
}
@media screen and (max-width: 480px) {
  .v-card-sign-up {
    width: 300px;
  }
}
</style>
