<template>
    <div>
        <img src="../assets/logo.png">
        <router-view :key="key" />
    </div>
</template>

<script>
export default {
  name: 'Layout',
  computed: {
    key () {
      return this.$route.fullPath
    }
  }
}
</script>
