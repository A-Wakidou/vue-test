<script setup lang="ts">
import TheNavbar from '@/components/TheNavbar.vue'
</script>

<template>
  <TheNavbar />
  <RouterView />
</template>

<style>
.color-white {
  color: white;
}
.color-dark {
  color: #333333;
}
.color-blue {
  color: #2196f3;
}
.bg-white {
  background-color: #fff;
}
.bg-dark {
  background-color: #333333;
}
.bg-blue {
  background-color: #2196f3;
}
.button {
  color: white;
  border: none;
  cursor: pointer;
  height: 35px;
  border-radius: 4px;
}
input,
select {
  display: block;
  margin: 0;
  width: 100%;
  background: transparent;
  height: 40px;
  padding-left: 2%;
  background-position: 98% 50%;
  background-repeat: no-repeat;
  border: 2px solid whitesmoke;
  border-radius: 7px;
}
input:focus {
  transition: 0.5s;
  -webkit-box-shadow: 0px 2px 5px 3px #e8eaec;
  box-shadow: 0px 2px 3px 1px #e8eaec;
  border: none;
  outline: 0;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
form > div {
  margin: 15px 0;
}

form span {
  margin-bottom: 1.25rem;
}
.shadow {
  -webkit-box-shadow: 1px 1px 3px 2px whitesmoke;
  box-shadow: 1px 1px 3px 2px whitesmoke;
  border-radius: 5px;
}
.error {
  color: tomato;
  font-weight: bold;
}
</style>
